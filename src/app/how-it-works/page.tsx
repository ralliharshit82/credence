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
  Terminal,
  Code2,
  Scan,
  Lock,
  Layers,
  HelpCircle
} from 'lucide-react';

export default function HowItWorksPage() {
  const pipelineSteps = [
    {
      id: 1,
      title: 'Target URL Input',
      icon: Search,
      weight: 'Trigger',
      tag: '01. Ingestion',
      desc: 'User inputs a loan website domain, WhatsApp link, or sideloaded APK landing page.',
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
      title: 'Language & NLP NLP',
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
      desc: 'Outputs Green (Verified), Yellow (Caution), or Red (High Risk) with side-by-side Claim vs Reality and action steps.',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Top Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-cyan-950/60 border border-cyan-500/40 px-4 py-1.5 text-xs font-mono text-cyan-300">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>METHODOLOGY & ARCHITECTURE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          How LoanShield Works
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          An explainable verification pipeline designed to answer one question: 
          <strong className="text-cyan-300"> &ldquo;Does this lender&apos;s identity, claims, behavior, and digital footprint actually make sense?&rdquo;</strong>
        </p>
      </div>

      {/* PIPELINE FLOW VISUALIZER */}
      <div className="rounded-3xl bg-[#060a17] border border-slate-800 p-6 sm:p-10 space-y-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-cyan-400" />
              <span>The 8-Stage Explainable Verification Pipeline</span>
            </h2>
            <p className="text-xs text-slate-400">
              Deterministic sequence from URL ingestion to consumer safety decision.
            </p>
          </div>
          <span className="font-mono text-xs text-cyan-400 bg-cyan-950/60 border border-cyan-500/40 px-3 py-1 rounded-full">
            Pipeline v2.4
          </span>
        </div>

        {/* 8-Step Grid with Arrows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pipelineSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="relative rounded-2xl bg-slate-900/60 border border-slate-800 p-5 space-y-3 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-cyan-300 border border-slate-700">
                      {step.tag}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {step.weight}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 pt-1">
                    <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                  <span>Step 0{step.id}</span>
                  <ArrowRight className="h-3 w-3 text-cyan-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* WHY BLACKLISTS FAIL COMPARISON */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Why Blacklists Fail */}
        <div className="rounded-3xl bg-rose-950/15 border border-rose-500/30 p-6 sm:p-8 space-y-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 shrink-0">
              <XCircle className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400">
                THE STATIC DATABASE FLAW
              </span>
              <h3 className="text-xl font-bold text-white">
                Why Traditional Blacklists Fail
              </h3>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="flex items-start gap-3">
              <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
              <p>
                <strong>Zero-Day Scam Domains:</strong> Fraud syndicates purchase 50+ disposable domains daily for less than $3 each. By the time a URL appears on a blacklist, victims have already lost money.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
              <p>
                <strong>Regulatory Identity Theft:</strong> Scammers lift the real CIN and RBI registration number of legitimate dormant NBFCs. Simple registry lookups falsely say &ldquo;Yes, this registration exists!&rdquo;
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
              <p>
                <strong>Sideloaded APK Distribution:</strong> Scams bypass Google Play Store security screenings by distributing apps directly via SMS and WhatsApp APK links.
              </p>
            </div>
          </div>
        </div>

        {/* Why LoanShield Succeeds */}
        <div className="rounded-3xl bg-cyan-950/20 border border-cyan-500/40 p-6 sm:p-8 space-y-6 backdrop-blur-xl shadow-[0_0_40px_rgba(6,182,212,0.1)]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 shrink-0">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                THE STRUCTURAL COHERENCE ADVANTAGE
              </span>
              <h3 className="text-xl font-bold text-white">
                Why LoanShield Succeeds
              </h3>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="flex items-start gap-3">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
              <p>
                <strong>Identity Graph Association:</strong> LoanShield doesn&apos;t just check if an entity exists — it verifies if <em>this specific URL and APK</em> are legitimately connected to that entity.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
              <p>
                <strong>Multi-Vector Correlation:</strong> Combines domain creation timestamps, APK permission scraping, free webmail indicators, and NLP predatory claim detection.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
              <p>
                <strong>Transparent Explainability:</strong> Never returns a black-box verdict. Users see exactly <em>why</em> a score was assigned with verifiable evidence.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ARCHITECTURE & API INTEGRATION DOCUMENTATION */}
      <div className="rounded-3xl bg-[#060a17] border border-slate-800 p-6 sm:p-10 space-y-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 shrink-0">
            <Code2 className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">
              DEVELOPER & JUDGE SPECIFICATIONS
            </span>
            <h3 className="text-xl font-bold text-white">
              Extensible Provider Architecture
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          LoanShield is engineered with decoupled TypeScript Provider interfaces located in <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 font-mono">src/lib/risk-engine/providers.ts</code>. In this hackathon build, realistic deterministic mock engines power the pipeline, which can be swapped for live enterprise APIs without changing the user interface:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4 space-y-2 text-xs">
            <div className="font-mono text-cyan-400 font-bold">IRegulatoryProvider</div>
            <p className="text-slate-300 text-[11px]">
              Plugs into Reserve Bank of India (RBI) Regulated Entities Registry & Ministry of Corporate Affairs (MCA) API.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4 space-y-2 text-xs">
            <div className="font-mono text-cyan-400 font-bold">IForensicsProvider</div>
            <p className="text-slate-300 text-[11px]">
              Plugs into WhoisXML, SecurityTrails, Censys, and Let&apos;s Encrypt / DigiCert CT log monitoring.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4 space-y-2 text-xs">
            <div className="font-mono text-cyan-400 font-bold">IAppStoreProvider</div>
            <p className="text-slate-300 text-[11px]">
              Plugs into Google Play Developer API & static APK decompiler tools to extract AndroidManifest.xml.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4 space-y-2 text-xs">
            <div className="font-mono text-cyan-400 font-bold">ILanguageProvider</div>
            <p className="text-slate-300 text-[11px]">
              Plugs into Google Gemini or OpenAI LLM API for real-time predatory lending claim categorization.
            </p>
          </div>

        </div>

        {/* CTA Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Ready to test LoanShield on real or benchmark lending links?
          </div>
          <Link
            href="/scan"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all hover:scale-105"
          >
            <Scan className="h-4 w-4" />
            <span>Launch Scanner Now</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
