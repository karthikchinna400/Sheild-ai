import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  Globe,
  Image as ImageIcon,
  Mail,
  Briefcase,
  CreditCard,
  Search,
  Upload,
  AlertCircle,
  Sparkles,
  Mic,
  ShieldAlert,
  HelpCircle,
} from 'lucide-react';
import { api, AnalysisResponse } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { DemoScenario } from '../components/DemoScenariosModal';

interface ScannerPageProps {
  onOpenDemo?: () => void;
  onOpenVoice?: () => void;
  injectedScenario?: DemoScenario | null;
  onClearInjectedScenario?: () => void;
}

export const ScannerPage: React.FC<ScannerPageProps> = ({
  onOpenDemo,
  onOpenVoice,
  injectedScenario,
  onClearInjectedScenario,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'message' | 'url' | 'screenshot' | 'email' | 'job' | 'payment'>('message');
  const [inputText, setInputText] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync tab with URL query parameter ?tab=...
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['message', 'url', 'screenshot', 'email', 'job', 'payment'].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, [searchParams]);

  // Handle injected demo scenario from modal
  useEffect(() => {
    if (injectedScenario) {
      setActiveTab(injectedScenario.scanType);
      setInputText(injectedScenario.content);
      if (onClearInjectedScenario) {
        onClearInjectedScenario();
      }
    }
  }, [injectedScenario, onClearInjectedScenario]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setErrorMsg('Image file size exceeds the 10 MB limit.');
        return;
      }
      setSelectedFile(file);
      setErrorMsg(null);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleScan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);

    if (activeTab === 'screenshot' && !selectedFile) {
      setErrorMsg('Please choose an image or screenshot file to analyze.');
      return;
    }

    if (activeTab !== 'screenshot' && !inputText.trim()) {
      setErrorMsg('Please enter or paste the content to inspect.');
      return;
    }

    setIsScanning(true);

    try {
      let result: AnalysisResponse;

      if (activeTab === 'url') {
        result = await api.ai.analyzeUrl(inputText.trim());
      } else if (activeTab === 'job') {
        result = await api.ai.analyzeJob(inputText.trim());
      } else if (activeTab === 'payment') {
        result = await api.ai.analyzePayment(inputText.trim());
      } else if (activeTab === 'screenshot' && selectedFile) {
        result = await api.ai.analyzeImage(selectedFile, inputText.trim());
      } else {
        // Message or Email
        result = await api.ai.analyzeMessage(inputText.trim());
      }

      // Automatically persist to scan database
      try {
        await api.scans.save({
          scanType: activeTab,
          riskScore: result.riskScore,
          riskLevel: result.riskLevel,
          confidence: result.confidence,
          scamCategory: result.scamCategory,
          summary: result.summary,
          redFlags: result.redFlags,
          evidence: result.evidence,
          recommendations: result.recommendedActions,
          inputPreview: activeTab === 'screenshot' ? 'Screenshot Upload Analysis' : inputText.trim(),
          needsVerification: result.needsVerification,
        });
      } catch (err) {
        console.warn('Scan saved to session memory only:', err);
      }

      // Navigate to detailed Explainable Result Screen
      navigate('/result', {
        state: {
          scanResult: result,
          scanType: activeTab,
          inputContent: activeTab === 'screenshot' ? 'Screenshot Upload' : inputText.trim(),
        },
      });
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Analysis service temporarily unavailable. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const tabs = [
    { id: 'message', label: t.scanner.tabs.message, icon: MessageSquare },
    { id: 'url', label: t.scanner.tabs.url, icon: Globe },
    { id: 'screenshot', label: t.scanner.tabs.screenshot, icon: ImageIcon },
    { id: 'email', label: t.scanner.tabs.email, icon: Mail },
    { id: 'job', label: t.scanner.tabs.job, icon: Briefcase },
    { id: 'payment', label: t.scanner.tabs.payment, icon: CreditCard },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs font-semibold text-cyan-400">
          <Search className="w-3.5 h-3.5" />
          Explainable Threat Scanner
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.scanner.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          {t.scanner.subtitle}
        </p>
      </div>

      {/* Main Scanner Container */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setErrorMsg(null);
                }}
                className={`flex items-center gap-2 px-5 py-4 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
                  active
                    ? 'border-cyan-400 text-cyan-300 bg-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Quick Bar */}
        <div className="px-6 pt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            {onOpenDemo && (
              <button
                type="button"
                onClick={onOpenDemo}
                className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 font-semibold flex items-center gap-1.5 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.scanner.demoButton}</span>
              </button>
            )}
            {onOpenVoice && (
              <button
                type="button"
                onClick={onOpenVoice}
                className="px-3 py-1.5 rounded-lg bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 hover:bg-cyan-900/60 font-semibold flex items-center gap-1.5 transition"
              >
                <Mic className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.scanner.voiceButton}</span>
              </button>
            )}
          </div>
          <span className="text-[11px] text-slate-500 italic">
            Zero Credentials Retained • Safe Isolation
          </span>
        </div>

        {/* Input Formulation */}
        <form onSubmit={handleScan} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {activeTab === 'screenshot' ? (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-2xl p-6 sm:p-10 text-center transition-all bg-slate-950/40 cursor-pointer relative">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-white">
                    {selectedFile ? selectedFile.name : 'Click or drag & drop suspicious screenshot'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Supports PNG, JPG, JPEG, WEBP up to 10 MB
                  </p>
                </div>
              </div>

              {previewUrl && (
                <div className="relative rounded-xl overflow-hidden border border-slate-700 max-h-64 flex justify-center bg-black/60">
                  <img src={previewUrl} alt="Screenshot Preview" className="object-contain h-64" />
                </div>
              )}

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Optional: Enter context or suspicious phone number shown in screenshot..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          ) : activeTab === 'url' ? (
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Globe className="w-4 h-4 text-cyan-400" />
                </div>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t.scanner.placeholders.url}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
              <p className="text-[11px] text-slate-500 pl-1">
                🔒 Safe Sandbox Inspection: Link will NOT be visited or executed from your browser.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  activeTab === 'job'
                    ? t.scanner.placeholders.job
                    : activeTab === 'payment'
                    ? t.scanner.placeholders.payment
                    : activeTab === 'email'
                    ? t.scanner.placeholders.email
                    : t.scanner.placeholders.message
                }
                rows={6}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          )}

          {/* Golden Rule Warning Notice */}
          <div className="flex items-center gap-2 p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] text-slate-400">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Privacy Protection:</strong> ScamShield AI will never ask for your passwords, OTP, UPI PIN, or CVV.
            </span>
          </div>

          {/* Submit Trigger */}
          <button
            type="submit"
            disabled={isScanning}
            className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isScanning ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{t.scanner.scanning}</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>{t.scanner.scanButton}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

