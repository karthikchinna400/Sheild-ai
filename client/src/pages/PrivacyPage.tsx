import React from 'react';
import { Lock, ShieldCheck, ShieldAlert, EyeOff, FileText, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const PrivacyPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-xs font-semibold text-cyan-400">
          <Lock className="w-3.5 h-3.5" />
          Zero-Knowledge Privacy Charter
        </div>
        <h1 className="text-3xl font-extrabold text-white">Privacy Policy & AI Safety Ethics</h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          How ScamShield AI ensures citizen protection without compromising confidentiality or harvesting sensitive credentials.
        </p>
      </div>

      {/* Core Privacy Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            title: "Never Requests Sensitive Secrets",
            desc: "ScamShield AI will NEVER prompt you for your OTP, UPI PIN, bank login password, debit card CVV, or full card numbers.",
            icon: EyeOff,
          },
          {
            title: "Zero Plaintext Credential Storage",
            desc: "User passwords are encrypted with bcrypt salt hashing. Scan history snippets are automatically scrubbed and redacted of numeric sequences.",
            icon: Lock,
          },
          {
            title: "Strict Defensive Boundary",
            desc: "ScamShield AI operates strictly as a defensive analysis engine. The AI is architecturally restricted from producing malicious phishing pages or exploits.",
            icon: ShieldCheck,
          },
          {
            title: "Non-Intrusive URL Inspection",
            desc: "Suspicious URLs are evaluated syntactically in safe sandboxes. Dangerous links are never visited directly from your client browser.",
            icon: ShieldAlert,
          },
        ].map((principle, idx) => {
          const Icon = principle.icon;
          return (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 flex items-center justify-center mb-2">
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">{principle.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{principle.desc}</p>
            </div>
          );
        })}
      </div>

      {/* AI Limitations & Advisory Disclaimer */}
      <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
        <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          Important AI Risk Assessment Disclaimer
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          "{t.disclaimer}"
        </p>
        <p className="text-xs text-slate-400 leading-relaxed">
          ScamShield AI provides probabilistic defensive intelligence. It does not replace formal verification with your financial institution or law enforcement agencies. When in doubt, always independently confirm with the sender through official verified phone numbers found on the back of your bank debit card.
        </p>
      </div>

      {/* Data Retention & Deletion Rights */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          Data Retention & User Controls
        </h3>
        <ul className="space-y-2 text-xs text-slate-300">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Full Deletion Rights:</strong> You can delete any saved scan from your Scan History at any time with a single click.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Session Guest Scans:</strong> You may execute threat scans without creating an account; guest scans are preserved only in local session memory.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Encrypted In Transit:</strong> All communications between your device and ScamShield AI are encrypted with TLS 1.3 / HTTPS.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

