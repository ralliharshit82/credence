'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  ShieldCheck,
  Globe,
  FileCheck2,
  Network,
  Smartphone,
  MessageSquareWarning,
  CheckCircle2,
  XCircle,
  FileSearch,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Download,
  Info,
  Layers,
  Database,
  Building2
} from 'lucide-react';
import { ScanResponse } from '@/lib/api-types';
import { cn } from '@/lib/utils';

interface BackendResultsProps {
  data: ScanResponse;
  isDemo?: boolean;
}

export function BackendResults({ data, isDemo = false }: BackendResultsProps) {
  const [activeTab, setActiveTab] = useState<'signals' | 'identity' | 'reputation' | 'transparency' | 'regulatory' | 'forensics' | 'permissions'>('signals');
  const [expandedSignal, setExpandedSignal] = useState<number | null>(0);
  const [showRawJson, setShowRawJson] = useState<Record<number, boolean>>({});

  // Verdict Theme Helpers
  const getTheme = (level: ScanResponse['risk_level']) => {
    switch (level) {
      case 'HIGH_RISK':
        return {
          label: 'HIGH RISK',
          icon: ShieldAlert,
          badgeBg: 'bg-rose-950/60 text-rose-400 border-rose-800/80',
          scoreColor: 'text-rose-400',
          cardBorder: 'border-rose-900/40 bg-slate-900/90',
          summaryTitle: 'Significant Risk Detected',
        };
      case 'CAUTION':
        return {
          label: 'UNVERIFIED / CAUTION',
          icon: AlertTriangle,
          badgeBg: 'bg-amber-950/60 text-amber-400 border-amber-800/80',
          scoreColor: 'text-amber-400',
          cardBorder: 'border-amber-900/40 bg-slate-900/90',
          summaryTitle: 'Caution Advised',
        };
      case 'LOWER_RISK':
      default:
        return {
          label: 'VERIFIED / LOWER RISK',
          icon: ShieldCheck,
          badgeBg: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/80',
          scoreColor: 'text-emerald-400',
          cardBorder: 'border-emerald-900/40 bg-slate-900/90',
          summaryTitle: 'Lower Risk Profile',
        };
    }
  };

  const theme = getTheme(data.risk_level);
  const VerdictIcon = theme.icon;

  // Derive short "Why" summary in plain human language
  const getShortWhy = () => {
    if (data.signals.length === 0) {
      return 'No suspicious indicators or predatory patterns were detected on this domain. Essential digital and transparency signals were verified.';
    }
    const highSignals = data.signals.filter((s) => s.severity === 'HIGH');
    if (highSignals.length > 0) {
      return `Critical warning signals detected: ${highSignals.map((s) => s.name).join(', ')}.`;
    }
    return `Warning signals detected: ${data.signals.map((s) => s.name).join(', ')}.`;
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', `loanshield-scan-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. IMMEDIATE VERDICT + SCORE + SHORT "WHY" */}
      <div className={cn('rounded-xl border p-6 sm:p-7 text-left space-y-5', theme.cardBorder)}>
        
        {/* Top Header: Badge, Domain, Export */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={cn('inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold border', theme.badgeBg)}>
                <VerdictIcon className="h-3.5 w-3.5" />
                <span>{theme.label}</span>
              </span>
              {isDemo && (
                <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                  Demo Fixture
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {data.identity.claimed_lender || data.categories.website.title || data.categories.digital.domain}
            </h2>
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 hover:underline font-mono"
            >
              <span>{data.url}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Score Box */}
          <div className="flex items-center gap-4 bg-slate-950/70 border border-slate-800 px-5 py-3 rounded-lg shrink-0">
            <div>
              <div className={cn('text-3xl font-black font-mono', theme.scoreColor)}>
                {data.risk_score}
                <span className="text-xs text-slate-400 font-normal"> / 100</span>
              </div>
              <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Risk Score
              </div>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="text-xs text-slate-300 space-y-0.5">
              <div>Evidence: <strong className="text-white">{data.evidence_strength}</strong></div>
              <div>Signals: <strong className="text-white">{data.signals.length}</strong></div>
            </div>
          </div>
        </div>

        {/* Short "Why" Highlight Box */}
        <div className="rounded-lg bg-slate-950/80 border border-slate-800/80 p-4 space-y-1.5">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5 text-blue-400" />
            <span>Why this verdict:</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            {getShortWhy()}
          </p>
        </div>

        {/* Consumer Action Recommendation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300 pt-1">
          <div>
            <strong className="text-slate-400 uppercase tracking-wider text-[10px] block">Recommendation:</strong>
            <span>{data.recommendation}</span>
          </div>

          <button
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1 text-xs text-slate-200 shrink-0 font-mono transition-colors"
          >
            <Download className="h-3 w-3" />
            <span>JSON</span>
          </button>
        </div>

      </div>

      {/* 2. STRUCTURED DETAILS & TABS */}
      <div className="space-y-4">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2 overflow-x-auto">
          {[
            { id: 'signals', label: 'Evidence Signals', count: data.signals.length },
            { id: 'identity', label: 'Claim vs Reality' },
            { id: 'reputation', label: 'Reputation & Brand Layer', highlight: Boolean(data.categories.reputation?.threat_record || data.categories.reputation?.brand_impersonation) },
            { id: 'transparency', label: 'Transparency Audit' },
            { id: 'regulatory', label: 'Regulatory Data' },
            { id: 'forensics', label: 'Digital Forensics' },
            { id: 'permissions', label: 'Mobile & Language', count: (data.categories.permissions?.findings?.length || 0) + (data.categories.language?.detected_patterns?.length || 0) },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors',
                  isActive
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                )}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={cn('rounded px-1.5 py-0.2 text-[10px] font-mono', isActive ? 'bg-blue-900/60 text-blue-300' : 'bg-slate-800 text-slate-400')}>
                    {tab.count}
                  </span>
                )}
                {tab.highlight && (
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: EVIDENCE SIGNALS */}
        {activeTab === 'signals' && (
          <div className="space-y-3">
            {data.signals.length === 0 ? (
              <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-6 text-center space-y-1">
                <CheckCircle2 className="h-6 w-6 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-semibold text-white">No Suspicious Signals Detected</h4>
                <p className="text-xs text-slate-400">Available evidence did not reveal warning signals for this target.</p>
              </div>
            ) : (
              data.signals.map((sig, idx) => {
                const isExpanded = expandedSignal === idx;
                const isHigh = sig.severity === 'HIGH';
                const isMed = sig.severity === 'MEDIUM';
                const isJsonVisible = !!showRawJson[idx];

                return (
                  <div
                    key={idx}
                    className="rounded-lg border border-slate-800 bg-slate-900/60 overflow-hidden text-left"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedSignal(isExpanded ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left gap-3 hover:bg-slate-800/30 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={cn(
                          'px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border shrink-0',
                          isHigh ? 'bg-rose-950/60 text-rose-300 border-rose-800' :
                          isMed ? 'bg-amber-950/60 text-amber-300 border-amber-800' :
                          'bg-slate-800 text-slate-300 border-slate-700'
                        )}>
                          {sig.severity}
                        </span>
                        <h4 className="text-sm font-semibold text-white truncate">
                          {sig.name}
                        </h4>
                      </div>

                      <div className="flex items-center gap-3 text-slate-400 text-xs shrink-0">
                        {sig.confidence && (
                          <span className="hidden sm:inline-block rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                            {(sig.confidence * 100).toFixed(0)}% Confidence
                          </span>
                        )}
                        <span className="font-mono text-[11px]">Impact: {(sig.score * 100).toFixed(0)}%</span>
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-slate-800/80 bg-slate-950/50 p-4 space-y-3.5 text-xs">
                        
                        {/* WHY IT MATTERS - Human explanation */}
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                            Why this matters:
                          </span>
                          <p className="text-slate-200 leading-relaxed font-normal">
                            {sig.explanation}
                          </p>
                        </div>

                        {/* FORMATTED EVIDENCE BREAKDOWN */}
                        <div className="rounded-lg bg-slate-900 border border-slate-800 p-3.5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase text-blue-400 font-semibold flex items-center gap-1">
                              <Layers className="h-3 w-3" />
                              <span>Forensic Evidence Breakdown:</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => setShowRawJson((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                              className="text-[10px] font-mono text-slate-400 hover:text-slate-200 underline"
                            >
                              {isJsonVisible ? 'Hide Raw JSON' : 'Show Raw JSON'}
                            </button>
                          </div>

                          {/* Structured Key-Value Presentation */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-slate-300">
                            {Object.entries(sig.evidence)
                              .filter(([k]) => typeof sig.evidence[k] === 'string' || typeof sig.evidence[k] === 'number' || typeof sig.evidence[k] === 'boolean')
                              .map(([k, v]) => (
                                <div key={k} className="flex flex-col bg-slate-950/80 rounded p-2 border border-slate-800/60">
                                  <span className="text-[10px] uppercase text-slate-400 font-mono font-semibold">
                                    {k.replace(/_/g, ' ')}
                                  </span>
                                  <span className="text-white font-medium break-all">
                                    {String(v)}
                                  </span>
                                </div>
                              ))}
                          </div>

                          {/* Raw JSON Accordion for technical details */}
                          {isJsonVisible && (
                            <pre className="mt-2 p-2.5 rounded bg-[#090d16] font-mono text-[11px] text-slate-300 overflow-x-auto whitespace-pre-wrap break-all border border-slate-800">
                              {JSON.stringify(sig.evidence, null, 2)}
                            </pre>
                          )}
                        </div>

                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 2: CLAIM VS REALITY (IDENTITY) */}
        {activeTab === 'identity' && (
          <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-5 space-y-4 text-left">
            <h3 className="text-sm font-semibold text-white">Identity & Association Audit</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-slate-950/70 border border-slate-800 p-3.5 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">1. Claimed / Extracted Lender</span>
                <div className="font-bold text-white">{data.identity.claimed_lender || 'None declared on page'}</div>
                <p className="text-slate-400 text-[11px]">Extracted from website branding and disclosures.</p>
              </div>

              <div className="rounded-lg bg-slate-950/70 border border-slate-800 p-3.5 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">2. Registry Record Found</span>
                <div className="font-bold text-white flex items-center gap-1.5">
                  {data.identity.lender_found ? (
                    <><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /><span>Record Exists</span></>
                  ) : (
                    <><XCircle className="h-3.5 w-3.5 text-rose-400" /><span>No Record Found</span></>
                  )}
                </div>
                <p className="text-slate-400 text-[11px]">Checked against available lender database.</p>
              </div>

              <div className="rounded-lg bg-slate-950/70 border border-slate-800 p-3.5 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">3. Association Verified</span>
                <div className="font-bold text-white flex items-center gap-1.5">
                  {data.identity.association_verified ? (
                    <><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /><span>Domain Association Verified</span></>
                  ) : (
                    <><XCircle className="h-3.5 w-3.5 text-rose-400" /><span>Association NOT Verified</span></>
                  )}
                </div>
                <p className="text-slate-400 text-[11px]">Verifies domain belongs to the claimed entity.</p>
              </div>

              <div className="rounded-lg bg-slate-950/70 border border-slate-800 p-3.5 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">4. Domain Matching</span>
                <div className="font-bold text-white flex items-center gap-1.5">
                  {data.identity.domain_match ? (
                    <><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /><span>Matches Official Domain</span></>
                  ) : (
                    <><AlertTriangle className="h-3.5 w-3.5 text-amber-400" /><span>Domain Unlinked / Mismatch</span></>
                  )}
                </div>
                <p className="text-slate-400 text-[11px]">Target URL matches registered website.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB: REPUTATION & BRAND LAYER */}
        {activeTab === 'reputation' && (
          <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-5 space-y-4 text-left text-xs">
            <h3 className="text-sm font-semibold text-white">Brand Impersonation & Historical Threat Intelligence</h3>

            <div className="rounded bg-slate-950/80 border border-slate-800 p-3 text-slate-300 text-[11px]">
              <strong>Layer Architecture:</strong> Distinguishes <em>Live Website Observation</em> vs <em>External Threat Records</em>. {data.categories.reputation?.disclaimer}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Brand Impersonation Card */}
              <div className="rounded-lg bg-slate-950/70 border border-slate-800 p-3.5 space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5 text-blue-400" />
                  <span>Brand Lookalike / Impersonation Audit:</span>
                </span>
                {data.categories.reputation?.brand_impersonation?.detected ? (
                  <div className="space-y-1 text-slate-200">
                    <div>Matched Brand: <strong className="text-white">{data.categories.reputation.brand_impersonation.matched_brand}</strong></div>
                    <div>Official Domain: <code className="text-emerald-400">{data.categories.reputation.brand_impersonation.expected_official_domain}</code></div>
                    <div>Confidence: <strong>{(data.categories.reputation.brand_impersonation.confidence * 100).toFixed(0)}%</strong></div>
                    <p className="text-rose-300 text-[11px] pt-1">
                      {data.categories.reputation.brand_impersonation.similarity_reason}
                    </p>
                  </div>
                ) : (
                  <p className="text-slate-400">No banking or NBFC brand impersonation detected in domain or subdomains.</p>
                )}
              </div>

              {/* Threat Intel Card */}
              <div className="rounded-lg bg-slate-950/70 border border-slate-800 p-3.5 space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold flex items-center gap-1">
                  <Database className="h-3.5 w-3.5 text-blue-400" />
                  <span>Historical Threat Record:</span>
                </span>
                {data.categories.reputation?.threat_record ? (
                  <div className="space-y-1 text-slate-200">
                    <div>Status: <span className="font-mono font-bold text-rose-400">{data.categories.reputation.threat_record.status}</span></div>
                    <div>Category: <span className="font-mono">{data.categories.reputation.threat_record.category}</span></div>
                    <div>Source: <span>{data.categories.reputation.threat_record.source_type}</span></div>
                    <p className="text-slate-300 text-[11px] pt-1 leading-relaxed">
                      {data.categories.reputation.threat_record.description}
                    </p>
                  </div>
                ) : (
                  <p className="text-slate-400">No documented threat intelligence flags found for this target.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TRANSPARENCY AUDIT */}
        {activeTab === 'transparency' && (
          <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-5 space-y-4 text-left text-xs">
            <h3 className="text-sm font-semibold text-white">Transparency Signals Audit</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { label: 'Privacy Policy', key: 'privacy_policy' },
                { label: 'Terms of Service', key: 'terms' },
                { label: 'Grievance Mechanism', key: 'grievance_mechanism' },
                { label: 'Lender Identity', key: 'lender_identity' },
                { label: 'Contact & Support', key: 'contact' },
              ].map((item) => {
                const isFound = !!(data.categories.transparency as any)[item.key];
                const detail = (data.categories.transparency as any)?.details?.[item.key];

                return (
                  <div key={item.key} className="rounded-lg bg-slate-950/70 border border-slate-800 p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{item.label}</span>
                      {isFound ? (
                        <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Found
                        </span>
                      ) : (
                        <span className="text-[10px] text-rose-400 font-semibold flex items-center gap-1">
                          <XCircle className="h-3 w-3" /> Missing
                        </span>
                      )}
                    </div>
                    {detail?.found_on && (
                      <p className="text-slate-400 text-[11px] font-mono truncate">
                        Source: {detail.found_on}
                      </p>
                    )}
                    {detail?.matched_pattern && (
                      <p className="text-slate-300 text-[11px]">
                        Matched: <code>{detail.matched_pattern}</code>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: REGULATORY DATA */}
        {activeTab === 'regulatory' && (
          <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-5 space-y-4 text-left text-xs">
            <h3 className="text-sm font-semibold text-white">Regulatory Verification</h3>

            <div className="rounded bg-amber-950/30 border border-amber-800/60 p-3 text-slate-300 text-[11px]">
              <strong>Registry Notice:</strong> Synthetic demo data — not official RBI data. LoanShield never certifies lenders as &ldquo;RBI approved&rdquo; merely because a name exists.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-950/70 border border-slate-800 p-3.5 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Regulatory Claims Detected</span>
                {data.categories.regulatory.claims.length > 0 ? (
                  <ul className="list-disc list-inside text-slate-200 space-y-0.5">
                    {data.categories.regulatory.claims.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400">No explicit regulatory keywords found.</p>
                )}
              </div>

              <div className="rounded-lg bg-slate-950/70 border border-slate-800 p-3.5 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Matched Registry Entity</span>
                {data.categories.regulatory.record ? (
                  <div className="font-mono text-slate-300 space-y-0.5">
                    <div>Name: <strong className="text-white">{data.categories.regulatory.record.entity_name}</strong></div>
                    <div>Domain: {data.categories.regulatory.record.domain}</div>
                    <div>DLA Association: {data.categories.regulatory.record.rbi_dla_association}</div>
                  </div>
                ) : (
                  <p className="text-slate-400">No registered lender entity matched.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: DIGITAL FORENSICS */}
        {activeTab === 'forensics' && (
          <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-5 space-y-4 text-left text-xs">
            <h3 className="text-sm font-semibold text-white">Digital Forensics</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-lg bg-slate-950/70 border border-slate-800 p-3 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Domain</span>
                <div className="font-bold text-white truncate">{data.categories.digital.domain}</div>
              </div>
              <div className="rounded-lg bg-slate-950/70 border border-slate-800 p-3 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">HTTPS</span>
                <div className={cn('font-bold', data.categories.digital.https ? 'text-emerald-400' : 'text-rose-400')}>
                  {data.categories.digital.https ? 'Encrypted (HTTPS)' : 'Insecure (HTTP)'}
                </div>
              </div>
              <div className="rounded-lg bg-slate-950/70 border border-slate-800 p-3 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Domain Age</span>
                <div className="font-bold text-white">{data.categories.digital.domain_age_status}</div>
              </div>
              <div className="rounded-lg bg-slate-950/70 border border-slate-800 p-3 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Retrieval</span>
                <div className="font-bold text-white">{data.categories.website.retrieved ? '200 OK' : 'Failed'}</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PERMISSIONS & LANGUAGE */}
        {activeTab === 'permissions' && (
          <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-5 space-y-4 text-left text-xs">
            <h3 className="text-sm font-semibold text-white">Mobile Permissions & Language Patterns</h3>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block mb-1.5">
                  Mobile Runtime Permissions Findings:
                </span>
                {data.categories.permissions?.findings?.length === 0 ? (
                  <p className="text-slate-400">No disproportionate runtime permissions declared.</p>
                ) : (
                  <div className="space-y-2">
                    {data.categories.permissions.findings.map((f, i) => (
                      <div key={i} className="rounded bg-slate-950/70 border border-slate-800 p-3 space-y-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-white font-mono uppercase">{f.permission}</strong>
                          <span className={cn('text-[10px] font-mono font-bold px-1.5 py-0.5 rounded', f.severity === 'HIGH' ? 'bg-rose-950 text-rose-300' : 'bg-amber-950 text-amber-300')}>
                            {f.severity}
                          </span>
                        </div>
                        <p className="text-slate-300">{f.explanation}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block mb-1.5">
                  Language & Promotional Pressure Patterns:
                </span>
                {data.categories.language?.detected_patterns?.length === 0 ? (
                  <p className="text-slate-400">No aggressive predatory phrasing detected.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {data.categories.language.detected_patterns.map((p, i) => (
                      <span key={i} className="rounded bg-rose-950/60 border border-rose-800/80 px-2.5 py-1 text-rose-300 text-xs font-mono">
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Disclaimer */}
      <div className="text-center text-[11px] text-slate-400 pt-2">
        <span>{data.disclaimer}</span>
      </div>

    </div>
  );
}
