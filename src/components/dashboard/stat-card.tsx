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
  theme = 'blue'
}: StatCardProps) {
  const getThemeStyles = () => {
    switch (theme) {
      case 'rose':
        return {
          border: 'border-rose-200 hover:border-rose-300',
          bg: 'bg-rose-50/70',
          iconBg: 'bg-rose-100 text-rose-700 border-rose-200',
          valueText: 'text-rose-700',
        };
      case 'amber':
        return {
          border: 'border-amber-200 hover:border-amber-300',
          bg: 'bg-amber-50/70',
          iconBg: 'bg-amber-100 text-amber-700 border-amber-200',
          valueText: 'text-amber-700',
        };
      case 'emerald':
        return {
          border: 'border-emerald-200 hover:border-emerald-300',
          bg: 'bg-emerald-50/70',
          iconBg: 'bg-emerald-100 text-emerald-700 border-emerald-200',
          valueText: 'text-emerald-700',
        };
      case 'blue':
      default:
        return {
          border: 'border-blue-200 hover:border-blue-300',
          bg: 'bg-blue-50/70',
          iconBg: 'bg-blue-100 text-blue-700 border-blue-200',
          valueText: 'text-blue-700',
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className={cn(
      'rounded-2xl border p-5 transition-all duration-200 space-y-3 bg-white shadow-sm',
      styles.border
    )}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
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
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {subtext}
          </p>
        )}
      </div>

      {change && (
        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono">
          <span className={cn(
            'font-bold',
            changeType === 'positive' ? 'text-emerald-700' : changeType === 'negative' ? 'text-rose-700' : 'text-slate-500'
          )}>
            {change}
          </span>
          <span className="text-slate-400">vs last 30 days</span>
        </div>
      )}
    </div>
  );
}
