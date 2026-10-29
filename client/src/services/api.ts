import axios from 'axios';

export interface AnalysisResponse {
  riskScore: number;
  riskLevel: 'SAFE' | 'LOW RISK' | 'MEDIUM RISK' | 'HIGH RISK' | 'CRITICAL RISK';
  confidence: number;
  summary: string;
  redFlags: string[];
  evidence: string[];
  recommendedActions: string[];
  scamCategory: string;
  needsVerification: boolean;
}

export interface SavedScanRecord extends AnalysisResponse {
  _id: string;
  userId?: string;
  scanType: 'message' | 'url' | 'screenshot' | 'email' | 'job' | 'payment';
  inputPreview: string;
  createdAt: string;
}

export interface EducationArticleItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  whatItIs: string;
  howItWorks: string;
  warningSigns: string[];
  howToStaySafe: string[];
  whatToDoIfAffected: string[];
  language: string;
  createdAt: string;
}

export interface CommunityReport {
  _id: string;
  userId?: string;
  reportType: string;
  targetIndicator: string;
  contentHash: string;
  description: string;
  status: string;
  createdAt: string;
}

export interface AdminAnalytics {
  totalUsers: number;
  totalScans: number;
  totalReports: number;
  scamsIdentified: number;
  highRiskDetections: number;
  criticalRiskDetections: number;
  mediumRiskDetections: number;
  lowRiskDetections: number;
  safeScans: number;
  riskDistribution: Array<{ name: string; value: number; color: string }>;
  categories: Array<{ name: string; count: number }>;
  typeDistribution: Array<{ type: string; count: number }>;
  activityData: Array<{ date: string; count: number }>;
  mostCommonThreat: string;
}

export const api = {
  ai: {
    analyzeMessage: async (content: string): Promise<AnalysisResponse> => {
      const res = await axios.post('/api/ai/analyze-message', { content });
      return res.data;
    },
    analyzeUrl: async (url: string): Promise<AnalysisResponse> => {
      const res = await axios.post('/api/ai/analyze-url', { url });
      return res.data;
    },
    analyzeImage: async (file: File, extractedText?: string): Promise<AnalysisResponse> => {
      const formData = new FormData();
      formData.append('image', file);
      if (extractedText) formData.append('extractedText', extractedText);
      const res = await axios.post('/api/ai/analyze-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    },
    analyzeJob: async (content: string): Promise<AnalysisResponse> => {
      const res = await axios.post('/api/ai/analyze-job', { content });
      return res.data;
    },
    analyzePayment: async (content: string): Promise<AnalysisResponse> => {
      const res = await axios.post('/api/ai/analyze-payment', { content });
      return res.data;
    },
  },
  scans: {
    save: async (data: any): Promise<{ scan: SavedScanRecord }> => {
      const res = await axios.post('/api/scans', data);
      return res.data;
    },
    getAll: async (params?: { scanType?: string; riskLevel?: string }): Promise<SavedScanRecord[]> => {
      const res = await axios.get('/api/scans', { params });
      return res.data.scans;
    },
    getById: async (id: string): Promise<SavedScanRecord> => {
      const res = await axios.get(`/api/scans/${id}`);
      return res.data.scan;
    },
    delete: async (id: string): Promise<void> => {
      await axios.delete(`/api/scans/${id}`);
    },
  },
  reports: {
    submit: async (data: { reportType: string; targetIndicator: string; description?: string }) => {
      const res = await axios.post('/api/reports', data);
      return res.data;
    },
    getAll: async (): Promise<CommunityReport[]> => {
      const res = await axios.get('/api/reports');
      return res.data.reports;
    },
  },
  education: {
    getAll: async (category?: string, lang?: string): Promise<EducationArticleItem[]> => {
      const res = await axios.get('/api/education', { params: { category, lang } });
      return res.data.articles;
    },
    getBySlug: async (slug: string): Promise<EducationArticleItem> => {
      const res = await axios.get(`/api/education/${slug}`);
      return res.data.article;
    },
  },
  admin: {
    getStats: async (): Promise<AdminAnalytics> => {
      const res = await axios.get('/api/admin/statistics');
      return res.data;
    },
  },
};

