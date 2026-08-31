'use client';

import React from 'react';
import { ShieldAlert, AlertTriangle, ShieldCheck, PieChart, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RiskDistribution() {
  const distribution = [
    { label: 'High Risk / Severe Inconsistencies', count: 1842, percentage: 58, color: 'bg-rose-500', text: 'text-rose-700', icon: ShieldAlert },
    { label: 'Caution / Unverified Intermediaries', count: 825, percentage: 26, color: 'bg-amber-500', text: 'text-amber-700', icon: AlertTriangle },
    { label: 'Verified / Regulated Financial Entities', count: 508, percentage: 16, color: 'bg-emerald-500', text: 'text-emerald-700', icon: ShieldCheck },
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
      <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <PieChart className="h-5 w-5 text-blue-600" />
              <span>Risk Verdict Distribution</span>
            </h3>
            <p className="text-xs text-slate-500">
              Aggregated statistics across 3,175 inspected digital lending endpoints.
            </p>
          </div>
          <span className="font-mono text-xs text-blue-700 bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-full font-bold">
            Global Telemetry
          </span>
        </div>

        {/* Multi-segment Bar */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden flex border border-slate-200 p-0.5">
            <div style={{ width: '58%' }} className="h-full bg-rose-500 rounded-l-full" />
            <div style={{ width: '26%' }} className="h-full bg-amber-500" />
            <div style={{ width: '16%' }} className="h-full bg-emerald-500 rounded-r-full" />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-500 px-1 font-semibold">
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
              <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center gap-3">
                  <div className={cn('p-2 rounded-xl bg-white border border-slate-200', item.text)}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">{item.label}</span>
                    <span className="text-[10px] font-mono text-slate-500">{item.count.toLocaleString()} cases audited</span>
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
      <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>Most Prevalent Risk Signals</span>
            </h3>
            <p className="text-xs text-slate-500">
              Frequency of identified risk vectors across high-risk lending platforms.
            </p>
          </div>
          <span className="font-mono text-xs text-rose-700 bg-rose-100 border border-rose-200 px-2.5 py-1 rounded-full font-bold">
            Threat Vectors
          </span>
        </div>

        <div className="space-y-3">
          {topSignals.map((sig, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <span className="h-5 w-5 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-mono text-[10px] font-bold">
                    0{idx + 1}
                  </span>
                  <span>{sig.name}</span>
                </div>
                <span className="rounded-md bg-white px-2 py-0.5 font-mono text-[10px] font-bold text-blue-700 border border-slate-200 shadow-sm">
                  {sig.tag}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1">
                <span>Observed in {sig.count} investigations</span>
                <span className="text-rose-700 font-bold">{sig.freq} of scam apps</span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
