'use client';

import React from 'react';
import { ShieldAlert, AlertTriangle, ShieldCheck, PieChart, Activity, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TelemetrySummary } from '@/lib/scan-history';
import Link from 'next/link';

interface RiskDistributionProps {
  telemetry: TelemetrySummary;
}

export function RiskDistribution({ telemetry }: RiskDistributionProps) {
  const {
    totalScans,
    highRiskCount,
    cautionCount,
    verifiedCount,
    highRiskPct,
    cautionPct,
    verifiedPct,
    topSignals
  } = telemetry;

  const distribution = [
    { label: 'High Risk / Severe Inconsistencies', count: highRiskCount, percentage: highRiskPct, color: 'bg-rose-500', text: 'text-rose-700', icon: ShieldAlert },
    { label: 'Caution / Unverified Intermediaries', count: cautionCount, percentage: cautionPct, color: 'bg-amber-500', text: 'text-amber-700', icon: AlertTriangle },
    { label: 'Verified / Regulated Financial Entities', count: verifiedCount, percentage: verifiedPct, color: 'bg-emerald-500', text: 'text-emerald-700', icon: ShieldCheck },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Risk Distribution Breakdown */}
      <div className="rounded-3xl bg-white border border-blue-200/90 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-blue-100 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <PieChart className="h-5 w-5 text-blue-600" />
              <span>Risk Verdict Distribution</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {totalScans === 0 ? 'No scan data recorded yet.' : `Aggregated statistics across ${totalScans} investigated lending link${totalScans === 1 ? '' : 's'}.`}
            </p>
          </div>
          <span className="font-mono text-xs text-blue-700 bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-full font-bold">
            Live Telemetry
          </span>
        </div>

        {/* Multi-segment Bar */}
        {totalScans === 0 ? (
          <div className="p-6 text-center space-y-2 bg-[#f0f6ff] rounded-2xl border border-blue-100">
            <p className="text-xs text-slate-600 font-medium">
              Start scanning lender links on the Home Scanner to build real-time risk distribution telemetry.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 underline"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Go to Home Scanner</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden flex border border-slate-200 p-0.5">
                {highRiskPct > 0 && (
                  <div style={{ width: `${highRiskPct}%` }} className="h-full bg-rose-500 rounded-l-full transition-all duration-500" />
                )}
                {cautionPct > 0 && (
                  <div style={{ width: `${cautionPct}%` }} className="h-full bg-amber-500 transition-all duration-500" />
                )}
                {verifiedPct > 0 && (
                  <div style={{ width: `${verifiedPct}%` }} className="h-full bg-emerald-500 rounded-r-full transition-all duration-500" />
                )}
              </div>
              <div className="flex justify-between text-[11px] font-mono text-slate-500 px-1 font-bold">
                <span>High Risk ({highRiskPct}%)</span>
                <span>Caution ({cautionPct}%)</span>
                <span>Verified ({verifiedPct}%)</span>
              </div>
            </div>

            {/* Breakdown Items */}
            <div className="space-y-3 pt-2">
              {distribution.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f0f6ff] border border-blue-200 text-xs">
                    <div className="flex items-center gap-3">
                      <div className={cn('p-2 rounded-xl bg-white border border-blue-200 shadow-sm', item.text)}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{item.label}</span>
                        <span className="text-[10px] font-mono text-slate-500">{item.count.toLocaleString()} case{item.count === 1 ? '' : 's'} recorded</span>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <span className={cn('text-base font-black', item.text)}>{item.percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

      </div>

      {/* Top Fraud Signals Distribution */}
      <div className="rounded-3xl bg-white border border-blue-200/90 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-blue-100 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>Most Prevalent Risk Signals</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {topSignals.length === 0 ? 'No signals recorded yet.' : 'Frequency of identified risk vectors observed across scanned targets.'}
            </p>
          </div>
          <span className="font-mono text-xs text-rose-700 bg-rose-100 border border-rose-200 px-2.5 py-1 rounded-full font-bold">
            Observed Vectors
          </span>
        </div>

        {topSignals.length === 0 ? (
          <div className="p-6 text-center space-y-2 bg-[#f0f6ff] rounded-2xl border border-blue-100">
            <p className="text-xs text-slate-600 font-medium">
              When you scan loan websites with suspicious indicators, detected forensic vectors will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {topSignals.map((sig, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#f0f6ff] border border-blue-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <span className="h-5 w-5 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-mono text-[10px] font-bold">
                      0{idx + 1}
                    </span>
                    <span className="truncate max-w-[240px] sm:max-w-xs">{sig.name}</span>
                  </div>
                  <span className="rounded-md bg-white px-2 py-0.5 font-mono text-[10px] font-bold text-blue-700 border border-blue-200 shadow-sm shrink-0">
                    {sig.tag}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 pt-1 font-medium">
                  <span>Observed in {sig.count} scan{sig.count === 1 ? '' : 's'}</span>
                  <span className="text-rose-700 font-bold">{sig.freq} of total scans</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
