import mongoose, { Document, Schema } from 'mongoose';

export type RiskLevel = 'SAFE' | 'LOW RISK' | 'MEDIUM RISK' | 'HIGH RISK' | 'CRITICAL RISK';
export type ScanType = 'message' | 'url' | 'screenshot' | 'email' | 'job' | 'payment';

export interface IScan extends Document {
  userId?: string;
  scanType: ScanType;
  riskScore: number;
  riskLevel: RiskLevel;
  confidence: number;
  scamCategory: string;
  summary: string;
  redFlags: string[];
  evidence: string[];
  recommendations: string[];
  inputPreview: string;
  needsVerification: boolean;
  createdAt: Date;
}

const ScanSchema = new Schema<IScan>({
  userId: { type: String, default: null, index: true },
  scanType: { 
    type: String, 
    required: true, 
    enum: ['message', 'url', 'screenshot', 'email', 'job', 'payment'] 
  },
  riskScore: { type: Number, required: true, min: 0, max: 100 },
  riskLevel: { 
    type: String, 
    required: true, 
    enum: ['SAFE', 'LOW RISK', 'MEDIUM RISK', 'HIGH RISK', 'CRITICAL RISK'] 
  },
  confidence: { type: Number, required: true, min: 0, max: 100 },
  scamCategory: { type: String, required: true },
  summary: { type: String, required: true },
  redFlags: [{ type: String }],
  evidence: [{ type: String }],
  recommendations: [{ type: String }],
  inputPreview: { type: String, default: '' },
  needsVerification: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Scan = mongoose.models.Scan || mongoose.model<IScan>('Scan', ScanSchema);

