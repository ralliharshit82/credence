'use client';

import React, { useState, use, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Shield,
  ShieldAlert,
  AlertTriangle,
  ShieldCheck,
  ArrowLeft,
  Network,
  Globe,
  FileCheck2,
  Smartphone,
  MessageSquareWarning,
  PieChart,
  Layers,
  Sparkles,
  RefreshCw,
  Search,
  ExternalLink
} from 'lucide-react';
import { analyzeLender } from '@/lib/risk-engine/engine';
import { VerdictBanner } from '@/components/results/verdict-banner';
import { EvidenceCard } from '@/components/results/evidence-card';
import { ClaimVsReality } from '@/components/results/claim-vs-reality';
import { IdentityGraph } from '@/components/results/identity-graph';
import { DigitalForensics } from '@/components/results/digital-forensics';
import { PermissionTable } from '@/components/results/permission-table';
import { LanguageAnalysis } from '@/components/results/language-analysis';
import { TrustBreakdown } from '@/components/results/trust-breakdown';
import { RecommendationBox } from '@/components/results/recommendation-box';
import { cn } from '@/lib/utils';

interface PageProps {
  params: Promise<{ scanId: string }>;
}

function ResultsContent({ params }: PageProps) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const rawUrl = searchParams.get('url');

  const scanId = resolvedParams.scanId;

  // Run deterministic risk engine
  const assessment = analyzeLender({
    scenarioId: scanId,
    url: rawUrl || undefined,
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'graph' | 'evidence' | 'claims' | 'forensics' | 'permissions' | 'language'>('overview');

  const tabs = [
    { id: 'overview', label: 'Executive Overview', icon: Layers },
    { id: 'graph', label: 'Identity Graph', icon: Network, badge: 'Key Forensic' },
    { id: 'evidence', label: 'Why Is This Risky?', icon: ShieldAlert, count: assessment.signals.length },
    { id: 'claims', label: 'Claim vs Reality', icon: FileCheck2, count: assessment.claimsVsReality.length },
    { id: 'forensics', label: 'Digital Forensics', icon: Globe },
    { id: 'permissions', label: 'App Permissions', icon: Smartphone, count: assessment.permissions.filter(p => p.requested).length },
    { id: 'language', label: 'Language & Claims', icon: MessageSquareWarning, count: assessment.languagePatterns.length },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Breadcrumb & Quick Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/scan"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Scanner</span>
        </Link>

        {/* Demo Switcher Quick Buttons */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-500 hidden sm:inline">Compare Scenarios:</span>
          <Link
            href="/results/high-risk"
            className={cn(
              'px-2.5 py-1 rounded-lg border transition-all text-[11px]',
              scanId === 'high-risk'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 font-bold'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            )}
          >
            High Risk
          </Link>
          <Link
            href="/results/caution"
            className={cn(
              'px-2.5 py-1 rounded-lg border transition-all text-[11px]',
              scanId === 'caution'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            )}
          >
            Caution
          </Link>
          <Link
            href="/results/low-risk"
            className={cn(
              'px-2.5 py-1 rounded-lg border transition-all text-[11px]',
              scanId === 'low-risk'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            )}
          >
            Verified Low Risk
          </Link>
        </div>
      </div>

      {/* 1. Main Verdict Banner & Risk Score Gauge */}
      <VerdictBanner assessment={assessment} />

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-800 pb-2 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all border',
                isActive
                  ? 'bg-cyan-950/80 border-cyan-500/60 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                  : 'bg-slate-900/40 border-transparent text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={cn(
                  'rounded-full px-1.5 py-0.2 text-[10px] font-mono',
                  isActive ? 'bg-cyan-500/30 text-cyan-200' : 'bg-slate-800 text-slate-400'
                )}>
                  {tab.count}
                </span>
              )}
              {tab.badge && (
                <span className="rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 px-1.5 py-0.2 text-[9px] font-mono">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: EXECUTIVE OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          
          {/* Actionable Consumer Guidance */}
          <RecommendationBox
            verdict={assessment.verdict}
            recommendation={assessment.recommendation}
            checklist={assessment.recommendationChecklist}
          />

          {/* Identity Graph Preview Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Network className="h-5 w-5 text-cyan-400" />
                <span>Identity Graph Coherence</span>
              </h2>
              <button
                onClick={() => setActiveTab('graph')}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>Deep Graph View</span>
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
            <IdentityGraph data={assessment.identityGraph} />
          </div>

          {/* Claim vs Reality Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileCheck2 className="h-5 w-5 text-cyan-400" />
                  <span>Claim vs Reality Matrix</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Contrasting declared marketing statements against verified public registries.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('claims')}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>View All ({assessment.claimsVsReality.length})</span>
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
            <ClaimVsReality items={assessment.claimsVsReality} />
          </div>

          {/* Trust Signal Weighted Breakdown */}
          <div className="space-y-4">
            <TrustBreakdown breakdowns={assessment.categoryBreakdown} />
          </div>

          {/* Top Discovered Evidence Cards */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-rose-400" />
                <span>Discovered Risk Signals & Forensics</span>
              </h2>
              <p className="text-xs text-slate-400">
                Detailed evidence cards tagged by severity, confidence, and source attribution.
              </p>
            </div>
            <EvidenceCard signals={assessment.signals} />
          </div>

        </div>
      )}

      {/* TAB CONTENT: IDENTITY GRAPH */}
      {activeTab === 'graph' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Identity Graph & Corporate Traceability
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              LoanShield maps the end-to-end relationship from the user link to the legal entity, detecting brand impersonation and shell infrastructures.
            </p>
          </div>
          <IdentityGraph data={assessment.identityGraph} />
        </div>
      )}

      {/* TAB CONTENT: WHY IS THIS RISKY? (EVIDENCE) */}
      {activeTab === 'evidence' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Why Is This Risky? — Forensic Evidence Ledger
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Every identified risk signal contains concrete evidence, source verification, and score impact.
            </p>
          </div>
          <EvidenceCard signals={assessment.signals} />
        </div>
      )}

      {/* TAB CONTENT: CLAIM VS REALITY */}
      {activeTab === 'claims' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Claim vs Reality Comparison
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Direct side-by-side analysis of declared claims vs verified facts.
            </p>
          </div>
          <ClaimVsReality items={assessment.claimsVsReality} />
        </div>
      )}

      {/* TAB CONTENT: DIGITAL FORENSICS */}
      {activeTab === 'forensics' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Digital Forensics & Infrastructure Footprint
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Domain age, SSL cipher grade, WHOIS privacy protection, office address, and governance policies.
            </p>
          </div>
          <DigitalForensics forensics={assessment.forensics} />
        </div>
      )}

      {/* TAB CONTENT: PERMISSION ANALYSIS */}
      {activeTab === 'permissions' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Mobile APK Permission Scrutiny
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Evaluation of Android application permissions against central bank digital lending privacy guidelines.
            </p>
          </div>
          <PermissionTable permissions={assessment.permissions} />
        </div>
      )}

      {/* TAB CONTENT: LANGUAGE ANALYSIS */}
      {activeTab === 'language' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Semantic Language & Predatory Marketing Analysis
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Natural Language Processing detection of urgent pressure, upfront fees, and guaranteed loans.
            </p>
          </div>
          <LanguageAnalysis patterns={assessment.languagePatterns} />
        </div>
      )}

      {/* Bottom Responsible Disclaimer */}
      <div className="rounded-2xl bg-[#060a17] border border-slate-800/80 p-4 text-center text-xs text-slate-500 space-y-1">
        <p className="text-slate-400">
          <strong className="text-amber-400">Disclaimer:</strong> {assessment.disclaimer}
        </p>
        <p className="font-mono text-[10px] text-slate-600">
          Scan Reference ID: {assessment.scanId} | Timestamp: {assessment.timestamp}
        </p>
      </div>

    </div>
  );
}

export default function ResultsPage(props: PageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-cyan-400 font-mono text-sm">
          <span className="h-4 w-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          <span>Generating Explainable Risk Report...</span>
        </div>
      </div>
    }>
      <ResultsContent {...props} />
    </Suspense>
  );
}
