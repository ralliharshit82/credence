'use client';

import React from 'react';
import { MessageSquareWarning, Sparkles, AlertCircle, Info, Flame, CheckCircle2 } from 'lucide-react';
import { LanguagePatternItem } from '@/lib/risk-engine/types';
import { cn } from '@/lib/utils';

interface LanguageAnalysisProps {
  patterns: LanguagePatternItem[];
}

export function LanguageAnalysis({ patterns }: LanguageAnalysisProps) {
  return (
    <div className="space-y-4">
      {/* Important Disclaimer Header */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <MessageSquareWarning className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              Semantic NLP Claim & Marketing Analysis
            </h4>
            <p className="text-xs text-slate-400">
              Evaluates psychological urgency, advance fee promises, and guaranteed credit claims.
            </p>
          </div>
        </div>

        <div className="rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-[11px] font-mono text-slate-300">
          ⚠️ Tagged as suspicious indicators, NOT proof of fraud.
        </div>
      </div>

      {/* Detected Patterns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {patterns.map((item, idx) => {
          const isHigh = item.riskLevel === 'HIGH';
          const isMedium = item.riskLevel === 'MEDIUM';

          return (
            <div
              key={idx}
              className={cn(
                'rounded-2xl border p-5 transition-all backdrop-blur-sm space-y-3 flex flex-col justify-between',
                isHigh ? 'bg-rose-950/15 border-rose-500/30 hover:border-rose-500/50' :
                isMedium ? 'bg-amber-950/15 border-amber-500/30 hover:border-amber-500/50' :
                'bg-emerald-950/15 border-emerald-500/30'
              )}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={cn(
                    'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-mono font-bold uppercase border',
                    isHigh ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                    isMedium ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                    'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  )}>
                    {item.pattern}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Location: {item.location}
                  </span>
                </div>

                {/* Found text quote */}
                <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3">
                  <p className="text-xs sm:text-sm font-semibold text-white italic">
                    &ldquo;{item.foundText}&rdquo;
                  </p>
                </div>
              </div>

              {/* Forensic Explanation */}
              <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800/60">
                <strong className="text-slate-400 font-mono">Why Flagged:</strong> {item.explanation}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
