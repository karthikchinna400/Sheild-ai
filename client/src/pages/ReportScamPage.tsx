import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  AlertTriangle,
  Flag,
  CheckCircle2,
  Lock,
  PhoneCall,
  ExternalLink,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { api } from '../services/api';

export const ReportScamPage: React.FC = () => {
  const location = useLocation();
  const prefillIndicator = (location.state as any)?.targetIndicator || '';

  const [reportType, setReportType] = useState<string>('phone');
  const [targetIndicator, setTargetIndicator] = useState<string>(prefillIndicator);
  const [description, setDescription] = useState<string>('');
  const [evidenceNotes, setEvidenceNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetIndicator.trim()) {
      setErrorMsg('Please specify the suspicious phone number, URL, or identifier.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      await api.reports.submit({
        reportType,
        targetIndicator: targetIndicator.trim(),
        description: description.trim(),
      });
      setSubmittedSuccess(true);
      setTargetIndicator('');
      setDescription('');
      setEvidenceNotes('');
    } catch (err: any) {
      setErrorMsg('Failed to submit scam report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const reportTypes = [
    { id: 'phone', label: 'Suspicious Phone / WhatsApp Number' },
    { id: 'url', label: 'Phishing Web URL / Link' },
    { id: 'message', label: 'Fraudulent SMS / Message' },
    { id: 'payment', label: 'UPI ID / Payment Collect Request' },
    { id: 'email', label: 'Phishing Email / Domain' },
    { id: 'job', label: 'Fake Job / Telegram Task Offer' },
    { id: 'social', label: 'Impersonating Social Profile' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/60 text-xs font-semibold text-amber-400">
          <Flag className="w-3.5 h-3.5" />
          Community Threat Reporting
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Report a Scam Indicator
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Help crowdsource cybersecurity defense. Submit suspicious numbers, links, or accounts for automated threat analysis and community moderation.
        </p>
      </div>

      {/* Form Container */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
        {submittedSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white">Report Successfully Submitted</h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              Thank you for protecting fellow netizens. The reported indicator has been hashed and queued for threat database synchronization.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setSubmittedSuccess(false)}
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition"
              >
                Submit Another Report
              </button>
              <Link
                to="/scanner"
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition"
              >
                Go to Threat Scanner
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl text-xs text-rose-300">
                {errorMsg}
              </div>
            )}

            {/* Indicator Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Type of Threat Indicator
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {reportTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setReportType(type.id)}
                    className={`p-3 rounded-xl text-left text-xs font-semibold border transition-all ${
                      reportType === type.id
                        ? 'bg-cyan-950/70 border-cyan-500/60 text-cyan-300'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:bg-slate-950 hover:text-slate-200'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Target identifier input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Suspicious Phone / URL / UPI ID / Target
              </label>
              <input
                type="text"
                required
                value={targetIndicator}
                onChange={(e) => setTargetIndicator(e.target.value)}
                placeholder="e.g., +91 98765 43210 or https://fake-sbi-login.xyz or refund@fraudupi"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Incident Description & Modus Operandi (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Explain what the caller or message claimed (e.g. claimed electricity was being cut off, requested OTP, sent collect request)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Privacy Protection Notice */}
            <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-start gap-3 text-xs text-slate-400">
              <Lock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-300">Privacy Safeguard:</strong> Submitted reports are irreversibly cryptographically hashed using SHA-256 for threat classification. Personal victim identities are never publicly exposed.
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              <Flag className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting to Moderation DB...' : 'Submit Threat Report'}</span>
            </button>
          </form>
        )}
      </div>

      {/* Emergency Cyber Cell Notice */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/30 to-slate-900 border border-rose-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-rose-300">Suffered Financial Loss Already?</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Reports to ScamShield AI are for intelligence aggregation. For immediate fund freezing, call National Cybercrime Helpline 1930.
          </p>
        </div>
        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5"
        >
          <span>cybercrime.gov.in</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

