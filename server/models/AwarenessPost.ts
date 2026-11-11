import mongoose, { Schema, Document } from 'mongoose';

export interface IAwarenessPost extends Document {
  title: string;
  category: string;
  description: string;
  content: string;
  image?: string;
  author: mongoose.Types.ObjectId;
  authorName?: string;
  isPublished: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AwarenessPostSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: '' },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    authorName: { type: String, default: 'Kuntamukkala Gram Panchayat Admin' },
    isPublished: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.AwarenessPost ||
  mongoose.model<IAwarenessPost>('AwarenessPost', AwarenessPostSchema);
