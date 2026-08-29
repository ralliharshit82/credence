'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Info,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileSearch,
  Layers,
  Sparkles,
  Flame
} from 'lucide-react';
import { RiskCategory, RiskSignal, SeverityLevel } from '@/lib/risk-engine/types';
import { cn } from '@/lib/utils';

interface EvidenceCardProps {
  signals: RiskSignal[];
}

export function EvidenceCard({ signals }: EvidenceCardProps) {
  const [selectedCategory, setSelectedCategory] = useState<RiskCategory | 'ALL'>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(signals[0]?.id || null);

  const categories: { key: RiskCategory | 'ALL'; label: string }[] = [
    { key: 'ALL', label: 'All Signals' },
    { key: 'REGULATORY', label: 'Regulatory' },
    { key: 'IDENTITY', label: 'Identity' },
    { key: 'DIGITAL', label: 'Digital' },
    { key: 'PERMISSIONS', label: 'Permissions' },
    { key: 'LANGUAGE', label: 'Language' },
    { key: 'REPUTATION', label: 'Reputation' },
  ];

  const filteredSignals = selectedCategory === 'ALL'
    ? signals
    : signals.filter(s => s.category === selectedCategory);

  const getSeverityBadge = (severity: SeverityLevel) => {
    switch (severity) {
      case 'CRITICAL':
        return {
          label: 'CRITICAL SEVERITY',
          className: 'bg-rose-500/20 text-rose-300 border-rose-500/50',
          icon: ShieldAlert,
          dotColor: 'bg-rose-500'
        };
      case 'HIGH':
        return {
          label: 'HIGH RISK',
          className: 'bg-red-500/15 text-red-300 border-red-500/40',
          icon: Flame,
          dotColor: 'bg-red-500'
        };
      case 'MEDIUM':
        return {
          label: 'MODERATE RISK',
          className: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
          icon: AlertTriangle,
          dotColor: 'bg-amber-500'
        };
      case 'LOW':
        return {
          label: 'LOW RISK',
          className: 'bg-slate-700/40 text-slate-300 border-slate-600',
          icon: Info,
          dotColor: 'bg-slate-400'
        };
      case 'POSITIVE':
      default:
        return {
          label: 'VERIFIED POSITIVE',
          className: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          icon: CheckCircle2,
          dotColor: 'bg-emerald-500'
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Category filter tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.key;
          const count = cat.key === 'ALL' ? signals.length : signals.filter(s => s.category === cat.key).length;
          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={cn(
                'flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all border',
                isActive
                  ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              )}
            >
              <span>{cat.label}</span>
              <span className={cn(
                'rounded-full px-1.5 py-0.2 text-[10px] font-mono',
                isActive ? 'bg-cyan-500/30 text-cyan-200' : 'bg-slate-800 text-slate-400'
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Signals list */}
      <div className="space-y-3">
        {filteredSignals.map((signal) => {
          const badge = getSeverityBadge(signal.severity);
          const BadgeIcon = badge.icon;
          const isExpanded = expandedId === signal.id;

          return (
            <div
              key={signal.id}
              className={cn(
                'rounded-2xl border transition-all duration-200 backdrop-blur-sm overflow-hidden',
                signal.severity === 'CRITICAL' && 'bg-rose-950/15 border-rose-500/30 hover:border-rose-500/50',
                signal.severity === 'HIGH' && 'bg-red-950/15 border-red-500/30 hover:border-red-500/50',
                signal.severity === 'MEDIUM' && 'bg-amber-950/15 border-amber-500/30 hover:border-amber-500/50',
                signal.severity === 'LOW' && 'bg-slate-900/40 border-slate-800 hover:border-slate-700',
                signal.severity === 'POSITIVE' && 'bg-emerald-950/15 border-emerald-500/30 hover:border-emerald-500/50'
              )}
            >
              
              {/* Header clickable */}
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : signal.id)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-4"
              >
                <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                  <div className={cn('p-2 rounded-xl border shrink-0', badge.className)}>
                    <BadgeIcon className="h-4 w-4" />
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={cn('inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border', badge.className)}>
                        {badge.label}
                      </span>
                      <span className="rounded-md bg-slate-800/80 px-2 py-0.5 text-[10px] font-mono text-cyan-300 border border-slate-700/60">
                        {signal.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                        Confidence: <strong className="text-white">{signal.confidence}%</strong>
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                      {signal.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="text-[10px] font-mono text-slate-400">Score Impact</div>
                    <div className={cn(
                      'text-xs font-mono font-bold',
                      signal.scoreImpact > 70 ? 'text-rose-400' : signal.scoreImpact > 30 ? 'text-amber-400' : 'text-emerald-400'
                    )}>
                      +{signal.scoreImpact} pts
                    </div>
                  </div>

                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Collapsible Details Body */}
              {isExpanded && (
                <div className="border-t border-slate-800/80 bg-slate-950/40 p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
                  
                  {/* Detailed Description */}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Signal Analysis
                    </h5>
                    <p className="text-slate-300 leading-relaxed">
                      {signal.description}
                    </p>
                  </div>

                  {/* Concrete Evidence Box */}
                  <div className="rounded-xl bg-[#050811] border border-cyan-500/20 p-3.5 space-y-1.5">
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold">
                      <FileSearch className="h-3.5 w-3.5" />
                      <span>DISCOVERED FORENSIC EVIDENCE:</span>
                    </div>
                    <p className="font-mono text-xs text-slate-200 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed break-all">
                      {signal.evidence}
                    </p>
                  </div>

                  {/* Metadata metrics footer */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] font-mono text-slate-400 border-t border-slate-800/60">
                    <div className="flex items-center gap-2">
                      <span>Source Provider:</span>
                      <span className="text-slate-200 font-semibold">{signal.source}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>Signal Confidence: <strong className="text-cyan-300">{signal.confidence}%</strong></span>
                      <span>Impact Weight: <strong className="text-amber-300">{signal.scoreImpact}/100</strong></span>
                    </div>
                  </div>

                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
