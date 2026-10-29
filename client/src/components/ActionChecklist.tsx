import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

interface ActionChecklistProps {
  actions: string[];
}

export const ActionChecklist: React.FC<ActionChecklistProps> = ({ actions }) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  if (!actions || actions.length === 0) {
    return (
      <div className="text-xs text-slate-400 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
        Standard security measures apply. Always practice general digital hygiene.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {actions.map((action, idx) => {
        const isChecked = Boolean(checkedItems[idx]);
        return (
          <button
            key={idx}
            type="button"
            onClick={() => toggleCheck(idx)}
            className={`w-full text-left flex items-start gap-3 p-3 rounded-lg border transition-all text-xs sm:text-sm ${
              isChecked
                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-900/60 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-900'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isChecked ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <div className="w-4 h-4 rounded border border-slate-600 flex items-center justify-center hover:border-cyan-400" />
              )}
            </div>
            <span className={isChecked ? 'line-through text-slate-400' : 'font-medium'}>
              {action}
            </span>
          </button>
        );
      })}
    </div>
  );
};

