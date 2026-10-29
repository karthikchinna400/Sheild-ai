import mongoose, { Document, Schema } from 'mongoose';

export type ReportType = 'message' | 'phone' | 'url' | 'email' | 'social' | 'job' | 'payment';
export type ReportStatus = 'pending' | 'reviewed' | 'resolved' | 'dismissed';

export interface IReport extends Document {
  userId?: string;
  reportType: ReportType;
  targetIndicator: string; // The suspicious phone, link, sender ID, or preview
  contentHash: string;
  description: string;
  evidenceNotes?: string;
  status: ReportStatus;
  createdAt: Date;
}

const ReportSchema = new Schema<IReport>({
  userId: { type: String, default: null },
  reportType: { 
    type: String, 
    required: true, 
    enum: ['message', 'phone', 'url', 'email', 'social', 'job', 'payment'] 
  },
  targetIndicator: { type: String, required: true },
  contentHash: { type: String, required: true },
  description: { type: String, default: '' },
  evidenceNotes: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['pending', 'reviewed', 'resolved', 'dismissed'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now },
});

export const Report = mongoose.models.Report || mongoose.model<IReport>('Report', ReportSchema);

