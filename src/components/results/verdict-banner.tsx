'use client';

import React from 'react';
import { Shield, ShieldAlert, AlertTriangle, ShieldCheck, Download, Printer, Share2, RefreshCw, Sparkles, ExternalLink } from 'lucide-react';
import { RiskAssessment } from '@/lib/risk-engine/types';
import { getVerdictTheme, cn } from '@/lib/utils';

interface VerdictBannerProps {
  assessment: RiskAssessment;
}

export function VerdictBanner({ assessment }: VerdictBannerProps) {
  const theme = getVerdictTheme(assessment.verdict);
  const Icon = assessment.verdict === 'HIGH_RISK' ? ShieldAlert : assessment.verdict === 'CAUTION' ? AlertTriangle : ShieldCheck;

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(assessment, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `loanshield-report-${assessment.lenderName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Investigation report link copied to clipboard!');
    }
  };

  return (
    <div className={cn(
      'relative overflow-hidden rounded-3xl border p-6 sm:p-8 backdrop-blur-2xl transition-all duration-300',
      assessment.verdict === 'HIGH_RISK' && 'bg-gradient-to-br from-rose-950/40 via-slate-900/90 to-slate-950/90 border-rose-500/40 shadow-[0_0_50px_rgba(244,63,94,0.15)]',
      assessment.verdict === 'CAUTION' && 'bg-gradient-to-br from-amber-950/40 via-slate-900/90 to-slate-950/90 border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.15)]',
      assessment.verdict === 'LOW_RISK' && 'bg-gradient-to-br from-emerald-950/40 via-slate-900/90 to-slate-950/90 border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.15)]'
    )}>
      
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ backgroundColor: theme.indicatorColor }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        
        {/* Left: Verdict info & Title */}
        <div className="space-y-4 max-w-2xl">
          
          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-3">
            <span className={cn('inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-black tracking-wide border', theme.badgeClass)}>
              <Icon className="h-4 w-4" />
              <span>{theme.label}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 px-3 py-1 text-xs font-mono text-slate-300">
              <span>Confidence:</span>
              <span className="text-cyan-400 font-bold">{assessment.confidence}%</span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 px-3 py-1 text-xs font-mono text-slate-400">
              <span>Audited:</span>
              <span>{new Date(assessment.timestamp).toLocaleDateString()}</span>
            </span>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              {assessment.lenderName}
            </h1>
            <a
              href={assessment.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 hover:underline mt-1 break-all"
            >
              <span>{assessment.targetUrl}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Verdict Summary */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {assessment.verdictSummary}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 transition-all"
            >
              <Download className="h-3.5 w-3.5 text-cyan-400" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 transition-all"
            >
              <Printer className="h-3.5 w-3.5 text-blue-400" />
              <span>Print Report</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 transition-all"
            >
              <Share2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Share Link</span>
            </button>
          </div>

        </div>

        {/* Right: Big Impact Risk Gauge Card */}
        <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row items-center gap-6 rounded-2xl bg-slate-950/70 border border-slate-800 p-6">
          
          {/* Circular Gauge */}
          <div className="relative flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="currentColor"
                strokeWidth="10"
                className="text-slate-800 fill-transparent"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke={theme.indicatorColor}
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 50}
                strokeDashoffset={2 * Math.PI * 50 * (1 - assessment.riskScore / 100)}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out fill-transparent"
              />
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={cn('text-3xl font-black tracking-tight', theme.textClass)}>
                {assessment.riskScore}
              </span>
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                / 100 Risk
              </span>
            </div>
          </div>

          {/* Scale Legend */}
          <div className="space-y-2 text-xs font-mono">
            <div className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
              LoanShield Risk Scale
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-slate-300">0–29 : Lower Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-slate-300">30–59 : Caution</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              <span className="text-slate-300">60–100 : High Risk</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
