import { Response } from 'express';
import User from '../models/User.js';
import Complaint from '../models/Complaint.js';
import SurveyResponse from '../models/SurveyResponse.js';
import ActivityLog from '../models/ActivityLog.js';
import { AuthRequest } from '../middleware/auth.js';

export const getDashboardStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const totalUsers = await User.countDocuments();
    const residentsCount = await User.countDocuments({ role: 'resident' });
    const volunteersCount = await User.countDocuments({ role: 'volunteer' });

    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({ status: 'Pending' });
    const inProgressComplaints = await Complaint.countDocuments({ status: 'In Progress' });
    const resolvedComplaints = await Complaint.countDocuments({ status: 'Resolved' });

    const totalSurveys = await SurveyResponse.countDocuments();

    // Aggregations
    const byCategory = await Complaint.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    const byPriority = await Complaint.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } },
    ]);

    const byStatus = await Complaint.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Education vs Environmental details
    const educationCount = await Complaint.countDocuments({ category: 'Educational Accessibility' });
    const environmentalCount = await Complaint.countDocuments({ category: 'Environmental Cleanliness' });

    // Recent activity audit log
    const recentActivity = await ActivityLog.find().sort({ timestamp: -1 }).limit(10);
    const recentComplaints = await Complaint.find()
      .populate('reporter', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      stats: {
        totalUsers,
        residentsCount,
        volunteersCount,
        totalComplaints,
        pendingComplaints,
        inProgressComplaints,
        resolvedComplaints,
        totalSurveys,
        resolutionRate:
          totalComplaints > 0 ? Math.round((resolvedComplaints / totalComplaints) * 100) : 0,
        educationCount,
        environmentalCount,
      },
      charts: {
        byCategory: byCategory.map((item) => ({ category: item._id, count: item.count })),
        byPriority: byPriority.map((item) => ({ priority: item._id, count: item.count })),
        byStatus: byStatus.map((item) => ({ status: item._id, count: item.count })),
      },
      recentActivity,
      recentComplaints,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to generate admin stats.' });
  }
};

export const getUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
    res.json({ users });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch users.' });
  }
};

export const updateUserRole = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['resident', 'volunteer', 'admin'].includes(role)) {
      res.status(400).json({ error: 'Invalid role specified.' });
      return;
    }

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    const oldRole = user.role;
    user.role = role;
    await user.save();

    if (req.user) {
      await ActivityLog.create({
        user: req.user.id,
        userName: req.user.name,
        userRole: req.user.role,
        action: 'UPDATE_USER_ROLE',
        resourceType: 'User',
        resourceId: user.email,
        oldValue: oldRole,
        newValue: role,
      });
    }

    res.json({ message: `Role for ${user.name} updated to ${role}.`, user });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update user role.' });
  }
};

export const getReports = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { startDate, endDate, category, status } = req.query;

    const query: any = {};

    if (category) query.category = category;
    if (status) query.status = status;

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate as string);
      if (endDate) query.createdAt.$lte = new Date(endDate as string);
    }

    const complaints = await Complaint.find(query)
      .populate('reporter', 'name email phone')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    const totalCount = complaints.length;
    const resolvedCount = complaints.filter((c) => c.status === 'Resolved').length;
    const pendingCount = complaints.filter((c) => c.status === 'Pending').length;
    const inProgressCount = complaints.filter((c) => c.status === 'In Progress').length;

    res.json({
      summary: {
        totalCount,
        resolvedCount,
        pendingCount,
        inProgressCount,
        resolutionPercentage: totalCount > 0 ? ((resolvedCount / totalCount) * 100).toFixed(1) : '0',
      },
      complaints,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to generate report.' });
  }
};
