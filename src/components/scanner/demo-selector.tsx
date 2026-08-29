'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, AlertTriangle, ShieldCheck, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DemoSelector() {
  const demos = [
    {
      id: 'high-risk',
      title: 'Predatory Impersonator',
      name: 'SpeedyRupee Instant Cash',
      url: 'speedyrupee-quickloan.xyz',
      score: 88,
      verdict: 'HIGH RISK',
      badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      borderClass: 'hover:border-rose-500/60 hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]',
      bgClass: 'bg-gradient-to-b from-rose-950/20 to-slate-900/60',
      icon: ShieldAlert,
      iconColor: 'text-rose-400',
      description: 'Claims affiliation with legitimate NBFC; 12-day domain, invasive SMS & Contacts access, advance fee demand.',
      highlights: ['Panama Domain Shield', 'APK Sideload', 'Advance Fee Scam']
    },
    {
      id: 'caution',
      title: 'Unverified Lead Broker',
      name: 'FlexiCredit India',
      url: 'flexicreditloans.in',
      score: 44,
      verdict: 'UNVERIFIED / CAUTION',
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      borderClass: 'hover:border-amber-500/60 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]',
      bgClass: 'bg-gradient-to-b from-amber-950/20 to-slate-900/60',
      icon: AlertTriangle,
      iconColor: 'text-amber-400',
      description: 'Registered tech firm acting as DSA/lead aggregator without transparent partner NBFC disclosures or grievance officer.',
      highlights: ['Opaque Underwriter', 'Lead Syndication', 'No Grievance Officer']
    },
    {
      id: 'low-risk',
      title: 'Regulated Direct NBFC',
      name: 'Tata Digital Finance',
      url: 'tatadigitalfinance.com',
      score: 12,
      verdict: 'VERIFIED / LOWER RISK',
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      borderClass: 'hover:border-emerald-500/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]',
      bgClass: 'bg-gradient-to-b from-emerald-950/20 to-slate-900/60',
      icon: ShieldCheck,
      iconColor: 'text-emerald-400',
      description: 'Active RBI NBFC-ICC license, 9+ year domain, enterprise EV SSL, zero invasive permissions, full Ombudsman redressal.',
      highlights: ['Active RBI Master License', 'Zero Sideloads', 'AAA Rated Institutional']
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {demos.map((demo) => {
        const Icon = demo.icon;
        return (
          <Link
            key={demo.id}
            href={`/results/${demo.id}`}
            className={cn(
              'group relative flex flex-col justify-between rounded-2xl border border-slate-800 p-6 transition-all duration-300 backdrop-blur-sm',
              demo.bgClass,
              demo.borderClass
            )}
          >
            <div className="space-y-4">
              
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold border', demo.badgeClass)}>
                  <Icon className="h-3.5 w-3.5" />
                  <span>{demo.verdict}</span>
                </span>
                <span className="font-mono text-xs text-slate-400 font-semibold">
                  Score: <span className={demo.iconColor}>{demo.score}/100</span>
                </span>
              </div>

              {/* Title & Domain */}
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {demo.name}
                </h3>
                <p className="font-mono text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <span>{demo.url}</span>
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {demo.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {demo.highlights.map((h, i) => (
                  <span key={i} className="rounded-md bg-slate-900/80 border border-slate-800 px-2 py-0.5 text-[10px] text-slate-400 font-mono">
                    {h}
                  </span>
                ))}
              </div>

            </div>

            {/* Bottom CTA */}
            <div className="pt-6 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
              <span>View Full Report</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>

          </Link>
        );
      })}
    </div>
  );
}
