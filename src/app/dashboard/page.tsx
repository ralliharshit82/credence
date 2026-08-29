'use client';

import React from 'react';
import {
  LayoutDashboard,
  ShieldAlert,
  AlertTriangle,
  ShieldCheck,
  Activity,
  Scan,
  TrendingUp,
  AlertOctagon,
  Download,
  Filter,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import { RiskDistribution } from '@/components/dashboard/risk-distribution';
import { RecentTable } from '@/components/dashboard/recent-table';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              THREAT INTELLIGENCE COMMAND
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
            Global Loan Risk Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time aggregate forensics on digital lenders, APK permission vectors, and domain impersonators.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/scan"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all hover:scale-105"
          >
            <Scan className="h-4 w-4" />
            <span>Scan New URL</span>
          </Link>
        </div>
      </div>

      {/* 5 Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Total Scans */}
        <StatCard
          title="Total Scans"
          value="3,175"
          subtext="Investigated loan links"
          change="+18.4%"
          changeType="positive"
          icon={Activity}
          theme="cyan"
        />

        {/* High Risk Lenders */}
        <StatCard
          title="High Risk Flags"
          value="1,842"
          subtext="58% high-risk rate"
          change="+24.2%"
          changeType="negative"
          icon={ShieldAlert}
          theme="rose"
        />

        {/* Caution Cases */}
        <StatCard
          title="Caution Cases"
          value="825"
          subtext="Unverified brokers / DSAs"
          change="+5.1%"
          changeType="neutral"
          icon={AlertTriangle}
          theme="amber"
        />

        {/* Lower Risk Cases */}
        <StatCard
          title="Verified Lenders"
          value="508"
          subtext="Active RBI NBFCs"
          change="+8.3%"
          changeType="positive"
          icon={ShieldCheck}
          theme="emerald"
        />

        {/* Average Risk Score */}
        <StatCard
          title="Avg Risk Score"
          value="64.2"
          subtext="Out of 100 max risk"
          change="-2.1 pts"
          changeType="positive"
          icon={TrendingUp}
          theme="blue"
        />

      </div>

      {/* Emerging Scam Trends Ticker */}
      <div className="rounded-2xl bg-gradient-to-r from-rose-950/30 via-slate-900/80 to-slate-900/80 border border-rose-500/30 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 shrink-0">
            <AlertOctagon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase rounded-md bg-rose-500/20 text-rose-300 px-2 py-0.5 border border-rose-500/40">
                ACTIVE CAMPAIGN DETECTED
              </span>
              <span className="text-xs font-mono text-slate-400">Threat Cluster #409</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-white mt-1">
              Surge in Disposable .XYZ Domains Impersonating Legitimate NBFC Registration Numbers
            </p>
          </div>
        </div>

        <Link
          href="/results/high-risk"
          className="shrink-0 text-xs font-mono font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 border border-rose-500/30 rounded-lg px-3 py-1.5 bg-rose-950/40"
        >
          <span>Inspect Case Study</span>
          <span>→</span>
        </Link>
      </div>

      {/* Risk Distribution & Signal Frequency Visualizer */}
      <RiskDistribution />

      {/* Recent Investigations Interactive Table */}
      <RecentTable />

    </div>
  );
}
