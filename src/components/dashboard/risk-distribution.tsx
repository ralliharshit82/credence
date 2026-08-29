'use client';

import React from 'react';
import { ShieldAlert, AlertTriangle, ShieldCheck, PieChart, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RiskDistribution() {
  const distribution = [
    { label: 'High Risk / Severe Inconsistencies', count: 1842, percentage: 58, color: 'bg-rose-500', text: 'text-rose-400', icon: ShieldAlert },
    { label: 'Caution / Unverified Intermediaries', count: 825, percentage: 26, color: 'bg-amber-500', text: 'text-amber-400', icon: AlertTriangle },
    { label: 'Verified / Regulated Financial Entities', count: 508, percentage: 16, color: 'bg-emerald-500', text: 'text-emerald-400', icon: ShieldCheck },
  ];

  const topSignals = [
    { name: 'Excessive APK Permissions (Contacts/SMS/Photos)', count: 1420, freq: '77%', tag: 'PERMISSIONS' },
    { name: 'Newly Registered Domain (<30 Days Active)', count: 1290, freq: '70%', tag: 'DIGITAL' },
    { name: 'Fake RBI / MCA Registration Number Claims', count: 1110, freq: '60%', tag: 'REGULATORY' },
    { name: 'Advance Processing Fee / Security Deposit Demand', count: 890, freq: '48%', tag: 'LANGUAGE' },
    { name: 'Offshore Privacy Shield on Domestic Lender Domain', count: 740, freq: '40%', tag: 'IDENTITY' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Risk Distribution Breakdown */}
      <div className="rounded-3xl bg-[#060a17] border border-slate-800 p-6 sm:p-8 space-y-6 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <PieChart className="h-5 w-5 text-cyan-400" />
              <span>Risk Verdict Distribution</span>
            </h3>
            <p className="text-xs text-slate-400">
              Aggregated statistics across 3,175 inspected digital lending endpoints.
            </p>
          </div>
          <span className="font-mono text-xs text-cyan-400 bg-cyan-950/60 border border-cyan-500/40 px-2.5 py-1 rounded-full">
            Global Telemetry
          </span>
        </div>

        {/* Multi-segment Bar */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded-full bg-slate-900 overflow-hidden flex border border-slate-800 p-0.5">
            <div style={{ width: '58%' }} className="h-full bg-rose-500 rounded-l-full" />
            <div style={{ width: '26%' }} className="h-full bg-amber-500" />
            <div style={{ width: '16%' }} className="h-full bg-emerald-500 rounded-r-full" />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-400 px-1">
            <span>High Risk (58%)</span>
            <span>Caution (26%)</span>
            <span>Verified (16%)</span>
          </div>
        </div>

        {/* Breakdown Items */}
        <div className="space-y-3 pt-2">
          {distribution.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
                <div className="flex items-center gap-3">
                  <div className={cn('p-2 rounded-xl bg-slate-800 border border-slate-700', item.text)}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">{item.label}</span>
                    <span className="text-[10px] font-mono text-slate-400">{item.count.toLocaleString()} cases audited</span>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <span className={cn('text-base font-black', item.text)}>{item.percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Top Fraud Signals Distribution */}
      <div className="rounded-3xl bg-[#060a17] border border-slate-800 p-6 sm:p-8 space-y-6 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyan-400" />
              <span>Most Prevalent Risk Signals</span>
            </h3>
            <p className="text-xs text-slate-400">
              Frequency of identified risk vectors across high-risk lending platforms.
            </p>
          </div>
          <span className="font-mono text-xs text-rose-400 bg-rose-950/60 border border-rose-500/40 px-2.5 py-1 rounded-full">
            Threat Vectors
          </span>
        </div>

        <div className="space-y-3">
          {topSignals.map((sig, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-medium text-slate-200">
                  <span className="h-5 w-5 rounded-lg bg-slate-800 text-cyan-400 flex items-center justify-center font-mono text-[10px] font-bold">
                    0{idx + 1}
                  </span>
                  <span>{sig.name}</span>
                </div>
                <span className="rounded-md bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-cyan-300 border border-slate-700">
                  {sig.tag}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                <span>Observed in {sig.count} investigations</span>
                <span className="text-rose-400 font-bold">{sig.freq} of scam apps</span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
