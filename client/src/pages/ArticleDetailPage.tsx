import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  PhoneCall,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Share2,
} from 'lucide-react';
import { api, EducationArticleItem } from '../services/api';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<EducationArticleItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      setIsLoading(true);
      try {
        const data = await api.education.getBySlug(slug);
        setArticle(data);
      } catch (err) {
        setErrorMsg('Security guide not found.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-500 text-xs">
        Loading cybersecurity academy guide...
      </div>
    );
  }

  if (errorMsg || !article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Guide Not Found</h2>
        <p className="text-xs text-slate-400">The requested cybersecurity playbook could not be located.</p>
        <Link
          to="/academy"
          className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-xl text-xs font-bold"
        >
          Return to Scam Academy
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate('/academy')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Scam Academy</span>
      </button>

      {/* Guide Header */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/60">
            {article.category}
          </span>
          <span className="text-xs text-slate-400">Published by ScamShield Research</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
          {article.title}
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          {article.summary}
        </p>
      </div>

      {/* Section 1: What It Is */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          1. What It Is
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {article.whatItIs}
        </p>
      </div>

      {/* Section 2: How It Works */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          2. How The Attackers Execute It
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {article.howItWorks}
        </p>
      </div>

      {/* Section 3: Warning Signs */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          3. Critical Warning Signs
        </h2>
        <div className="space-y-2">
          {article.warningSigns.map((sign, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-rose-950/20 border border-rose-500/20 text-xs text-rose-200">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
              <span>{sign}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: How To Stay Safe */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          4. How to Stay Safe & Preventive Measures
        </h2>
        <div className="space-y-2">
          {article.howToStaySafe.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5: What To Do If Affected */}
      <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-rose-300 flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-rose-400" />
            5. What To Do If You Have Been Affected
          </h2>
          <a
            href="tel:1930"
            className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
          >
            <PhoneCall className="w-3 h-3" /> Dial 1930 Helpline
          </a>
        </div>
        <div className="space-y-2">
          {article.whatToDoIfAffected.map((action, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/70 border border-rose-900/40 text-xs text-slate-200">
              <span className="font-mono text-cyan-400 font-bold shrink-0">{idx + 1}.</span>
              <span>{action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA to Scanner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Received something similar?</h4>
          <p className="text-xs text-slate-400">Run a free AI risk analysis in seconds.</p>
        </div>
        <Link
          to="/scanner"
          className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition"
        >
          Scan Suspicious Content
        </Link>
      </div>
    </div>
  );
};

