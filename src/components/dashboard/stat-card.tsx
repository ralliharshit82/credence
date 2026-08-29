'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  theme?: 'cyan' | 'rose' | 'amber' | 'emerald' | 'blue';
}

export function StatCard({
  title,
  value,
  subtext,
  change,
  changeType = 'neutral',
  icon: Icon,
  theme = 'cyan'
}: StatCardProps) {
  const getThemeStyles = () => {
    switch (theme) {
      case 'rose':
        return {
          border: 'border-rose-500/30 hover:border-rose-500/50',
          bg: 'bg-rose-950/15',
          iconBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          valueText: 'text-rose-400',
        };
      case 'amber':
        return {
          border: 'border-amber-500/30 hover:border-amber-500/50',
          bg: 'bg-amber-950/15',
          iconBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          valueText: 'text-amber-400',
        };
      case 'emerald':
        return {
          border: 'border-emerald-500/30 hover:border-emerald-500/50',
          bg: 'bg-emerald-950/15',
          iconBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          valueText: 'text-emerald-400',
        };
      case 'blue':
        return {
          border: 'border-blue-500/30 hover:border-blue-500/50',
          bg: 'bg-blue-950/15',
          iconBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
          valueText: 'text-blue-400',
        };
      case 'cyan':
      default:
        return {
          border: 'border-cyan-500/30 hover:border-cyan-500/50',
          bg: 'bg-cyan-950/15',
          iconBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
          valueText: 'text-cyan-400',
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className={cn(
      'rounded-2xl border p-5 transition-all duration-200 backdrop-blur-sm space-y-3',
      styles.bg,
      styles.border
    )}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className={cn('p-2 rounded-xl border shrink-0', styles.iconBg)}>
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div>
        <div className={cn('text-2xl sm:text-3xl font-black tracking-tight font-mono', styles.valueText)}>
          {value}
        </div>
        {subtext && (
          <p className="text-xs text-slate-400 mt-1">
            {subtext}
          </p>
        )}
      </div>

      {change && (
        <div className="pt-2 border-t border-slate-800/60 flex items-center gap-1.5 text-[11px] font-mono">
          <span className={cn(
            'font-bold',
            changeType === 'positive' ? 'text-emerald-400' : changeType === 'negative' ? 'text-rose-400' : 'text-slate-400'
          )}>
            {change}
          </span>
          <span className="text-slate-400">vs last 30 days</span>
        </div>
      )}
    </div>
  );
}
