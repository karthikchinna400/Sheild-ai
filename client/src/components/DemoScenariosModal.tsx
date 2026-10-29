import React from 'react';
import { X, Play, ShieldAlert, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';

export interface DemoScenario {
  id: string;
  title: string;
  category: string;
  scanType: 'message' | 'url' | 'job' | 'payment';
  content: string;
  expectedRisk: string;
  riskBadge: string;
  description: string;
}

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'sbi-kyc',
    title: 'Urgent Bank KYC / Account Block Alert',
    category: 'Phishing / SMS Fraud',
    scanType: 'message',
    content: 'URGENT! Your SBI account will be blocked today. Verify your KYC immediately by clicking https://sbi-security-verify.xyz/login and entering your OTP.',
    expectedRisk: 'CRITICAL (96/100)',
    riskBadge: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
    description: 'High-pressure fear tactic impersonating India’s largest bank to harvest OTP credentials.',
  },
  {
    id: 'job-task',
    title: 'Work-from-Home YouTube Task Scam',
    category: 'Job Scam',
    scanType: 'job',
    content: 'Part-time job offer! Earn ₹3,000 to ₹8,000 daily by liking YouTube videos and rating hotels on Google Maps. Work 1 hour per day from home. Contact HR on Telegram @EarnFast2025. Mandatory registration fee of ₹500 refundable after first payout.',
    expectedRisk: 'HIGH RISK (85/100)',
    riskBadge: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
    description: 'Task-based recruitment deception requiring upfront fees and directing victims to Telegram.',
  },
  {
    id: 'upi-refund',
    title: 'Deceptive UPI Collect / Refund Scam',
    category: 'Payment Scam',
    scanType: 'payment',
    content: 'Dear customer, your refund of ₹2,500 is pending. Please accept this UPI collect request and enter your UPI PIN to receive the refund into your bank account immediately.',
    expectedRisk: 'CRITICAL (94/100)',
    riskBadge: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
    description: 'Exploits common confusion by claiming entering a UPI PIN receives money instead of debiting it.',
  },
  {
    id: 'kbc-lottery',
    title: 'KBC Lottery / Cash Prize Notification',
    category: 'Lottery Scam',
    scanType: 'message',
    content: 'Congratulations! You have won ₹25,00,000 in KBC Mega Lucky Draw Contest 2026! To claim your cash prize directly to your bank account, send message to WhatsApp manager +91 98765 43210 and deposit ₹12,500 government processing fee.',
    expectedRisk: 'HIGH RISK (88/100)',
    riskBadge: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
    description: 'Classic lottery advance-fee fraud asking for upfront taxes on a contest never entered.',
  },
  {
    id: 'phishing-url',
    title: 'Suspicious IP / Lookalike Banking URL',
    category: 'Malicious Link',
    scanType: 'url',
    content: 'http://192.168.1.1/sbi-online-banking-kyc-update.xyz/login.php',
    expectedRisk: 'CRITICAL (92/100)',
    riskBadge: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
    description: 'Unencrypted plain HTTP link utilizing a raw IP address and high-risk .xyz TLD with banking keywords.',
  },
  {
    id: 'safe-bank',
    title: 'Legitimate Bank Transaction Receipt',
    category: 'Safe Content',
    scanType: 'message',
    content: 'Dear Customer, INR 5,000.00 credited to your A/C XX1234 on 28-OCT-2026 by NEFT. Ref: 42981039812. Available Balance: INR 34,210.00. - State Bank of India',
    expectedRisk: 'SAFE (10/100)',
    riskBadge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    description: 'Informational bank credit receipt with standard reference numbers, no credential demands, and no links.',
  },
];

interface DemoScenariosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScenario: (scenario: DemoScenario) => void;
}

export const DemoScenariosModal: React.FC<DemoScenariosModalProps> = ({
  isOpen,
  onClose,
  onSelectScenario,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-cyan-500/20 rounded-xl text-cyan-400 border border-cyan-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Live Presentation Scenarios</h3>
              <p className="text-xs text-slate-400">Click any realistic scenario below to run an instant 10-second workshop demo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {DEMO_SCENARIOS.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectScenario(item);
                onClose();
              }}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/60 hover:bg-slate-800/60 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold tracking-wider text-cyan-400 uppercase">
                    {item.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.riskBadge}`}>
                    {item.expectedRisk}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 mb-3">{item.description}</p>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800/80 text-xs text-slate-300 font-mono line-clamp-2 italic">
                  "{item.content}"
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                <span>Run This Demo</span>
                <Play className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

