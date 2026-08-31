'use client';

import React from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  ShieldCheck,
  Activity,
  TrendingUp,
  AlertOctagon,
  Sparkles
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import { RiskDistribution } from '@/components/dashboard/risk-distribution';
import { RecentTable } from '@/components/dashboard/recent-table';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
              THREAT INTELLIGENCE COMMAND
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Global Loan Risk Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time aggregate forensics on digital lenders, APK permission vectors, and domain impersonators.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            <span>Go to Home Scanner</span>
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
          theme="blue"
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
      <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-rose-100 border border-rose-300 text-rose-700 shrink-0">
            <AlertOctagon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase rounded-md bg-rose-200/80 text-rose-900 px-2 py-0.5 border border-rose-300">
                ACTIVE CAMPAIGN DETECTED
              </span>
              <span className="text-xs font-mono text-slate-500 font-semibold">Threat Cluster #409</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
              Surge in Disposable .XYZ Domains Impersonating Legitimate NBFC Registration Numbers
            </p>
          </div>
        </div>

        <Link
          href="/?url=https://sbicf.co.in"
          className="shrink-0 text-xs font-mono font-bold text-rose-800 hover:text-rose-900 flex items-center gap-1 border border-rose-300 rounded-lg px-3 py-1.5 bg-rose-100/80 shadow-sm"
        >
          <span>Test Impersonator</span>
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
