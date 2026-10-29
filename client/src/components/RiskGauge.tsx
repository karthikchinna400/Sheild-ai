import React from 'react';
import { ShieldAlert, ShieldCheck, Shield, AlertTriangle, AlertOctagon } from 'lucide-react';

interface RiskGaugeProps {
  score: number;
  riskLevel: 'SAFE' | 'LOW RISK' | 'MEDIUM RISK' | 'HIGH RISK' | 'CRITICAL RISK';
  confidence?: number;
  category?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score,
  riskLevel,
  confidence = 90,
  category,
  size = 'md',
}) => {
  const getColors = () => {
    switch (riskLevel) {
      case 'SAFE':
        return {
          stroke: '#10b981',
          bg: 'rgba(16, 185, 129, 0.1)',
          badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
          glow: 'shadow-[0_0_25px_rgba(16,185,129,0.35)]',
          icon: ShieldCheck,
        };
      case 'LOW RISK':
        return {
          stroke: '#3b82f6',
          bg: 'rgba(59, 130, 246, 0.1)',
          badge: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
          glow: 'shadow-[0_0_25px_rgba(59,130,246,0.35)]',
          icon: Shield,
        };
      case 'MEDIUM RISK':
        return {
          stroke: '#f59e0b',
          bg: 'rgba(245, 158, 11, 0.1)',
          badge: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
          glow: 'shadow-[0_0_25px_rgba(245,158,11,0.35)]',
          icon: AlertTriangle,
        };
      case 'HIGH RISK':
        return {
          stroke: '#f97316',
          bg: 'rgba(249, 115, 22, 0.1)',
          badge: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
          glow: 'shadow-[0_0_30px_rgba(249,115,22,0.4)]',
          icon: AlertOctagon,
        };
      case 'CRITICAL RISK':
      default:
        return {
          stroke: '#ef4444',
          bg: 'rgba(239, 68, 68, 0.12)',
          badge: 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse',
          glow: 'shadow-[0_0_35px_rgba(239,68,68,0.5)]',
          icon: ShieldAlert,
        };
    }
  };

  const theme = getColors();
  const Icon = theme.icon;

  const radius = size === 'lg' ? 90 : size === 'sm' ? 45 : 70;
  const strokeWidth = size === 'lg' ? 14 : size === 'sm' ? 8 : 11;
  const svgSize = (radius + strokeWidth) * 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(score, 0), 100);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`relative flex items-center justify-center rounded-full p-2 ${theme.glow}`}>
        <svg
          width={svgSize}
          height={svgSize}
          className="transform -rotate-90 transition-all duration-1000 ease-out"
        >
          {/* Background circle */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated score circle */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke={theme.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <Icon className={`${size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'} mb-1`} style={{ color: theme.stroke }} />
          <div className={`${size === 'lg' ? 'text-4xl' : size === 'sm' ? 'text-xl' : 'text-3xl'} font-extrabold tracking-tight text-white`}>
            {score}
            <span className="text-xs text-slate-400 font-normal">/100</span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Risk Score</span>
        </div>
      </div>

      {/* Level badge */}
      <div className="mt-4 flex flex-col items-center gap-1.5">
        <span className={`px-4 py-1 rounded-full text-xs font-bold border tracking-wide uppercase ${theme.badge}`}>
          {riskLevel}
        </span>
        {category && (
          <span className="text-xs font-medium text-slate-300 bg-slate-800/80 px-2.5 py-0.5 rounded border border-slate-700/60">
            {category}
          </span>
        )}
        <span className="text-[11px] text-slate-400">
          AI Confidence: <strong className="text-slate-200">{confidence}%</strong>
        </span>
      </div>
    </div>
  );
};

