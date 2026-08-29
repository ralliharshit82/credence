'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, ShieldCheck, AlertTriangle, ShieldAlert, Sparkles, Globe, Link2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UrlInputProps {
  initialUrl?: string;
  size?: 'large' | 'compact';
  autoFocus?: boolean;
  onScanStart?: (url: string) => void;
}

export function UrlInput({ initialUrl = '', size = 'large', autoFocus = false, onScanStart }: UrlInputProps) {
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleScan = (targetUrl?: string) => {
    const inputToScan = (targetUrl || url).trim();
    if (!inputToScan) return;

    setIsLoading(true);
    if (onScanStart) {
      onScanStart(inputToScan);
    } else {
      router.push(`/scan?url=${encodeURIComponent(inputToScan)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleScan();
    }
  };

  const presetDemos = [
    {
      id: 'high-risk',
      url: 'https://speedyrupee-quickloan.xyz',
      label: 'High Risk Demo',
      badge: 'High Risk (Impersonator)',
      color: 'border-rose-500/40 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20',
      icon: ShieldAlert,
    },
    {
      id: 'caution',
      url: 'https://flexicreditloans.in',
      label: 'Caution Demo',
      badge: 'Caution (Unverified Broker)',
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20',
      icon: AlertTriangle,
    },
    {
      id: 'low-risk',
      url: 'https://tatadigitalfinance.com',
      label: 'Low Risk Demo',
      badge: 'Verified (Regulated NBFC)',
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Scanner Input Container */}
      <div className={cn(
        'relative rounded-2xl bg-slate-900/90 border border-cyan-500/30 p-2 shadow-[0_0_50px_rgba(6,182,212,0.15)] backdrop-blur-xl transition-all duration-300 focus-within:border-cyan-400 focus-within:shadow-[0_0_60px_rgba(6,182,212,0.3)]',
        size === 'large' ? 'p-2 sm:p-2.5' : 'p-1.5'
      )}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          
          <div className="relative flex-1 flex items-center pl-3">
            <Globe className="h-5 w-5 text-cyan-400 shrink-0 mr-3" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste a loan website, app link, or domain (e.g., https://speedyrupee-quickloan.xyz)"
              autoFocus={autoFocus}
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none pr-3 font-mono"
            />
            {url && (
              <button
                type="button"
                onClick={() => setUrl('')}
                className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleScan()}
            disabled={!url.trim() || isLoading}
            className={cn(
              'flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:from-cyan-400 hover:to-indigo-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shrink-0',
              size === 'compact' && 'py-2.5 px-4 text-xs'
            )}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span>Initializing...</span>
              </div>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-cyan-200 animate-pulse" />
                <span>Scan with LoanShield</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

        </div>
      </div>

      {/* Quick Demo Scenario Badges */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1 text-xs">
        <span className="text-slate-400 font-medium flex items-center gap-1.5">
          <Link2 className="h-3.5 w-3.5 text-cyan-400" />
          <span>Quick Demo Scenarios:</span>
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {presetDemos.map((demo) => {
            const Icon = demo.icon;
            return (
              <button
                key={demo.id}
                type="button"
                onClick={() => {
                  setUrl(demo.url);
                  handleScan(demo.url);
                }}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-medium transition-all text-[11px]',
                  demo.color
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{demo.badge}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
