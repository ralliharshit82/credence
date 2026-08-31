'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  ShieldCheck,
  Activity,
  TrendingUp,
  AlertOctagon,
  Sparkles,
  RotateCcw,
  PlusCircle
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import { RiskDistribution } from '@/components/dashboard/risk-distribution';
import { RecentTable } from '@/components/dashboard/recent-table';
import {
  getScanHistory,
  calculateTelemetryStats,
  clearScanHistory,
  ScanHistoryRecord,
  TelemetrySummary
} from '@/lib/scan-history';
import Link from 'next/link';

export default function DashboardPage() {
  const [history, setHistory] = useState<ScanHistoryRecord[]>([]);
  const [telemetry, setTelemetry] = useState<TelemetrySummary>({
    totalScans: 0,
    highRiskCount: 0,
    cautionCount: 0,
    verifiedCount: 0,
    avgScore: 0,
    highRiskPct: 0,
    cautionPct: 0,
    verifiedPct: 0,
    topSignals: [],
  });

  const loadData = () => {
    const items = getScanHistory();
    setHistory(items);
    setTelemetry(calculateTelemetryStats(items));
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener('credence_history_updated', handleUpdate);
    return () => {
      window.removeEventListener('credence_history_updated', handleUpdate);
    };
  }, []);

  const handleReset = () => {
    if (confirm('Are you sure you want to reset scan history and telemetry back to 0?')) {
      clearScanHistory();
      loadData();
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
              THREAT INTELLIGENCE COMMAND
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Global Loan Risk Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Real-time live telemetry dynamically calculated from your scanned lending websites, domains, and apps.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {history.length > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-xl bg-white hover:bg-rose-50 hover:text-rose-700 border border-slate-300 px-3.5 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition-all"
              title="Reset telemetry and clear recent scan history"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
              <span>Reset to 0</span>
            </button>
          )}

          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            <span>Scan New URL</span>
          </Link>
        </div>
      </div>

      {/* 5 Top Dynamic Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Total Scans */}
        <StatCard
          title="Total Scans"
          value={telemetry.totalScans.toLocaleString()}
          subtext="Investigated loan links"
          change={telemetry.totalScans > 0 ? `${telemetry.totalScans} recorded` : undefined}
          changeType="positive"
          icon={Activity}
          theme="blue"
        />

        {/* High Risk Lenders */}
        <StatCard
          title="High Risk Flags"
          value={telemetry.highRiskCount.toLocaleString()}
          subtext={`${telemetry.highRiskPct}% high-risk rate`}
          change={telemetry.highRiskCount > 0 ? `${telemetry.highRiskPct}% of scans` : undefined}
          changeType="negative"
          icon={ShieldAlert}
          theme="rose"
        />

        {/* Caution Cases */}
        <StatCard
          title="Caution Cases"
          value={telemetry.cautionCount.toLocaleString()}
          subtext={`${telemetry.cautionPct}% caution rate`}
          change={telemetry.cautionCount > 0 ? `${telemetry.cautionPct}% of scans` : undefined}
          changeType="neutral"
          icon={AlertTriangle}
          theme="amber"
        />

        {/* Lower Risk Cases */}
        <StatCard
          title="Verified Lenders"
          value={telemetry.verifiedCount.toLocaleString()}
          subtext={`${telemetry.verifiedPct}% verified rate`}
          change={telemetry.verifiedCount > 0 ? `${telemetry.verifiedPct}% of scans` : undefined}
          changeType="positive"
          icon={ShieldCheck}
          theme="emerald"
        />

        {/* Average Risk Score */}
        <StatCard
          title="Avg Risk Score"
          value={telemetry.totalScans > 0 ? telemetry.avgScore : 0}
          subtext="Out of 100 max risk"
          change={telemetry.totalScans > 0 ? `Avg: ${telemetry.avgScore}/100` : undefined}
          changeType="positive"
          icon={TrendingUp}
          theme="blue"
        />

      </div>

      {/* Emerging Scam Trends Ticker */}
      <div className="rounded-3xl bg-gradient-to-r from-rose-50 via-white to-blue-50 border-2 border-rose-200 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-2xl bg-rose-100 border border-rose-300 text-rose-700 shrink-0 shadow-sm">
            <AlertOctagon className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase rounded-full bg-rose-200/90 text-rose-900 px-2.5 py-0.5 border border-rose-300">
                ACTIVE DOMAIN IMPERSONATION
              </span>
              <span className="text-xs font-mono text-slate-500 font-bold">Threat Sentinel</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
              Surge in brand lookalikes targeting banking terms (e.g. sbicf.co.in, hdfc-instant.xyz)
            </p>
          </div>
        </div>

        <Link
          href="/?url=https://sbicf.co.in"
          className="shrink-0 text-xs font-mono font-bold text-rose-800 hover:text-rose-900 flex items-center gap-1 border border-rose-300 rounded-xl px-4 py-2 bg-rose-100/90 shadow-sm transition-all hover:scale-105"
        >
          <span>Test Impersonator Link</span>
          <span>→</span>
        </Link>
      </div>

      {/* Dynamic Risk Distribution & Signal Frequency Visualizer */}
      <RiskDistribution telemetry={telemetry} />

      {/* Dynamic Recent Investigations Interactive Table */}
      <RecentTable history={history} />

    </div>
  );
}
