import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../translations';
import { Globe } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const options: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'EN' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  ];

  return (
    <div className="relative inline-flex items-center bg-slate-900/80 border border-slate-700/80 rounded-lg p-0.5 text-xs">
      <Globe className="w-3.5 h-3.5 ml-2 text-cyan-400" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="bg-transparent text-slate-200 py-1.5 pl-1.5 pr-2 rounded focus:outline-none cursor-pointer text-xs font-medium"
      >
        {options.map((opt) => (
          <option key={opt.code} value={opt.code} className="bg-slate-900 text-white">
            {opt.label} ({opt.native})
          </option>
        ))}
      </select>
    </div>
  );
};

