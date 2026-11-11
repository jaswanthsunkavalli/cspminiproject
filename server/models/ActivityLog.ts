import mongoose, { Schema, Document } from 'mongoose';

export interface IActivityLog extends Document {
  user: mongoose.Types.ObjectId;
  userName?: string;
  userRole?: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  oldValue?: string;
  newValue?: string;
  timestamp: Date;
}

const ActivityLogSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, default: '' },
    userRole: { type: String, default: '' },
    action: { type: String, required: true },
    resourceType: { type: String, required: true },
    resourceId: { type: String, default: '' },
    oldValue: { type: String, default: '' },
    newValue: { type: String, default: '' },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.ActivityLog ||
  mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);
