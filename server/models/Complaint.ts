import mongoose, { Schema, Document } from 'mongoose';

export interface IStatusHistory {
  status: 'Pending' | 'In Progress' | 'Resolved';
  remarks?: string;
  updatedBy: mongoose.Types.ObjectId;
  updatedAt: Date;
}

export interface IComplaint extends Document {
  complaintId: string;
  title: string;
  description: string;
  category: 'Educational Accessibility' | 'Environmental Cleanliness';
  subcategory: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Resolved';
  location: string;
  images: string[];
  coordinates?: {
    lat?: number;
    lng?: number;
  };
  reporter: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId | string;
  responsibleDepartment?: string;
  remarks?: string;
  statusHistory: IStatusHistory[];
  createdAt: Date;
  updatedAt: Date;
}

const ComplaintSchema: Schema = new Schema(
  {
    complaintId: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Educational Accessibility', 'Environmental Cleanliness'],
      index: true,
    },
    subcategory: { type: String, required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium', index: true },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Resolved'],
      default: 'Pending',
      index: true,
    },
    location: { type: String, required: true },
    images: [{ type: String }],
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    reporter: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    assignedTo: { type: Schema.Types.Mixed, default: 'Unassigned' },
    responsibleDepartment: { type: String, default: 'Gram Panchayat Works' },
    remarks: { type: String, default: '' },
    statusHistory: [
      {
        status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'] },
        remarks: { type: String, default: '' },
        updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Complaint || mongoose.model<IComplaint>('Complaint', ComplaintSchema);
