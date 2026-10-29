import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Search,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Cpu,
  Lock,
  Globe2,
  CheckCircle2,
  Smartphone,
  CreditCard,
  Briefcase,
  AlertOctagon,
  Eye,
  FileCheck,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LandingPageProps {
  onOpenDemo?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenDemo }) => {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does ScamShield AI determine if a message or link is dangerous?",
      a: "Our defensive AI engine evaluates content across dozens of cyber threat vectors: psychological urgency triggers, credential harvesting markers (requests for OTP, PINs, passwords), brand impersonation, deceptive top-level domains, obfuscated redirect links, and payment manipulation patterns.",
    },
    {
      q: "Does ScamShield AI store my personal messages or banking numbers?",
      a: "No. ScamShield AI follows a strict zero-knowledge privacy charter. We never request or store sensitive passwords, OTPs, UPI PINs, or CVVs. All message previews saved to scan history are automatically scrubbed and redacted.",
    },
    {
      q: "Can I test ScamShield AI without uploading real personal data?",
      a: "Absolutely! Click 'Live Demo Mode' at any time to test 6 pre-loaded real-world scenarios including SBI KYC phishing, YouTube part-time job scams, and UPI refund traps.",
    },
    {
      q: "What should I do if ScamShield AI flags a message as CRITICAL RISK?",
      a: "Immediately follow the generated checklist: do not click any links, do not reply, do not send money, and never share OTPs or UPI PINs. If you already sent funds, call India's national cyber fraud helpline 1930 within the 'golden hour'.",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background glowing cyber gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-cyan-900/20 via-blue-900/10 to-transparent pointer-events-none blur-3xl -z-10" />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>Defensive Cyber Threat Intelligence • Zero-Credential Retention</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {t.brandTagline}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
            {t.brandSubtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/scanner"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Scan Something</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {onOpenDemo && (
              <button
                type="button"
                onClick={onOpenDemo}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 text-amber-300 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Try Demo Scenarios</span>
              </button>
            )}

            <Link
              to="/academy"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all flex items-center justify-center gap-2"
            >
              <span>Learn About Scams</span>
            </Link>
          </div>

          {/* Hero Visual: Cyber Radar / Threat Gauge Simulation */}
          <div className="pt-12 max-w-2xl mx-auto">
            <div className="relative p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-[0_10px_50px_rgba(0,0,0,0.6)] backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="font-mono text-slate-300 font-semibold">LIVE ANALYZER PREVIEW</span>
                </div>
                <span className="font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60 text-[11px]">
                  Explainable AI
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                {/* Input snippet */}
                <div className="sm:col-span-2 text-left bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-sans font-bold">Input Detected:</span>
                  <p className="text-slate-200 italic line-clamp-2">
                    "URGENT: Your SBI account will be blocked today. Verify KYC immediately at https://sbi-verify.xyz and enter OTP."
                  </p>
                </div>

                {/* Score badge */}
                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 text-center">
                  <ShieldAlert className="w-6 h-6 text-rose-400 mb-1" />
                  <span className="text-2xl font-extrabold text-white">96<span className="text-xs text-slate-400 font-normal">/100</span></span>
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">CRITICAL RISK</span>
                </div>
              </div>

              {/* Red flag indicators preview */}
              <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                <span className="px-2.5 py-1 rounded bg-rose-950/50 border border-rose-500/30 text-rose-300">
                  🔴 Artificial Urgency ("blocked today")
                </span>
                <span className="px-2.5 py-1 rounded bg-rose-950/50 border border-rose-500/30 text-rose-300">
                  🔴 Bank Impersonation (SBI)
                </span>
                <span className="px-2.5 py-1 rounded bg-rose-950/50 border border-rose-500/30 text-rose-300">
                  🔴 OTP Harvesting Request
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold text-cyan-400 tracking-wider uppercase mb-2">The Defensive Flow</h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">How ScamShield AI Protects You</h3>
          <p className="text-sm text-slate-400 mt-2">
            Four rapid, intelligent steps to verify suspicious digital solicitations before any financial or credential damage occurs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Input Suspicious Item",
              desc: "Paste an SMS, email, suspicious URL, WhatsApp offer, or upload a conversation screenshot.",
              icon: Search,
            },
            {
              step: "02",
              title: "Multi-Vector AI Analysis",
              desc: "Evaluates urgency patterns, credential demands, domain infrastructure, and visual spoofing markers.",
              icon: Cpu,
            },
            {
              step: "03",
              title: "Explainable Risk Scoring",
              desc: "Receive a transparent 0–100 risk score with explicit reasons explaining WHY it was flagged.",
              icon: Eye,
            },
            {
              step: "04",
              title: "Actionable Safety Defense",
              desc: "Step-by-step protective checklist, official helpline connections, and one-click history archiving.",
              icon: ShieldCheck,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-extrabold text-slate-700 group-hover:text-cyan-400 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-800 group-hover:bg-cyan-500/20 text-cyan-400 flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Supported Threat Vectors */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold text-cyan-400 tracking-wider uppercase mb-2">Comprehensive Coverage</h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Analyzes Every Major Digital Threat</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: "Phishing & Fake Banking Portals",
              desc: "Detects spoofed login portals, punycode domain spoofing, and credential harvesting traps.",
              icon: Lock,
              badge: "High Prevalence",
            },
            {
              title: "UPI Collect & QR Code Frauds",
              desc: "Identifies deceptive collect requests framed as cashback or refunds that secretly debit funds.",
              icon: CreditCard,
              badge: "Financial Danger",
            },
            {
              title: "OTP & Vishing Deceptions",
              desc: "Warns against callers and messages attempting to harvest 2-factor authentication codes.",
              icon: Smartphone,
              badge: "Account Takeover",
            },
            {
              title: "Fake Job & Internship Offers",
              desc: "Flags upfront training fees, Telegram tasks, and video-liking pyramid recruitment schemes.",
              icon: Briefcase,
              badge: "Student Threat",
            },
            {
              title: "Suspicious & Obfuscated URLs",
              desc: "Inspects raw IP addresses, high-risk TLDs, excessive subdomains, and redirect obfuscations.",
              icon: Globe2,
              badge: "Safe Inspection",
            },
            {
              title: "Chat & Screenshot Vision Scans",
              desc: "Upload screenshots of suspicious chats or payment screens for deep visual risk inspection.",
              icon: Eye,
              badge: "Vision AI",
            },
          ].map((scam, idx) => {
            const Icon = scam.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 hover:bg-slate-900/70 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {scam.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">{scam.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{scam.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cyber Safety Statistics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/30 border border-slate-800 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono">10 Sec</div>
              <div className="text-xs text-slate-400 mt-1">Average Scan Latency</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">100%</div>
              <div className="text-xs text-slate-400 mt-1">Defensive Architecture</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">0 Creds</div>
              <div className="text-xs text-slate-400 mt-1">Zero Password Storage</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-rose-400 font-mono">1930</div>
              <div className="text-xs text-slate-400 mt-1">Direct Cyber Helpline Link</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-900">
        <div className="text-center mb-10">
          <h2 className="text-xs font-bold text-cyan-400 tracking-wider uppercase mb-2">Transparency & Ethics</h2>
          <h3 className="text-2xl font-extrabold text-white">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-slate-900/70 border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-slate-200 hover:text-white"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-cyan-900/30 via-slate-900 to-blue-900/30 border border-cyan-500/30 text-center space-y-6 overflow-hidden">
          <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Stay One Step Ahead of Digital Scammers
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Test any suspicious message or link in seconds before you take action. Fast, explainable, and defensive.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/scanner"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              Start Free Threat Scan
            </Link>
            <Link
              to="/academy"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all"
            >
              Explore Scam Academy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

