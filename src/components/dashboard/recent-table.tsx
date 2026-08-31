'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RecentTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerdict, setFilterVerdict] = useState<'ALL' | 'HIGH_RISK' | 'CAUTION' | 'LOW_RISK'>('ALL');

  const recentScans = [
    {
      id: 'high-risk',
      name: 'SpeedyRupee Instant Cash',
      url: 'speedyrupee-quickloan.xyz',
      claimedEntity: 'Speedy Capital NBFC Ltd',
      score: 88,
      verdict: 'HIGH_RISK',
      flag: '12d Domain + Invasive APK SMS/Contacts',
      time: '12 mins ago',
      category: 'Impersonator',
    },
    {
      id: 'caution',
      name: 'FlexiCredit India',
      url: 'flexicreditloans.in',
      claimedEntity: 'FlexiCredit Tech Solutions',
      score: 44,
      verdict: 'CAUTION',
      flag: 'Unverified Lead Broker + Opaque Partner NBFC',
      time: '45 mins ago',
      category: 'Aggregator',
    },
    {
      id: 'low-risk',
      name: 'Tata Digital Finance',
      url: 'tatadigitalfinance.com',
      claimedEntity: 'Tata Capital Financial Services',
      score: 12,
      verdict: 'LOW_RISK',
      flag: '100% Verified RBI Regulated NBFC',
      time: '2 hours ago',
      category: 'Regulated NBFC',
    },
    {
      id: 'high-risk-2',
      name: 'QuickPocket 2Min Loan',
      url: 'quickpocket-cash.online',
      claimedEntity: 'Pocket Finance NBFC',
      score: 92,
      verdict: 'HIGH_RISK',
      flag: 'Panama Domain + Demands Rs. 599 Advance Fee',
      time: '3 hours ago',
      category: 'Advance Fee',
    },
    {
      id: 'caution-2',
      name: 'BharatLoan Direct',
      url: 'bharatloandirect.co.in',
      claimedEntity: 'Bharat Lending Services',
      score: 51,
      verdict: 'CAUTION',
      flag: 'Missing Grievance Redressal Matrix',
      time: '5 hours ago',
      category: 'DSA Broker',
    },
    {
      id: 'low-risk-2',
      name: 'Bajaj Finserv Direct',
      url: 'bajajfinservdirect.in',
      claimedEntity: 'Bajaj Finance Limited',
      score: 8,
      verdict: 'LOW_RISK',
      flag: 'Direct EV SSL + Regulated Banking Partner',
      time: '7 hours ago',
      category: 'Regulated NBFC',
    },
  ];

  const filteredScans = recentScans.filter((scan) => {
    const matchesSearch = scan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          scan.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          scan.claimedEntity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterVerdict === 'ALL' || scan.verdict === filterVerdict;
    return matchesSearch && matchesFilter;
  });

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case 'HIGH_RISK':
        return { label: 'HIGH RISK', class: 'bg-rose-100 text-rose-800 border-rose-300' };
      case 'CAUTION':
        return { label: 'CAUTION', class: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'LOW_RISK':
      default:
        return { label: 'VERIFIED', class: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
      
      {/* Table Title and Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Recent Digital Lender Investigations
          </h3>
          <p className="text-xs text-slate-500">
            Real-time feed of newly scanned websites, mobile APK packages, and brokers.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search lenders, domains..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-xl bg-slate-50 border border-slate-300 pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-mono w-48 sm:w-60 shadow-sm"
            />
          </div>

          {/* Verdict Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-[11px] font-mono">
            {(['ALL', 'HIGH_RISK', 'CAUTION', 'LOW_RISK'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setFilterVerdict(v)}
                className={cn(
                  'rounded-lg px-2.5 py-1 transition-all font-semibold',
                  filterVerdict === v ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                )}
              >
                {v === 'ALL' ? 'All' : v === 'HIGH_RISK' ? 'High Risk' : v === 'CAUTION' ? 'Caution' : 'Verified'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
              <th className="pb-3 pl-2">Target Lender & Domain</th>
              <th className="pb-3">Claimed Entity</th>
              <th className="pb-3">Verdict & Score</th>
              <th className="pb-3 hidden lg:table-cell">Primary Forensic Finding</th>
              <th className="pb-3 hidden sm:table-cell">Scanned</th>
              <th className="pb-3 text-right pr-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredScans.map((scan) => {
              const badge = getVerdictBadge(scan.verdict);

              return (
                <tr key={scan.id} className="hover:bg-slate-50 transition-colors group">
                  
                  {/* Name & URL */}
                  <td className="py-3.5 pl-2">
                    <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {scan.name}
                    </div>
                    <div className="font-mono text-[11px] text-blue-600 font-medium">
                      {scan.url}
                    </div>
                  </td>

                  {/* Claimed Entity */}
                  <td className="py-3.5 font-medium text-slate-700">
                    <div>{scan.claimedEntity}</div>
                    <span className="text-[10px] font-mono text-slate-500">({scan.category})</span>
                  </td>

                  {/* Verdict & Score */}
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <span className={cn('inline-flex items-center rounded-md px-2 py-0.5 font-mono text-[10px] font-bold border', badge.class)}>
                        {badge.label}
                      </span>
                      <span className="font-mono font-bold text-slate-800">
                        {scan.score}/100
                      </span>
                    </div>
                  </td>

                  {/* Primary Finding */}
                  <td className="py-3.5 text-slate-600 hidden lg:table-cell max-w-xs truncate text-[11px]">
                    {scan.flag}
                  </td>

                  {/* Scanned Time */}
                  <td className="py-3.5 font-mono text-[11px] text-slate-500 hidden sm:table-cell">
                    {scan.time}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 text-right pr-2">
                    <Link
                      href={`/?url=${encodeURIComponent('https://' + scan.url)}`}
                      className="inline-flex items-center gap-1 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white border border-slate-200 px-2.5 py-1.5 text-[11px] font-bold text-slate-700 transition-all shadow-sm"
                    >
                      <span>Scan</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
