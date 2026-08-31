import React from 'react';
import Link from 'next/link';
import { Shield, ShieldAlert, CheckCircle2, Lock, Terminal } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-blue-200 bg-[#e0ecfb]/90 text-slate-700">
      {/* Top Disclaimer Banner */}
      <div className="border-b border-blue-200/90 bg-blue-100/70 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-blue-900 font-black">
            <ShieldAlert className="h-4 w-4 shrink-0 text-blue-600" />
            <span>RESPONSIBLE DISCLOSURE & LEGAL NOTICE</span>
          </div>
          <p className="text-slate-600 leading-relaxed max-w-4xl text-[11px] font-medium">
            Credence provides risk intelligence and does not make a legal determination of fraud. Users should independently verify financial entities before sharing personal information or making payments.
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
                <Shield className="h-5 w-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                CREDEN<span className="text-blue-600">CE</span>
              </span>
            </div>
            <p className="text-sm text-slate-700 max-w-md leading-relaxed font-medium">
              An explainable trust engine that helps consumers, analysts, and regulators detect potentially fraudulent digital lenders by analyzing identity coherence, digital footprints, APK permissions, and predatory language.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1 rounded-xl bg-white border border-blue-200 px-3 py-1 text-xs text-slate-800 font-bold shadow-sm">
                <Lock className="h-3.5 w-3.5 text-blue-600" /> Multi-Layer Forensics
              </span>
              <span className="inline-flex items-center gap-1 rounded-xl bg-white border border-blue-200 px-3 py-1 text-xs text-slate-800 font-bold shadow-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Explainable Risk Signals
              </span>
              <span className="inline-flex items-center gap-1 rounded-xl bg-white border border-blue-200 px-3 py-1 text-xs text-slate-800 font-bold shadow-sm">
                <Terminal className="h-3.5 w-3.5 text-indigo-600" /> Domain & Brand Audit
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Trust Engine</h4>
            <ul className="mt-3.5 space-y-2 text-sm text-slate-700 font-medium">
              <li>
                <Link href="/" className="hover:text-blue-700 transition-colors">Home Scanner</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-blue-700 transition-colors">Threat Intel Dashboard</Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-blue-700 transition-colors">Forensic Methodology</Link>
              </li>
            </ul>
          </div>

          {/* Verification Pillars */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Verification Pillars</h4>
            <ul className="mt-3.5 space-y-2 text-sm text-slate-700 font-medium">
              <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-600"></span> Regulatory Cross-Match</li>
              <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-indigo-600"></span> Identity Graph Coherence</li>
              <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-sky-600"></span> Domain & SSL Forensics</li>
              <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-600"></span> Mobile Permission Scrutiny</li>
              <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-600"></span> Predatory NLP Claims</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-5 border-t border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 font-medium">
          <div>
            © {new Date().getFullYear()} Credence Trust Engine. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/how-it-works" className="hover:text-slate-900 font-bold">Methodology</Link>
            <span>•</span>
            <Link href="/dashboard" className="hover:text-slate-900 font-bold">Threat Intel</Link>
            <span>•</span>
            <span className="text-blue-700 font-black">Build $ Bank Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
