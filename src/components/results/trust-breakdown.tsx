'use client';

import React from 'react';
import { CategoryBreakdown, RiskCategory } from '@/lib/risk-engine/types';
import { cn } from '@/lib/utils';
import { ShieldCheck, FileText, Network, Globe, Smartphone, MessageSquareWarning, Award } from 'lucide-react';

interface TrustBreakdownProps {
  breakdowns: Record<RiskCategory, CategoryBreakdown>;
}

export function TrustBreakdown({ breakdowns }: TrustBreakdownProps) {
  const getCategoryMeta = (cat: RiskCategory) => {
    switch (cat) {
      case 'REGULATORY':
        return { label: 'Regulatory Standing', weightLabel: '25% Weight', icon: FileText, desc: 'RBI register cross-reference & NBFC compliance' };
      case 'IDENTITY':
        return { label: 'Identity Graph Coherence', weightLabel: '25% Weight', icon: Network, desc: 'Direct relationship between domain, app & lender entity' };
      case 'DIGITAL':
        return { label: 'Digital Forensics', weightLabel: '15% Weight', icon: Globe, desc: 'Domain age, SSL type, WHOIS registrar & governance links' };
      case 'PERMISSIONS':
        return { label: 'Permission Footprint', weightLabel: '15% Weight', icon: Smartphone, desc: 'APK manifest access (Contacts, SMS, Photos)' };
      case 'LANGUAGE':
        return { label: 'Language & Claims', weightLabel: '10% Weight', icon: MessageSquareWarning, desc: 'Guaranteed loan promises & advance fee triggers' };
      case 'REPUTATION':
      default:
        return { label: 'Reputation Intelligence', weightLabel: '10% Weight', icon: Award, desc: 'Consumer complaint databases & anti-fraud feeds' };
    }
  };

  const categories: RiskCategory[] = ['REGULATORY', 'IDENTITY', 'DIGITAL', 'PERMISSIONS', 'LANGUAGE', 'REPUTATION'];

  return (
    <div className="rounded-3xl bg-[#060a17] border border-slate-800 p-6 sm:p-8 space-y-6 backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            Trust Signal Weighted Breakdown
          </h3>
          <p className="text-xs text-slate-400">
            Composite risk calculation based on mathematical signal weights (Total = 100%).
          </p>
        </div>
        <span className="font-mono text-xs text-cyan-400 font-semibold">
          Deterministic Risk Engine v2.4
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((catKey) => {
          const item = breakdowns[catKey];
          const meta = getCategoryMeta(catKey);
          const Icon = meta.icon;

          if (!item) return null;

          const isDanger = item.rawScore >= 60;
          const isCaution = item.rawScore >= 30 && item.rawScore < 60;

          return (
            <div
              key={catKey}
              className={cn(
                'rounded-2xl border p-4 sm:p-5 transition-all space-y-3',
                isDanger ? 'bg-rose-950/15 border-rose-500/30' :
                isCaution ? 'bg-amber-950/15 border-amber-500/30' :
                'bg-emerald-950/15 border-emerald-500/30'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={cn(
                    'p-2 rounded-xl border',
                    isDanger ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                    isCaution ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                    'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      {meta.label}
                    </h4>
                    <span className="text-[10px] font-mono text-cyan-300">
                      {meta.weightLabel}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={cn(
                    'text-base font-black font-mono',
                    isDanger ? 'text-rose-400' : isCaution ? 'text-amber-400' : 'text-emerald-400'
                  )}>
                    {item.rawScore}/100
                  </span>
                  <div className="text-[9px] font-mono text-slate-400">
                    Weighted: +{item.weightedScore} pts
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                <div
                  className={cn(
                    'h-full transition-all duration-500',
                    isDanger ? 'bg-rose-500' : isCaution ? 'bg-amber-500' : 'bg-emerald-500'
                  )}
                  style={{ width: `${item.rawScore}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400 leading-tight">
                {meta.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
