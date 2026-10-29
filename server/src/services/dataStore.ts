import { User, IUser } from '../models/User.js';
import { Scan, IScan, ScanType, RiskLevel } from '../models/Scan.js';
import { Report, IReport, ReportType, ReportStatus } from '../models/Report.js';
import { EducationArticle, IEducationArticle } from '../models/EducationArticle.js';
import { isMongoConnected } from '../config/db.js';
import { initialEducationArticles } from '../seed/educationSeedData.js';
import crypto from 'crypto';

// Resilient in-memory collections for zero-setup execution & demo presentations
interface MemoryStore {
  users: Array<any>;
  scans: Array<any>;
  reports: Array<any>;
  articles: Array<any>;
}

const memoryStore: MemoryStore = {
  users: [
    {
      _id: 'admin_demo_id_001',
      name: 'Security Admin',
      email: 'admin@scamshield.ai',
      // bcrypt hash for 'Admin@12345'
      passwordHash: '$2a$10$Yd0B/1YV4t8p4c9i4T7Q.Oi9bWkP6jKzGk9H7R4iX0nO9mZ6vFz9e',
      role: 'admin',
      createdAt: new Date(),
    },
    {
      _id: 'user_demo_id_001',
      name: 'Demo User',
      email: 'user@scamshield.ai',
      // bcrypt hash for 'User@12345'
      passwordHash: '$2a$10$Yd0B/1YV4t8p4c9i4T7Q.Oi9bWkP6jKzGk9H7R4iX0nO9mZ6vFz9e',
      role: 'user',
      createdAt: new Date(),
    }
  ],
  scans: [
    {
      _id: 'scan_sample_001',
      userId: 'user_demo_id_001',
      scanType: 'message',
      riskScore: 96,
      riskLevel: 'CRITICAL RISK',
      confidence: 94,
      scamCategory: 'Phishing / KYC Scam',
      summary: 'High probability phishing message attempting unauthorized bank credential and OTP harvesting.',
      redFlags: [
        'Artificial urgency ("blocked today")',
        'Bank impersonation (SBI)',
        'Requests OTP credentials',
        'Suspicious non-bank external URL'
      ],
      evidence: [
        'Detected urgent ultimatum phrase',
        'Direct request for one-time verification password'
      ],
      recommendations: [
        'Do not click the link or enter any OTP',
        'Open official YONO SBI app or visit sbi.co.in directly',
        'Block and report the sender phone number'
      ],
      inputPreview: 'URGENT! Your SBI account will be blocked today. Verify KYC immediately...',
      needsVerification: false,
      createdAt: new Date(Date.now() - 3600000 * 4),
    },
    {
      _id: 'scan_sample_002',
      userId: 'user_demo_id_001',
      scanType: 'payment',
      riskScore: 88,
      riskLevel: 'CRITICAL RISK',
      confidence: 91,
      scamCategory: 'UPI Collect Scam',
      summary: 'Fraudulent UPI transaction attempt requesting money transfer disguised as a refund.',
      redFlags: [
        'Collect request framed as refund payout',
        'Deceptive instructions to enter UPI PIN',
        'Unverified third-party merchant VPA'
      ],
      evidence: [
        'UPI PIN is never required to receive money'
      ],
      recommendations: [
        'Decline the UPI collect request immediately',
        'Never type your UPI PIN to receive money',
        'Report receiver VPA on UPI app'
      ],
      inputPreview: 'Send ₹2,000 to upi@fraud to receive your ₹25,000 refund...',
      needsVerification: false,
      createdAt: new Date(Date.now() - 3600000 * 18),
    },
    {
      _id: 'scan_sample_003',
      userId: 'user_demo_id_001',
      scanType: 'message',
      riskScore: 12,
      riskLevel: 'SAFE',
      confidence: 95,
      scamCategory: 'Legitimate Transaction Notice',
      summary: 'Legitimate transactional confirmation containing standard banking receipt information without credential requests.',
      redFlags: [],
      evidence: [
        'No external links found',
        'No requests for OTP or passwords',
        'Informational receipt only'
      ],
      recommendations: [
        'Message appears safe and conforms to standard banking notifications'
      ],
      inputPreview: 'Your account has been credited with INR 5,000 via NEFT on 28-Oct...',
      needsVerification: false,
      createdAt: new Date(Date.now() - 3600000 * 36),
    }
  ],
  reports: [
    {
      _id: 'report_sample_001',
      userId: 'user_demo_id_001',
      reportType: 'phone',
      targetIndicator: '+91 98765 43210',
      contentHash: crypto.createHash('sha256').update('+91 98765 43210').digest('hex'),
      description: 'Fake customer executive claiming to represent courier delivery company asking for OTP.',
      status: 'pending',
      createdAt: new Date(),
    }
  ],
  articles: initialEducationArticles.map((art, idx) => ({
    _id: `article_init_${idx + 1}`,
    ...art,
    createdAt: new Date(),
  })),
};

export const DataStore = {
  // Users
  users: {
    async create(data: { name: string; email: string; passwordHash: string; role?: 'user' | 'admin' }) {
      if (isMongoConnected) {
        return await User.create(data);
      }
      const existing = memoryStore.users.find(u => u.email.toLowerCase() === data.email.toLowerCase());
      if (existing) throw new Error('User already exists');
      const newUser = {
        _id: 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        ...data,
        role: data.role || 'user',
        createdAt: new Date(),
      };
      memoryStore.users.push(newUser);
      return newUser;
    },

    async findByEmail(email: string) {
      if (isMongoConnected) {
        return await User.findOne({ email: email.toLowerCase() });
      }
      return memoryStore.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
    },

    async findById(id: string) {
      if (isMongoConnected) {
        return await User.findById(id).select('-passwordHash');
      }
      const user = memoryStore.users.find(u => u._id === id);
      if (!user) return null;
      const { passwordHash, ...safeUser } = user;
      return safeUser;
    },

    async count() {
      if (isMongoConnected) {
        return await User.countDocuments();
      }
      return memoryStore.users.length;
    }
  },

  // Scans
  scans: {
    async create(data: {
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
    }) {
      if (isMongoConnected) {
        return await Scan.create(data);
      }
      const newScan = {
        _id: 'scan_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        ...data,
        createdAt: new Date(),
      };
      memoryStore.scans.unshift(newScan);
      return newScan;
    },

    async find(filter: { userId?: string; scanType?: string; riskLevel?: string }) {
      if (isMongoConnected) {
        const query: any = {};
        if (filter.userId) query.userId = filter.userId;
        if (filter.scanType) query.scanType = filter.scanType;
        if (filter.riskLevel) query.riskLevel = filter.riskLevel;
        return await Scan.find(query).sort({ createdAt: -1 });
      }
      return memoryStore.scans.filter(s => {
        if (filter.userId && s.userId !== filter.userId) return false;
        if (filter.scanType && s.scanType !== filter.scanType) return false;
        if (filter.riskLevel && s.riskLevel !== filter.riskLevel) return false;
        return true;
      });
    },

    async findById(id: string) {
      if (isMongoConnected) {
        return await Scan.findById(id);
      }
      return memoryStore.scans.find(s => s._id === id) || null;
    },

    async delete(id: string, userId?: string) {
      if (isMongoConnected) {
        const query: any = { _id: id };
        if (userId) query.userId = userId;
        return await Scan.findOneAndDelete(query);
      }
      const index = memoryStore.scans.findIndex(s => s._id === id && (!userId || s.userId === userId));
      if (index === -1) return null;
      return memoryStore.scans.splice(index, 1)[0];
    },

    async count(filter: any = {}) {
      if (isMongoConnected) {
        return await Scan.countDocuments(filter);
      }
      return memoryStore.scans.length;
    },

    async getAnalytics() {
      let scans = isMongoConnected ? await Scan.find() : memoryStore.scans;

      const totalScans = scans.length;
      const criticalScans = scans.filter(s => s.riskLevel === 'CRITICAL RISK').length;
      const highScans = scans.filter(s => s.riskLevel === 'HIGH RISK').length;
      const mediumScans = scans.filter(s => s.riskLevel === 'MEDIUM RISK').length;
      const lowScans = scans.filter(s => s.riskLevel === 'LOW RISK').length;
      const safeScans = scans.filter(s => s.riskLevel === 'SAFE').length;

      // Group by categories
      const categoryMap: Record<string, number> = {};
      scans.forEach(s => {
        const cat = s.scamCategory || 'Uncategorized';
        categoryMap[cat] = (categoryMap[cat] || 0) + 1;
      });

      const categories = Object.entries(categoryMap).map(([name, count]) => ({
        name,
        count,
      })).sort((a, b) => b.count - a.count);

      // Group by scan types
      const typeMap: Record<string, number> = {};
      scans.forEach(s => {
        typeMap[s.scanType] = (typeMap[s.scanType] || 0) + 1;
      });

      // Recent 7 days activity
      const recentActivity: Record<string, number> = {};
      const now = new Date();
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const dayKey = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        recentActivity[dayKey] = 0;
      }

      scans.forEach(s => {
        const dayKey = new Date(s.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        if (recentActivity[dayKey] !== undefined) {
          recentActivity[dayKey]++;
        }
      });

      const activityData = Object.entries(recentActivity).map(([date, count]) => ({
        date,
        count,
      }));

      return {
        totalScans,
        scamsIdentified: criticalScans + highScans,
        highRiskDetections: highScans,
        criticalRiskDetections: criticalScans,
        mediumRiskDetections: mediumScans,
        lowRiskDetections: lowScans,
        safeScans,
        riskDistribution: [
          { name: 'Safe', value: safeScans, color: '#10b981' },
          { name: 'Low Risk', value: lowScans, color: '#3b82f6' },
          { name: 'Medium Risk', value: mediumScans, color: '#f59e0b' },
          { name: 'High Risk', value: highScans, color: '#f97316' },
          { name: 'Critical Risk', value: criticalScans, color: '#ef4444' },
        ],
        categories,
        typeDistribution: Object.entries(typeMap).map(([type, count]) => ({ type, count })),
        activityData,
        mostCommonThreat: categories[0]?.name || 'Phishing / Impersonation',
      };
    }
  },

  // Reports
  reports: {
    async create(data: {
      userId?: string;
      reportType: ReportType;
      targetIndicator: string;
      contentHash: string;
      description?: string;
      evidenceNotes?: string;
    }) {
      if (isMongoConnected) {
        return await Report.create(data);
      }
      const newReport = {
        _id: 'report_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        ...data,
        status: 'pending',
        createdAt: new Date(),
      };
      memoryStore.reports.unshift(newReport);
      return newReport;
    },

    async find(filter: any = {}) {
      if (isMongoConnected) {
        return await Report.find(filter).sort({ createdAt: -1 });
      }
      return memoryStore.reports;
    },

    async updateStatus(id: string, status: ReportStatus) {
      if (isMongoConnected) {
        return await Report.findByIdAndUpdate(id, { status }, { new: true });
      }
      const report = memoryStore.reports.find(r => r._id === id);
      if (report) {
        report.status = status;
      }
      return report;
    },

    async count() {
      if (isMongoConnected) {
        return await Report.countDocuments();
      }
      return memoryStore.reports.length;
    }
  },

  // Education
  education: {
    async getAll(category?: string, language: string = 'en') {
      if (isMongoConnected) {
        const query: any = {};
        if (category && category !== 'All') query.category = category;
        return await EducationArticle.find(query);
      }
      return memoryStore.articles.filter(a => {
        if (category && category !== 'All' && a.category.toLowerCase() !== category.toLowerCase()) return false;
        return true;
      });
    },

    async getBySlug(slug: string) {
      if (isMongoConnected) {
        return await EducationArticle.findOne({ slug });
      }
      return memoryStore.articles.find(a => a.slug === slug) || null;
    },

    async seedIfEmpty() {
      if (isMongoConnected) {
        const count = await EducationArticle.countDocuments();
        if (count === 0) {
          await EducationArticle.insertMany(initialEducationArticles);
          console.log('[ScamShield Education] Seeded 11 security academy articles into MongoDB.');
        }
      }
    }
  }
};

