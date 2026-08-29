'use client';

import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, HelpCircle, ArrowRight, ShieldCheck, ShieldX } from 'lucide-react';
import { ClaimVsRealityItem } from '@/lib/risk-engine/types';
import { cn } from '@/lib/utils';

interface ClaimVsRealityProps {
  items: ClaimVsRealityItem[];
}

export function ClaimVsReality({ items }: ClaimVsRealityProps) {
  if (!items || items.length === 0) return null;

  const getStatusBadge = (status: ClaimVsRealityItem['status']) => {
    switch (status) {
      case 'DECEPTIVE':
      case 'MISMATCH':
        return {
          label: status === 'DECEPTIVE' ? 'DECEPTIVE CLAIM' : 'IDENTITY MISMATCH',
          icon: ShieldX,
          containerClass: 'border-rose-500/30 bg-rose-950/10 hover:border-rose-500/50',
          claimClass: 'text-slate-300',
          realityClass: 'text-rose-300 bg-rose-950/30 border-rose-500/30',
          badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        };
      case 'UNVERIFIABLE':
        return {
          label: 'UNVERIFIABLE CLAIM',
          icon: AlertCircle,
          containerClass: 'border-amber-500/30 bg-amber-950/10 hover:border-amber-500/50',
          claimClass: 'text-slate-300',
          realityClass: 'text-amber-300 bg-amber-950/30 border-amber-500/30',
          badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        };
      case 'VERIFIED':
      default:
        return {
          label: 'VERIFIED CLAIM',
          icon: ShieldCheck,
          containerClass: 'border-emerald-500/30 bg-emerald-950/10 hover:border-emerald-500/50',
          claimClass: 'text-slate-300',
          realityClass: 'text-emerald-300 bg-emerald-950/30 border-emerald-500/30',
          badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        };
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => {
          const badge = getStatusBadge(item.status);
          const BadgeIcon = badge.icon;

          return (
            <div
              key={item.id}
              className={cn(
                'rounded-2xl border p-5 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between space-y-4',
                badge.containerClass
              )}
            >
              
              {/* Category & Status Header */}
              <div className="flex items-center justify-between">
                <span className={cn('inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold border', badge.badgeClass)}>
                  <BadgeIcon className="h-3.5 w-3.5" />
                  <span>{badge.label}</span>
                </span>
                <span className="rounded-md bg-slate-900 border border-slate-800 px-2 py-0.5 text-[10px] font-mono text-cyan-300">
                  {item.category}
                </span>
              </div>

              {/* Side by side Claim vs Reality */}
              <div className="space-y-3">
                {/* Claim Box */}
                <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3.5 space-y-1">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <span>Lender Claim:</span>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    &ldquo;{item.claim}&rdquo;
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="flex justify-center -my-1 text-slate-400">
                  <div className="rounded-full bg-slate-900 border border-slate-800 p-1">
                    <ArrowRight className="h-3 w-3 text-cyan-400 rotate-90" />
                  </div>
                </div>

                {/* Discovered Reality Box */}
                <div className={cn('rounded-xl border p-3.5 space-y-1', badge.realityClass)}>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span>Discovered Reality:</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed">
                    {item.reality}
                  </p>
                </div>
              </div>

              {/* Underlying explanation */}
              <div className="pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 leading-normal">
                <strong className="text-slate-300">Analysis:</strong> {item.explanation}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
