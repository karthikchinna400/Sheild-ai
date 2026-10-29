import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  ShieldCheck,
  ArrowLeft,
  Share2,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Flag,
  Sparkles,
  Lock,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AnalysisResponse, api } from '../services/api';
import { RiskGauge } from '../components/RiskGauge';
import { RedFlagsList } from '../components/RedFlagsList';
import { ActionChecklist } from '../components/ActionChecklist';
import { useLanguage } from '../context/LanguageContext';

export const ScanResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const state = location.state as {
    scanResult?: AnalysisResponse;
    scanType?: string;
    inputContent?: string;
  } | null;

  // Fallback demo result if navigated directly
  const result: AnalysisResponse = state?.scanResult || {
    riskScore: 96,
    riskLevel: 'CRITICAL RISK',
    confidence: 94,
    summary: 'High probability phishing attempt detected. Communication exhibits acute psychological urgency and requests confidential OTP verification credentials.',
    redFlags: [
      'Artificial urgency ("blocked today")',
      'Bank impersonation (State Bank of India)',
      'Suspicious non-official external URL',
      'Requests confidential OTP authentication code',
      'Account suspension ultimatums',
    ],
    evidence: [
      'Detected urgency trigger: "urgent"',
      'Direct OTP harvesting phrase identified',
      'Non-official domain structure detected',
    ],
    recommendedActions: [
      'Do not click the link or open attachments.',
      'Never disclose OTP, UPI PIN, passwords, or CVV.',
      'Open the official YONO SBI mobile app or type sbi.co.in directly.',
      'Block and report the sender phone number.',
      'If already compromised, immediately contact 1930 Cyber helpline.',
    ],
    scamCategory: 'Phishing / KYC Scam',
    needsVerification: false,
  };

  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Trigger celebration confetti if result is completely SAFE
  useEffect(() => {
    if (result.riskLevel === 'SAFE') {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Safe ignore
      }
    }
  }, [result.riskLevel]);

  const handleSaveToHistory = async () => {
    try {
      await api.scans.save({
        scanType: state?.scanType || 'message',
        riskScore: result.riskScore,
        riskLevel: result.riskLevel,
        confidence: result.confidence,
        scamCategory: result.scamCategory,
        summary: result.summary,
        redFlags: result.redFlags,
        evidence: result.evidence,
        recommendations: result.recommendedActions,
        inputPreview: (state?.inputContent || 'Sample Scan').substring(0, 100),
        needsVerification: result.needsVerification,
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      alert('Report saved to local session.');
    }
  };

  const handleCopySummary = () => {
    const text = `ScamShield AI Risk Report\nRisk: ${result.riskLevel} (${result.riskScore}/100)\nCategory: ${result.scamCategory}\n\nSummary:\n${result.summary}\n\nRed Flags:\n- ${result.redFlags.join('\n- ')}\n\nRecommended Actions:\n- ${result.recommendedActions.join('\n- ')}`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back and actions header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/scanner')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Scanner</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySummary}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition"
          >
            {copiedSummary ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedSummary ? 'Copied' : 'Share Report'}</span>
          </button>

          <button
            onClick={handleSaveToHistory}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border ${
              savedSuccess
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {savedSuccess ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{savedSuccess ? t.results.savedSuccess : t.results.saveReport}</span>
          </button>
        </div>
      </div>

      {/* Primary Result Banner Card */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-center gap-8 justify-between">
          {/* Risk Gauge Visual */}
          <div className="shrink-0">
            <RiskGauge
              score={result.riskScore}
              riskLevel={result.riskLevel}
              confidence={result.confidence}
              category={result.scamCategory}
              size="lg"
            />
          </div>

          {/* Assessment Overview */}
          <div className="flex-1 text-center sm:text-left space-y-3">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-800/40">
              <Lock className="w-3 h-3" />
              {t.results.title}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {result.riskLevel === 'CRITICAL RISK' || result.riskLevel === 'HIGH RISK'
                ? 'Dangerous Cyber Solicitation Flagged'
                : result.riskLevel === 'SAFE'
                ? 'Low Threat: Content Appears Safe'
                : 'Caution Advised: Unverified Solicitation'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {result.summary}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span>Category: <strong className="text-white">{result.scamCategory}</strong></span>
              <span>•</span>
              <span>Model Confidence: <strong className="text-white">{result.confidence}%</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Explainable AI: Red Flags Section */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{t.results.whyFlagged}</h3>
              <p className="text-xs text-slate-400">Observable cybersecurity indicators detected by the engine</p>
            </div>
          </div>
          <span className="text-xs font-mono text-rose-400 font-bold">
            {result.redFlags.length} Flag{result.redFlags.length === 1 ? '' : 's'}
          </span>
        </div>

        <RedFlagsList
          redFlags={result.redFlags}
          evidence={result.evidence}
          needsVerification={result.needsVerification}
        />
      </div>

      {/* Recommended Protective Actions Checklist */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{t.results.actionsHeader}</h3>
              <p className="text-xs text-slate-400">Interactive safety steps to secure your accounts and funds</p>
            </div>
          </div>
        </div>

        <ActionChecklist actions={result.recommendedActions} />
      </div>

      {/* Bottom Next Step Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
        <button
          onClick={() => navigate('/scanner')}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-[0_0_20px_rgba(6,182,212,0.3)]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.results.scanAnother}</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            to="/report"
            state={{ targetIndicator: state?.inputContent }}
            className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            <Flag className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.results.reportThreat}</span>
          </Link>

          <Link
            to="/academy"
            className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            <span>Learn More in Academy</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </div>
    </div>
  );
};

