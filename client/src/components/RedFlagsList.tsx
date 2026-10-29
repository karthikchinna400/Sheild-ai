import React from 'react';
import { AlertCircle, AlertTriangle, ShieldX, HelpCircle } from 'lucide-react';

interface RedFlagsListProps {
  redFlags: string[];
  evidence?: string[];
  needsVerification?: boolean;
}

export const RedFlagsList: React.FC<RedFlagsListProps> = ({
  redFlags,
  evidence = [],
  needsVerification = false,
}) => {
  if (redFlags.length === 0 && evidence.length === 0) {
    return (
      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 text-emerald-300 text-sm flex items-start gap-3">
        <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
        <div>
          <p className="font-semibold text-emerald-200">No Critical Red Flags Detected</p>
          <p className="text-xs text-emerald-400/80 mt-0.5">
            Content did not match known high-threat patterns (credential harvesting, artificial urgency, deceptive URLs).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Red Flags List */}
      <div className="space-y-2.5">
        {redFlags.map((flag, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 transition-all hover:bg-rose-950/30"
          >
            <div className="mt-0.5 shrink-0">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-rose-200">{flag}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Observational Evidence extracted */}
      {evidence.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-800">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-cyan-400" />
            Detected Content Evidence
          </h4>
          <ul className="space-y-1.5">
            {evidence.map((item, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-900/60 p-2 rounded border border-slate-800">
                <span className="text-cyan-400 font-mono">›</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Verification notice if uncertain */}
      {needsVerification && (
        <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-lg flex items-start gap-2.5 text-xs text-amber-200">
          <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-300">Verification Recommended: </span>
            This content possesses mixed signals. Manually verify through official contact numbers before acting.
          </div>
        </div>
      )}
    </div>
  );
};

