import mongoose, { Document, Schema } from 'mongoose';

export interface IEducationArticle extends Document {
  title: string;
  slug: string;
  category: string;
  summary: string;
  whatItIs: string;
  howItWorks: string;
  warningSigns: string[];
  howToStaySafe: string[];
  whatToDoIfAffected: string[];
  language: 'en' | 'te' | 'hi';
  createdAt: Date;
}

const EducationArticleSchema = new Schema<IEducationArticle>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  summary: { type: String, required: true },
  whatItIs: { type: String, required: true },
  howItWorks: { type: String, required: true },
  warningSigns: [{ type: String }],
  howToStaySafe: [{ type: String }],
  whatToDoIfAffected: [{ type: String }],
  language: { type: String, enum: ['en', 'te', 'hi'], default: 'en' },
  createdAt: { type: Date, default: Date.now },
});

export const EducationArticle = mongoose.models.EducationArticle || 
  mongoose.model<IEducationArticle>('EducationArticle', EducationArticleSchema);

