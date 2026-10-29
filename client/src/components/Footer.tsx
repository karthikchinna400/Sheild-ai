import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, PhoneCall, ExternalLink, Lock, AlertOctagon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 text-slate-400 text-xs mt-20">
      {/* Golden Rule Emergency Warning Strip */}
      <div className="bg-gradient-to-r from-rose-950/80 via-slate-900 to-rose-950/80 border-b border-rose-900/40 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-rose-300 font-semibold text-xs sm:text-sm">
            <AlertOctagon className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{t.goldenRuleWarning}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-xs">Victim of financial fraud? Call immediately:</span>
            <a
              href="tel:1930"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg transition"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              1930 (Helpline)
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-600 flex items-center justify-center text-white">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-white tracking-tight">ScamShield AI</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Defensive cybersecurity intelligence platform protecting citizens from digital fraud, phishing campaigns, and predatory social engineering.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400 font-mono bg-cyan-950/60 px-2 py-1 rounded border border-cyan-800/40">
              <Lock className="w-3 h-3" />
              Strict Defensive Architecture
            </div>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Threat Scanners</h4>
            <ul className="space-y-2">
              <li><Link to="/scanner?tab=message" className="hover:text-cyan-400 transition">SMS & Chat Scanner</Link></li>
              <li><Link to="/scanner?tab=url" className="hover:text-cyan-400 transition">Malicious URL Inspector</Link></li>
              <li><Link to="/scanner?tab=screenshot" className="hover:text-cyan-400 transition">Vision Screenshot Scanner</Link></li>
              <li><Link to="/scanner?tab=payment" className="hover:text-cyan-400 transition">UPI & Payment Fraud Detector</Link></li>
              <li><Link to="/scanner?tab=job" className="hover:text-cyan-400 transition">Job & Task Scam Detector</Link></li>
            </ul>
          </div>

          {/* Scam Academy & Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Education & Defense</h4>
            <ul className="space-y-2">
              <li><Link to="/academy" className="hover:text-cyan-400 transition">Scam Academy Guides</Link></li>
              <li><Link to="/academy#upi" className="hover:text-cyan-400 transition">UPI Collect Safeguards</Link></li>
              <li><Link to="/academy#phishing" className="hover:text-cyan-400 transition">Phishing Recognition</Link></li>
              <li><Link to="/report" className="hover:text-cyan-400 transition">Submit Threat Report</Link></li>
              <li><Link to="/privacy" className="hover:text-cyan-400 transition">Privacy Charter & Ethics</Link></li>
            </ul>
          </div>

          {/* Official Helplines & Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Official Cyber Portals</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-cyan-400 transition"
                >
                  cybercrime.gov.in <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://sancharsaathi.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-cyan-400 transition"
                >
                  Sanchar Saathi (Chakshu) <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://scores.sebi.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-cyan-400 transition"
                >
                  SEBI SCORES (Securities) <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.npci.org.in"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-cyan-400 transition"
                >
                  NPCI UPI Dispute Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Strip */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p className="max-w-2xl text-center sm:text-left">
            {t.disclaimer} ScamShield AI operates purely as an advisory decision-support system. Never provide sensitive passwords or financial credentials online.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-slate-300">Security Ethics</Link>
            <span>•</span>
            <span>© 2026 ScamShield AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

