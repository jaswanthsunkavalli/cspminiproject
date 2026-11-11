import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  recipient: mongoose.Types.ObjectId;
  message: string;
  type: 'status_update' | 'assignment' | 'announcement' | 'system';
  isRead: boolean;
  relatedComplaint?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const NotificationSchema: Schema = new Schema(
  {
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ['status_update', 'assignment', 'announcement', 'system'],
      default: 'system',
    },
    isRead: { type: Boolean, default: false },
    relatedComplaint: { type: Schema.Types.ObjectId, ref: 'Complaint' },
  },
  { timestamps: true }
);

export default mongoose.models.Notification ||
  mongoose.model<INotification>('Notification', NotificationSchema);
