'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Globe,
  FileCheck2,
  Smartphone,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Search
} from 'lucide-react';
import { ScanResponse, Permissions } from '@/lib/api-types';
import { scanWebsite, scanApp, getDemoScenario, ApiError } from '@/lib/api';
import { BackendResults } from '@/components/results/backend-results';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const [urlInput, setUrlInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanResult, setScanResult] = useState<ScanResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const scanStages = [
    'Fetching lender website & SSL certificate...',
    'Auditing same-domain transparency pages...',
    'Verifying claimed regulatory entity & domain association...',
    'Inspecting permissions & predatory promotional phrasing...',
    'Generating explainable risk verdict...',
  ];

  const handleScan = async (overrideUrl?: string, isDemoScenario: boolean = false) => {
    const targetUrl = (overrideUrl || urlInput).trim();
    if (!targetUrl) return;

    if (overrideUrl) setUrlInput(overrideUrl);
    setIsScanning(true);
    setScanResult(null);
    setErrorMessage(null);
    setScanStep(0);
    setIsDemoMode(isDemoScenario || targetUrl.includes('demo'));

    const stageTimer = setInterval(() => {
      setScanStep((prev) => (prev < scanStages.length - 1 ? prev + 1 : prev));
    }, 300);

    try {
      const response = await scanWebsite(targetUrl);
      setTimeout(() => {
        clearInterval(stageTimer);
        setIsScanning(false);
        setScanResult(response);
      }, 1000);
    } catch (err: unknown) {
      clearInterval(stageTimer);
      setIsScanning(false);
      if (err instanceof ApiError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('LoanShield backend is unavailable. Start the backend and try again.');
      }
    }
  };

  const handleDemoClick = async (scenario: 'quickrupee' | 'verified') => {
    try {
      setIsScanning(true);
      setErrorMessage(null);
      setScanResult(null);
      setScanStep(0);

      const demoData = await getDemoScenario(scenario);
      setUrlInput(demoData.url);
      handleScan(demoData.url, true);
    } catch {
      setIsScanning(false);
      setErrorMessage('LoanShield backend is unavailable. Start the backend and try again.');
    }
  };

  return (
    <div className="flex flex-col space-y-16 pb-20 pt-10 sm:pt-16">
      
      {/* 1. SIMPLE HERO SECTION */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 text-center space-y-6">
        
        {/* Strong Headline */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Detect fraudulent digital lenders before you trust them.
        </h1>

        {/* Short Description */}
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          LoanShield audits claimed lender registrations, same-domain transparency pages, and digital footprints to explain the risk behind any loan URL.
        </p>

        {/* Clean URL Input + Scan Button */}
        <div className="pt-2 max-w-2xl mx-auto space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleScan();
            }}
            className="flex flex-col sm:flex-row items-stretch gap-2 bg-slate-900 border border-slate-700 rounded-lg p-1.5 focus-within:border-blue-500 transition-colors"
          >
            <div className="flex-1 flex items-center pl-3">
              <Globe className="h-4 w-4 text-slate-400 shrink-0 mr-2.5" />
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter loan website or app URL (e.g. https://...)"
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none font-mono"
              />
              {urlInput && (
                <button
                  type="button"
                  onClick={() => {
                    setUrlInput('');
                    setScanResult(null);
                  }}
                  className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={!urlInput.trim() || isScanning}
              className="flex items-center justify-center gap-2 rounded-md bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-50 disabled:pointer-events-none shrink-0"
            >
              {isScanning ? (
                <span>Scanning...</span>
              ) : (
                <>
                  <span>Scan URL</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Simple Clean Demo Scenarios */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 pt-1">
            <span>Try sample:</span>
            <button
              type="button"
              onClick={() => handleDemoClick('quickrupee')}
              className="text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 px-2.5 py-1 rounded transition-colors"
            >
              QuickRupee (High Risk Demo)
            </button>
            <button
              type="button"
              onClick={() => handleDemoClick('verified')}
              className="text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 px-2.5 py-1 rounded transition-colors"
            >
              Demo Cooperative (Verified Demo)
            </button>
          </div>
        </div>

      </section>

      {/* 2. INVESTIGATION PROGRESS ANIMATION */}
      {isScanning && (
        <section className="mx-auto max-w-xl px-4 animate-in fade-in duration-150">
          <div className="rounded-lg bg-slate-900 border border-slate-800 p-6 space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-blue-400 uppercase font-semibold">
              <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              <span>Investigation In Progress</span>
            </div>

            <div className="text-sm font-medium text-white">
              {scanStages[scanStep]}
            </div>

            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${Math.round(((scanStep + 1) / scanStages.length) * 100)}%` }}
              />
            </div>
          </div>
        </section>
      )}

      {/* 3. ERROR MESSAGE IF BACKEND FAILS */}
      {errorMessage && !isScanning && (
        <section className="mx-auto max-w-xl px-4 animate-in fade-in duration-150">
          <div className="rounded-lg bg-rose-950/40 border border-rose-800/60 p-5 text-center space-y-3">
            <AlertCircle className="h-6 w-6 text-rose-400 mx-auto" />
            <h3 className="text-sm font-semibold text-white">LoanShield backend is unavailable</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              {errorMessage}
            </p>
            <div>
              <button
                type="button"
                onClick={() => handleScan()}
                className="inline-flex items-center gap-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 text-xs text-slate-200 transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Retry Scan</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 4. SCAN RESULT VIEW */}
      {scanResult && !isScanning && (
        <section className="mx-auto max-w-4xl px-4 sm:px-6">
          <BackendResults data={scanResult} isDemo={isDemoMode} />
        </section>
      )}

      {/* 5. DETAILED FEATURES (MOVED BELOW) */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-6 border-t border-slate-800/80 space-y-8">
        <div className="text-center space-y-1">
          <h2 className="text-lg font-bold text-white">
            How LoanShield Evaluates Digital Lenders
          </h2>
          <p className="text-xs text-slate-400">
            Explainable multi-signal forensic analysis beyond static blacklist lookups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg bg-slate-900/50 border border-slate-800 p-5 space-y-2 text-left">
            <div className="h-8 w-8 rounded bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-400">
              <FileCheck2 className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">1. Regulatory Identity Check</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verifies whether claimed corporate names match central registries and whether the domain actually belongs to that registered entity.
            </p>
          </div>

          <div className="rounded-lg bg-slate-900/50 border border-slate-800 p-5 space-y-2 text-left">
            <div className="h-8 w-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <Globe className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">2. Same-Domain Forensics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Crawls same-domain internal pages to verify privacy policies, terms, grievance mechanisms, and physical contact disclosures.
            </p>
          </div>

          <div className="rounded-lg bg-slate-900/50 border border-slate-800 p-5 space-y-2 text-left">
            <div className="h-8 w-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <Smartphone className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-semibold text-white">3. Permission & NLP Audit</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Flags invasive runtime mobile permissions (e.g. contacts, SMS scraping) and high-pressure deceptive loan marketing phrasing.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
