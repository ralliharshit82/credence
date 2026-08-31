'use client';

import React from 'react';
import Link from 'next/link';
import {
  Shield,
  Search,
  FileCheck2,
  Network,
  Globe,
  Smartphone,
  MessageSquareWarning,
  Cpu,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Layers,
  HelpCircle,
  Code2
} from 'lucide-react';

export default function HowItWorksPage() {
  const pipelineSteps = [
    {
      id: 1,
      title: 'Target URL Input',
      icon: Search,
      weight: 'Trigger',
      tag: '01. Ingestion',
      desc: 'User inputs a loan website domain, WhatsApp link, or sideloaded APK landing page into Credence.',
    },
    {
      id: 2,
      title: 'Regulatory Verification',
      icon: FileCheck2,
      weight: '25% Weight',
      tag: '02. Regulatory',
      desc: 'Cross-references claimed corporate license numbers against official central bank (RBI/MCA) directories.',
    },
    {
      id: 3,
      title: 'Identity Graph Resolver',
      icon: Network,
      weight: '25% Weight',
      tag: '03. Identity',
      desc: 'Constructs directed entity graph: User Link → Domain → Website → Claimed Lender → Regulated Entity → App → Developer.',
    },
    {
      id: 4,
      title: 'Digital Forensics',
      icon: Globe,
      weight: '15% Weight',
      tag: '04. Forensics',
      desc: 'Audits domain age, SSL cipher grade, WHOIS privacy protection, server geolocation, and grievance redressal officer contacts.',
    },
    {
      id: 5,
      title: 'Permission Analysis',
      icon: Smartphone,
      weight: '15% Weight',
      tag: '05. Mobile APK',
      desc: 'Scrutinizes APK AndroidManifest declarations for prohibited access (Contacts, SMS inbox, photos, call logs).',
    },
    {
      id: 6,
      title: 'Language & NLP Audit',
      icon: MessageSquareWarning,
      weight: '10% Weight',
      tag: '06. Semantics',
      desc: 'Analyzes psychological pressure triggers: "100% Guaranteed Approval", "Pay advance fee", and manufactured scarcity.',
    },
    {
      id: 7,
      title: 'Deterministic Risk Engine',
      icon: Cpu,
      weight: '10% Weight (Reputation + Composite)',
      tag: '07. Risk Engine',
      desc: 'Calculates mathematically weighted risk score (0-100) and separate verification confidence level.',
    },
    {
      id: 8,
      title: 'Explainability & Verdict',
      icon: Shield,
      weight: 'Output',
      tag: '08. Decision',
      desc: 'Outputs Low Risk (Verified), Medium Risk (Caution), or High Risk with side-by-side Claim vs Reality and action steps.',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-12">
      
      {/* Top Hero */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 border border-blue-300 px-3.5 py-1 text-xs font-bold text-blue-700 shadow-sm">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>METHODOLOGY & ARCHITECTURE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          How Credence Works
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          An explainable verification pipeline designed to answer one question: 
          <strong className="text-blue-600"> &ldquo;Does this lender&apos;s identity, claims, behavior, and digital footprint actually make sense?&rdquo;</strong>
        </p>
      </div>

      {/* PIPELINE FLOW VISUALIZER */}
      <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Layers className="h-5 w-5 text-blue-600" />
              <span>The 8-Stage Explainable Verification Pipeline</span>
            </h2>
            <p className="text-xs text-slate-500">
              Deterministic sequence from URL ingestion to consumer safety decision.
            </p>
          </div>
          <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100 border border-blue-300 px-3 py-1 rounded-full">
            Credence v2.4
          </span>
        </div>

        {/* 8-Step Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pipelineSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="relative rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-3 hover:border-blue-300 transition-all flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-mono font-bold text-blue-700 border border-blue-200">
                      {step.tag}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-500">
                      {step.weight}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 pt-1">
                    <div className="p-2 rounded-xl bg-blue-100 border border-blue-200 text-blue-600 shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                  <span>Step 0{step.id}</span>
                  <ArrowRight className="h-3 w-3 text-blue-600" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* WHY BLACKLISTS FAIL COMPARISON */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Why Blacklists Fail */}
        <div className="rounded-3xl bg-rose-50 border border-rose-200 p-6 sm:p-7 space-y-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-100 border border-rose-300 text-rose-700 shrink-0">
              <XCircle className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-700">
                THE STATIC DATABASE FLAW
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Why Traditional Blacklists Fail
              </h3>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="flex items-start gap-2.5">
              <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
              <p>
                <strong>Zero-Day Scam Domains:</strong> Fraud syndicates purchase 50+ disposable domains daily for less than $3 each. By the time a URL appears on a blacklist, victims have already lost money.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
              <p>
                <strong>Regulatory Identity Theft:</strong> Scammers lift the real CIN and RBI registration number of legitimate dormant NBFCs. Simple registry lookups falsely say &ldquo;Yes, this registration exists!&rdquo;
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
              <p>
                <strong>Sideloaded APK Distribution:</strong> Scams bypass Google Play Store security screenings by distributing apps directly via SMS and WhatsApp APK links.
              </p>
            </div>
          </div>
        </div>

        {/* Why Credence Succeeds */}
        <div className="rounded-3xl bg-blue-50 border border-blue-200 p-6 sm:p-7 space-y-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-100 border border-blue-300 text-blue-700 shrink-0">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700">
                THE STRUCTURAL COHERENCE ADVANTAGE
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Why Credence Succeeds
              </h3>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="flex items-start gap-2.5">
              <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0 mt-1.5" />
              <p>
                <strong>Identity Graph Association:</strong> Credence doesn&apos;t just check if an entity exists — it verifies if <em>this specific URL and APK</em> are legitimately connected to that entity.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0 mt-1.5" />
              <p>
                <strong>Multi-Vector Correlation:</strong> Combines domain creation timestamps, APK permission scraping, free webmail indicators, and NLP predatory claim detection.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0 mt-1.5" />
              <p>
                <strong>Transparent Explainability:</strong> Never returns a black-box verdict. Users see exactly <em>why</em> a score was assigned with verifiable evidence.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* CTA Bar */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 className="text-base font-bold text-slate-900">Ready to audit a digital lender URL?</h3>
          <p className="text-xs text-slate-600">Scan any link right on the Credence homepage.</p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all"
        >
          <Sparkles className="h-4 w-4" />
          <span>Go to Home Scanner</span>
        </Link>
      </div>

    </div>
  );
}
