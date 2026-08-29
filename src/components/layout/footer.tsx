import React from 'react';
import Link from 'next/link';
import { Shield, ShieldAlert, FileText, CheckCircle2, Lock, ExternalLink, Terminal } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#03060d] text-slate-400">
      {/* Top Disclaimer Banner */}
      <div className="border-b border-slate-800/50 bg-slate-950/60 py-4 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-amber-300/90 font-medium">
            <ShieldAlert className="h-4 w-4 shrink-0 text-amber-400" />
            <span>RESPONSIBLE DISCLOSURE & LEGAL NOTICE</span>
          </div>
          <p className="text-slate-400 leading-relaxed max-w-4xl text-[11px]">
            LoanShield provides risk intelligence and does not make a legal determination of fraud. Users should independently verify financial entities before sharing personal information or making payments.
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                <Shield className="h-5 w-5 text-cyan-400" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">LOAN<span className="text-cyan-400">SHIELD</span></span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              An explainable trust engine that helps consumers, analysts, and regulators detect potentially fraudulent digital lenders by analyzing identity coherence, digital footprints, APK permissions, and predatory language.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-slate-300">
                <Lock className="h-3 w-3 text-cyan-400" /> Multi-Layer Forensics
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-slate-300">
                <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Explainable Risk Signals
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs text-slate-300">
                <Terminal className="h-3 w-3 text-blue-400" /> Zero-Day Scam Detection
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Investigation Engine</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/scan" className="hover:text-cyan-400 transition-colors">Live URL Scanner</Link>
              </li>
              <li>
                <Link href="/results/high-risk" className="hover:text-cyan-400 transition-colors">High Risk Demo (Impersonator)</Link>
              </li>
              <li>
                <Link href="/results/caution" className="hover:text-cyan-400 transition-colors">Caution Demo (Unverified Broker)</Link>
              </li>
              <li>
                <Link href="/results/low-risk" className="hover:text-cyan-400 transition-colors">Low Risk Demo (Regulated NBFC)</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-cyan-400 transition-colors">Threat Intel Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Verification Pillars */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Verification Pillars</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span> Regulatory Cross-Match</li>
              <li className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span> Identity Graph Coherence</li>
              <li className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span> Domain & SSL Forensics</li>
              <li className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span> Mobile Permission Scrutiny</li>
              <li className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-rose-400"></span> Predatory NLP Claims</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} LoanShield Trust Engine. Hackathon Edition.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/how-it-works" className="hover:text-slate-300">Methodology</Link>
            <Link href="/dashboard" className="hover:text-slate-300">Threat Sentinel</Link>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-500/80 font-mono">Designed for Next-Gen Fintech Safety</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
