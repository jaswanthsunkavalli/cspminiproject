import mongoose, { Schema, Document } from 'mongoose';

export interface ISurveyResponse extends Document {
  respondent?: mongoose.Types.ObjectId;
  isAnonymous: boolean;
  section1: Record<string, any>; // Household Details (4 questions)
  section2: Record<string, any>; // Education & Accessibility (5 questions)
  section3: Record<string, any>; // Occupation & Livelihood (2 questions)
  section4: Record<string, any>; // Housing & Basic Facilities (3 questions)
  section5: Record<string, any>; // Drainage & Cleanliness (5 questions)
  section6: Record<string, any>; // Community Suggestions (3 questions)
  surveyVersion: string;
  createdAt: Date;
  updatedAt: Date;
}

const SurveyResponseSchema: Schema = new Schema(
  {
    respondent: { type: Schema.Types.ObjectId, ref: 'User' },
    isAnonymous: { type: Boolean, default: false },
    section1: { type: Schema.Types.Mixed, required: true },
    section2: { type: Schema.Types.Mixed, required: true },
    section3: { type: Schema.Types.Mixed, required: true },
    section4: { type: Schema.Types.Mixed, required: true },
    section5: { type: Schema.Types.Mixed, required: true },
    section6: { type: Schema.Types.Mixed, required: true },
    surveyVersion: { type: String, default: '1.0' },
  },
  { timestamps: true }
);

export default mongoose.models.SurveyResponse ||
  mongoose.model<ISurveyResponse>('SurveyResponse', SurveyResponseSchema);
