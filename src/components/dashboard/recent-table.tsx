'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Clock, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScanHistoryRecord, formatTimeAgo } from '@/lib/scan-history';

interface RecentTableProps {
  history: ScanHistoryRecord[];
}

export function RecentTable({ history }: RecentTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerdict, setFilterVerdict] = useState<'ALL' | 'HIGH_RISK' | 'CAUTION' | 'LOW_RISK'>('ALL');

  const filteredScans = history.filter((scan) => {
    const matchesSearch = scan.lenderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          scan.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          scan.claimedEntity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          scan.domain.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    if (filterVerdict === 'HIGH_RISK') matchesFilter = scan.verdict === 'HIGH_RISK';
    else if (filterVerdict === 'CAUTION') matchesFilter = scan.verdict === 'CAUTION';
    else if (filterVerdict === 'LOW_RISK') matchesFilter = scan.verdict === 'LOWER_RISK';

    return matchesSearch && matchesFilter;
  });

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case 'HIGH_RISK':
        return { label: 'HIGH RISK', class: 'bg-rose-100 text-rose-800 border-rose-300' };
      case 'CAUTION':
        return { label: 'CAUTION', class: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'LOWER_RISK':
      default:
        return { label: 'VERIFIED', class: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-blue-200/90 p-6 sm:p-8 space-y-6 shadow-sm">
      
      {/* Table Title and Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-100 pb-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>Recent Digital Lender Investigations</span>
            <span className="text-xs font-mono font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
              {history.length} {history.length === 1 ? 'Record' : 'Records'}
            </span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time chronological feed of websites, domains, and lenders scanned by Credence.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search scanned lenders, domains..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-xl bg-[#f0f6ff] border border-blue-200 pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-mono w-48 sm:w-64 shadow-sm"
            />
          </div>

          {/* Verdict Filter */}
          <div className="flex items-center gap-1 bg-[#f0f6ff] p-1 rounded-xl border border-blue-200 text-[11px] font-mono">
            {(['ALL', 'HIGH_RISK', 'CAUTION', 'LOW_RISK'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setFilterVerdict(v)}
                className={cn(
                  'rounded-lg px-2.5 py-1 transition-all font-bold',
                  filterVerdict === v ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                )}
              >
                {v === 'ALL' ? 'All' : v === 'HIGH_RISK' ? 'High Risk' : v === 'CAUTION' ? 'Caution' : 'Verified'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table or Empty State */}
      {history.length === 0 ? (
        <div className="rounded-2xl bg-[#f0f6ff] border-2 border-dashed border-blue-200 p-8 text-center space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
            <Clock className="h-6 w-6" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h4 className="text-base font-bold text-slate-900">No Scans Performed Yet</h4>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              When you enter and scan loan websites on the Home Scanner, their full audit records, risk scores, and exact scan times will automatically appear here.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span>Go to Home Scanner</span>
            </Link>
          </div>
        </div>
      ) : filteredScans.length === 0 ? (
        <div className="p-8 text-center text-xs text-slate-500 font-medium">
          No scanned lenders match your search &ldquo;{searchTerm}&rdquo;.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-blue-100 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                <th className="pb-3 pl-2">Target Lender & Domain</th>
                <th className="pb-3">Claimed Entity</th>
                <th className="pb-3">Verdict & Score</th>
                <th className="pb-3 hidden lg:table-cell">Primary Forensic Finding</th>
                <th className="pb-3 hidden sm:table-cell">Scanned Time</th>
                <th className="pb-3 text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {filteredScans.map((scan) => {
                const badge = getVerdictBadge(scan.verdict);

                return (
                  <tr key={scan.id} className="hover:bg-[#f4f8fe] transition-colors group">
                    
                    {/* Name & URL */}
                    <td className="py-3.5 pl-2">
                      <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {scan.lenderName}
                      </div>
                      <div className="font-mono text-[11px] text-blue-600 font-medium truncate max-w-[220px]">
                        {scan.url}
                      </div>
                    </td>

                    {/* Claimed Entity */}
                    <td className="py-3.5 font-medium text-slate-700">
                      <div>{scan.claimedEntity}</div>
                      <span className="text-[10px] font-mono text-slate-500 font-normal">({scan.category})</span>
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
                    <td className="py-3.5 text-slate-600 hidden lg:table-cell max-w-xs truncate text-[11px] font-medium">
                      {scan.flag}
                    </td>

                    {/* Scanned Time with Clock */}
                    <td className="py-3.5 font-mono text-[11px] text-slate-600 hidden sm:table-cell font-medium">
                      <span title={new Date(scan.timestamp).toLocaleString()}>
                        {formatTimeAgo(scan.timestamp)}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 text-right pr-2">
                      <Link
                        href={`/?url=${encodeURIComponent(scan.url)}`}
                        className="inline-flex items-center gap-1 rounded-xl bg-white hover:bg-blue-600 hover:text-white border border-blue-200 px-3 py-1.5 text-[11px] font-bold text-slate-700 transition-all shadow-sm"
                      >
                        <span>Scan Again</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
