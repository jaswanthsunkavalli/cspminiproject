import { Response } from 'express';
import Complaint from '../models/Complaint.js';
import Notification from '../models/Notification.js';
import ActivityLog from '../models/ActivityLog.js';
import { AuthRequest } from '../middleware/auth.js';

export const createComplaint = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required.' });
      return;
    }

    const {
      title,
      description,
      category,
      subcategory,
      priority,
      location,
      images,
      coordinates,
    } = req.body;

    if (!title || !description || !category || !subcategory || !location) {
      res.status(400).json({ error: 'Please fill in all mandatory complaint fields.' });
      return;
    }

    // Generate unique complaint ID: KNT-2026-0001
    const year = new Date().getFullYear();
    const count = await Complaint.countDocuments();
    const sequenceNum = String(count + 1).padStart(4, '0');
    const complaintId = `KNT-${year}-${sequenceNum}`;

    const newComplaint = new Complaint({
      complaintId,
      title,
      description,
      category,
      subcategory,
      priority: priority || 'Medium',
      status: 'Pending',
      location,
      images: images || [],
      coordinates: coordinates || {},
      reporter: req.user.id,
      responsibleDepartment:
        category === 'Educational Accessibility'
          ? 'Education & School Facilities'
          : 'Gram Panchayat Sanitation & Drainage',
      remarks: 'Complaint logged into smart village tracking system.',
      statusHistory: [
        {
          status: 'Pending',
          remarks: 'Complaint registered by resident.',
          updatedBy: req.user.id,
          updatedAt: new Date(),
        },
      ],
    });

    await newComplaint.save();

    // Log Activity
    await ActivityLog.create({
      user: req.user.id,
      userName: req.user.name,
      userRole: req.user.role,
      action: 'CREATE_COMPLAINT',
      resourceType: 'Complaint',
      resourceId: complaintId,
      newValue: `Title: ${title} | Category: ${category}`,
    });

    res.status(201).json({
      message: 'Complaint submitted successfully!',
      complaintId,
      complaint: newComplaint,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to submit complaint.' });
  }
};

export const getAllComplaints = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { category, subcategory, status, priority, search, page = 1, limit = 20 } = req.query;

    const query: any = {};

    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (status) query.status = status;
    if (priority) query.priority = priority;

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { complaintId: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const complaints = await Complaint.find(query)
      .populate('reporter', 'name email phone role')
      .populate('assignedTo', 'name email role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Complaint.countDocuments(query);

    res.json({
      complaints,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch complaints.' });
  }
};

export const getMyComplaints = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required.' });
      return;
    }

    const complaints = await Complaint.find({ reporter: req.user.id })
      .sort({ createdAt: -1 })
      .populate('reporter', 'name email');

    res.json({ complaints });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch personal complaints.' });
  }
};

export const getComplaintById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    let complaint;
    if (id.startsWith('KNT-')) {
      complaint = await Complaint.findOne({ complaintId: id })
        .populate('reporter', 'name email phone role')
        .populate('assignedTo', 'name email role')
        .populate('statusHistory.updatedBy', 'name role');
    } else {
      complaint = await Complaint.findById(id)
        .populate('reporter', 'name email phone role')
        .populate('assignedTo', 'name email role')
        .populate('statusHistory.updatedBy', 'name role');
    }

    if (!complaint) {
      res.status(404).json({ error: 'Complaint record not found.' });
      return;
    }

    res.json({ complaint });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error retrieving complaint.' });
  }
};

export const updateStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required.' });
      return;
    }

    const { id } = req.params;
    const { status, remarks, responsibleDepartment } = req.body;

    if (!['Pending', 'In Progress', 'Resolved'].includes(status)) {
      res.status(400).json({ error: 'Invalid status value.' });
      return;
    }

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      res.status(404).json({ error: 'Complaint not found.' });
      return;
    }

    const oldStatus = complaint.status;
    complaint.status = status;
    if (remarks) complaint.remarks = remarks;
    if (responsibleDepartment) complaint.responsibleDepartment = responsibleDepartment;

    complaint.statusHistory.push({
      status,
      remarks: remarks || `Status updated to ${status}`,
      updatedBy: req.user.id as any,
      updatedAt: new Date(),
    });

    await complaint.save();

    // Create notification for reporter
    await Notification.create({
      recipient: complaint.reporter,
      message: `Your complaint ${complaint.complaintId} ("${complaint.title}") status was updated to ${status}.`,
      type: 'status_update',
      relatedComplaint: complaint._id,
    });

    // Log Activity Audit
    await ActivityLog.create({
      user: req.user.id,
      userName: req.user.name,
      userRole: req.user.role,
      action: 'UPDATE_STATUS',
      resourceType: 'Complaint',
      resourceId: complaint.complaintId,
      oldValue: oldStatus,
      newValue: status,
    });

    res.json({ message: 'Complaint status updated successfully!', complaint });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update status.' });
  }
};

export const updatePriority = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { priority } = req.body;

    if (!['Low', 'Medium', 'High'].includes(priority)) {
      res.status(400).json({ error: 'Invalid priority level.' });
      return;
    }

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      res.status(404).json({ error: 'Complaint not found.' });
      return;
    }

    const oldPriority = complaint.priority;
    complaint.priority = priority;
    await complaint.save();

    if (req.user) {
      await ActivityLog.create({
        user: req.user.id,
        userName: req.user.name,
        userRole: req.user.role,
        action: 'UPDATE_PRIORITY',
        resourceType: 'Complaint',
        resourceId: complaint.complaintId,
        oldValue: oldPriority,
        newValue: priority,
      });
    }

    res.json({ message: 'Priority updated successfully!', complaint });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update priority.' });
  }
};

export const assignComplaint = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { assignedTo, responsibleDepartment } = req.body;

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      res.status(404).json({ error: 'Complaint not found.' });
      return;
    }

    if (assignedTo) complaint.assignedTo = assignedTo;
    if (responsibleDepartment) complaint.responsibleDepartment = responsibleDepartment;

    await complaint.save();

    res.json({ message: 'Complaint assignment updated successfully!', complaint });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to assign complaint.' });
  }
};
