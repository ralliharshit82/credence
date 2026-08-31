'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ShieldCheck, AlertTriangle, ShieldAlert, Sparkles, Globe, Link2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { validateScanUrl } from '@/lib/url-validator';

interface UrlInputProps {
  initialUrl?: string;
  size?: 'large' | 'compact';
  autoFocus?: boolean;
  onScanStart?: (url: string) => void;
}

export function UrlInput({ initialUrl = '', size = 'large', autoFocus = false, onScanStart }: UrlInputProps) {
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [helperMessage, setHelperMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (errorMessage) {
      setErrorMessage(null);
      setHelperMessage(null);
    }
  };

  const handleScan = (targetUrl?: string) => {
    const rawInput = targetUrl || url;
    
    // Client-side URL validation
    const validation = validateScanUrl(rawInput);
    if (!validation.isValid) {
      setErrorMessage(validation.errorMessage || 'Invalid URL — Please enter a valid website URL.');
      setHelperMessage(validation.helperMessage || 'Example: https://example.com');
      setIsLoading(false);
      return;
    }

    const cleanUrl = validation.cleanUrl;
    setErrorMessage(null);
    setHelperMessage(null);
    setIsLoading(true);

    if (onScanStart) {
      onScanStart(cleanUrl);
    } else {
      router.push(`/scan?url=${encodeURIComponent(cleanUrl)}`);
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
      url: 'https://sbicf.co.in',
      label: 'High Risk Demo',
      badge: 'High Risk (Impersonator)',
      color: 'border-rose-500/40 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20',
      icon: ShieldAlert,
    },
    {
      id: 'caution',
      url: 'https://example.com/',
      label: 'Caution Demo',
      badge: 'Medium Risk (Unverified)',
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20',
      icon: AlertTriangle,
    },
    {
      id: 'low-risk',
      url: 'https://www.jansamarth.in',
      label: 'Low Risk Demo',
      badge: 'Low Risk (Verified)',
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Scanner Input Container */}
      <div className={cn(
        'relative rounded-2xl bg-slate-900/90 border border-slate-700 p-2 shadow-lg backdrop-blur-xl transition-all duration-300 focus-within:border-blue-500',
        size === 'large' ? 'p-2 sm:p-2.5' : 'p-1.5'
      )}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          
          <div className="relative flex-1 flex items-center pl-3">
            <Globe className="h-5 w-5 text-slate-400 shrink-0 mr-3" />
            <input
              type="text"
              value={url}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Paste a loan website, app link, or domain (e.g., https://...)"
              autoFocus={autoFocus}
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none pr-3 font-mono"
            />
            {url && (
              <button
                type="button"
                onClick={() => {
                  setUrl('');
                  setErrorMessage(null);
                  setHelperMessage(null);
                }}
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
              'flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none shrink-0',
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
                <Sparkles className="h-4 w-4 text-blue-200" />
                <span>Scan with Credence</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

        </div>
      </div>

      {/* User-Friendly Error / Validation Message */}
      {errorMessage && (
        <div className="rounded-lg bg-rose-950/40 border border-rose-800/60 p-3 text-center space-y-1 animate-in fade-in duration-150">
          <div className="flex items-center justify-center gap-2 text-rose-300 font-semibold text-xs sm:text-sm">
            <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          {helperMessage && (
            <p className="text-xs text-slate-400 font-mono">
              {helperMessage}
            </p>
          )}
        </div>
      )}

      {/* Quick Demo Scenario Badges */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1 text-xs">
        <span className="text-slate-400 font-medium flex items-center gap-1.5">
          <Link2 className="h-3.5 w-3.5 text-slate-400" />
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
