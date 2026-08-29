'use client';

import React from 'react';
import { ShieldAlert, AlertTriangle, ShieldCheck, CheckSquare, ArrowRight, LifeBuoy, FileQuestion } from 'lucide-react';
import { RiskVerdict } from '@/lib/risk-engine/types';
import { cn } from '@/lib/utils';

interface RecommendationBoxProps {
  verdict: RiskVerdict;
  recommendation: string;
  checklist: string[];
}

export function RecommendationBox({ verdict, recommendation, checklist }: RecommendationBoxProps) {
  const isHighRisk = verdict === 'HIGH_RISK';
  const isCaution = verdict === 'CAUTION';

  const Icon = isHighRisk ? ShieldAlert : isCaution ? AlertTriangle : ShieldCheck;

  return (
    <div className={cn(
      'rounded-3xl border p-6 sm:p-8 backdrop-blur-xl transition-all space-y-6',
      isHighRisk && 'bg-gradient-to-br from-rose-950/30 via-slate-900/90 to-[#060a17] border-rose-500/40 shadow-[0_0_40px_rgba(244,63,94,0.15)]',
      isCaution && 'bg-gradient-to-br from-amber-950/30 via-slate-900/90 to-[#060a17] border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.15)]',
      !isHighRisk && !isCaution && 'bg-gradient-to-br from-emerald-950/30 via-slate-900/90 to-[#060a17] border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.15)]'
    )}>
      
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className={cn(
          'p-3 rounded-2xl border shrink-0',
          isHighRisk ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
          isCaution ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
          'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
        )}>
          <Icon className="h-6 w-6" />
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              CONSUMER SAFETY GUIDANCE
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Actionable Recommendation
          </h3>
          <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed pt-1">
            {recommendation}
          </p>
        </div>
      </div>

      {/* Safety Action Checklist */}
      <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-5 space-y-3">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <CheckSquare className="h-4 w-4 text-cyan-400" />
          <span>Recommended Protective Actions:</span>
        </h4>

        <div className="space-y-2.5">
          {checklist.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
              <span className="h-5 w-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center justify-center shrink-0 text-[11px] font-mono font-bold mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
