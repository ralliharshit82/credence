'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  Globe,
  FileCheck2,
  Smartphone,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Building2,
  Search,
  Sparkles
} from 'lucide-react';
import { ScanResponse } from '@/lib/api-types';
import { scanWebsite, getDemoScenario, ApiError } from '@/lib/api';
import { validateScanUrl } from '@/lib/url-validator';
import { BackendResults } from '@/components/results/backend-results';

export default function HomePage() {
  const [urlInput, setUrlInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanResult, setScanResult] = useState<ScanResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [helperMessage, setHelperMessage] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const scanStages = [
    'Fetching lender website & SSL certificate...',
    'Auditing same-domain transparency disclosures...',
    'Verifying claimed regulatory entity & domain association...',
    'Inspecting permissions & predatory promotional phrasing...',
    'Generating explainable risk verdict...',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUrlInput(val);
    if (errorMessage) {
      setErrorMessage(null);
      setHelperMessage(null);
    }
  };

  const handleScan = async (overrideUrl?: string, isDemoScenario: boolean = false) => {
    const rawUrl = overrideUrl || urlInput;
    
    // Client-side URL validation BEFORE calling backend
    const validation = validateScanUrl(rawUrl);
    if (!validation.isValid) {
      setErrorMessage(validation.errorMessage || 'Invalid URL — Please enter a valid website URL.');
      setHelperMessage(validation.helperMessage || 'Example: https://example.com');
      setIsScanning(false);
      setScanResult(null);
      return;
    }

    const cleanUrl = validation.cleanUrl;
    if (overrideUrl) setUrlInput(cleanUrl);
    
    setIsScanning(true);
    setScanResult(null);
    setErrorMessage(null);
    setHelperMessage(null);
    setScanStep(0);
    setIsDemoMode(isDemoScenario || cleanUrl.includes('demo'));

    const stageTimer = setInterval(() => {
      setScanStep((prev) => (prev < scanStages.length - 1 ? prev + 1 : prev));
    }, 300);

    try {
      const response = await scanWebsite(cleanUrl);
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
        if (err.status === 400 || err.status === 422) {
          setHelperMessage('Example: https://example.com');
        }
      } else {
        setErrorMessage('Credence backend is unavailable. Start the backend and try again.');
      }
    }
  };

  const handleDemoClick = async (scenario: 'quickrupee' | 'verified') => {
    try {
      setIsScanning(true);
      setErrorMessage(null);
      setHelperMessage(null);
      setScanResult(null);
      setScanStep(0);

      const demoData = await getDemoScenario(scenario);
      setUrlInput(demoData.url);
      handleScan(demoData.url, true);
    } catch {
      setIsScanning(false);
      setErrorMessage('Credence backend is unavailable. Start the backend and try again.');
    }
  };

  return (
    <div className="flex flex-col space-y-12 pb-20 pt-8 sm:pt-12">
      
      {/* 1. HERO & PRIMARY SCANNER SECTION */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-6">
        
        {/* Presentation Header Block */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/90 border border-blue-300 px-3.5 py-1 text-xs font-bold text-blue-700 shadow-sm">
            <Shield className="h-4 w-4 text-blue-600" />
            <span>Build $ Bank • Problem Statement</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-blue-600 uppercase flex items-center justify-center gap-3">
            <span>CREDENCE</span>
            <div className="inline-flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
          </h1>

          <div className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-slate-800">
            PROBLEM STATEMENT: VERIFYING LEGITIMATE LENDERS
          </div>

          <p className="text-sm sm:text-base italic text-slate-600 max-w-2xl mx-auto leading-relaxed border-b border-blue-200/80 pb-3">
            An explainable trust engine for detecting fraudulent digital lenders - before you trust them.
          </p>
        </div>

        {/* Unified Scanner Input Box */}
        <div className="pt-2 max-w-2xl mx-auto space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleScan();
            }}
            className="flex flex-col sm:flex-row items-stretch gap-2 bg-white border-2 border-blue-300 rounded-2xl p-2 shadow-lg shadow-blue-500/10 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100 transition-all"
          >
            <div className="flex-1 flex items-center pl-3">
              <Globe className="h-5 w-5 text-blue-500 shrink-0 mr-2.5" />
              <input
                type="text"
                value={urlInput}
                onChange={handleInputChange}
                placeholder="Enter loan website or app URL (e.g. https://...)"
                className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none font-mono"
              />
              {urlInput && (
                <button
                  type="button"
                  onClick={() => {
                    setUrlInput('');
                    setScanResult(null);
                    setErrorMessage(null);
                    setHelperMessage(null);
                  }}
                  className="text-xs text-slate-400 hover:text-slate-700 px-2 py-1 font-medium"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={!urlInput.trim() || isScanning}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/30 transition-all disabled:opacity-50 disabled:pointer-events-none shrink-0"
            >
              {isScanning ? (
                <span>Scanning...</span>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Scan with Credence</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Scenarios (Ice Blue Palette) */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600 pt-1">
            <span className="font-semibold text-slate-700">Quick Test Scenarios:</span>
            <button
              type="button"
              onClick={() => {
                setUrlInput('https://sbicf.co.in');
                handleScan('https://sbicf.co.in', true);
              }}
              className="text-rose-700 font-semibold bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1 rounded-lg transition-colors shadow-sm"
            >
              sbicf.co.in (High Risk Impersonator)
            </button>
            <button
              type="button"
              onClick={() => {
                setUrlInput('https://example.com/');
                handleScan('https://example.com/', true);
              }}
              className="text-amber-800 font-semibold bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1 rounded-lg transition-colors shadow-sm"
            >
              example.com (Medium Risk / Unverified)
            </button>
            <button
              type="button"
              onClick={() => {
                setUrlInput('https://www.jansamarth.in');
                handleScan('https://www.jansamarth.in', true);
              }}
              className="text-emerald-800 font-semibold bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-lg transition-colors shadow-sm"
            >
              JanSamarth (Verified Low Risk)
            </button>
          </div>
        </div>

      </section>

      {/* 2. INVESTIGATION PROGRESS ANIMATION */}
      {isScanning && (
        <section className="mx-auto max-w-xl px-4 animate-in fade-in duration-150">
          <div className="rounded-2xl bg-white border border-blue-200 p-6 space-y-4 text-center shadow-lg shadow-blue-500/5">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-blue-600 uppercase font-bold">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Investigation In Progress</span>
            </div>

            <div className="text-sm font-semibold text-slate-800">
              {scanStages[scanStep]}
            </div>

            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${Math.round(((scanStep + 1) / scanStages.length) * 100)}%` }}
              />
            </div>
          </div>
        </section>
      )}

      {/* 3. USER-FRIENDLY ERROR / VALIDATION MESSAGE */}
      {errorMessage && !isScanning && (
        <section className="mx-auto max-w-xl px-4 animate-in fade-in duration-150">
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 text-center space-y-1 shadow-sm">
            <div className="flex items-center justify-center gap-2 text-rose-800 font-bold text-sm">
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            {helperMessage && (
              <p className="text-xs text-slate-600 font-mono">
                {helperMessage}
              </p>
            )}
          </div>
        </section>
      )}

      {/* 4. SCAN RESULT VIEW */}
      {scanResult && !isScanning && (
        <section className="mx-auto max-w-4xl px-4 sm:px-6">
          <BackendResults data={scanResult} isDemo={isDemoMode} />
        </section>
      )}

      {/* 5. FORENSIC PILLARS (LIGHT ICE-BLUE THEME) */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-6 border-t border-slate-200 space-y-8">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-slate-900">
            How Credence Evaluates Digital Lenders
          </h2>
          <p className="text-xs text-slate-600">
            Explainable multi-signal forensic analysis beyond static blacklist lookups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2 text-left shadow-sm hover:border-blue-300 transition-colors">
            <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">1. Regulatory Identity Check</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Verifies whether claimed corporate names match central registries and whether the domain actually belongs to that registered entity.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2 text-left shadow-sm hover:border-blue-300 transition-colors">
            <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">2. Same-Domain Forensics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Crawls same-domain internal pages to verify privacy policies, terms, grievance mechanisms, and physical contact disclosures.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2 text-left shadow-sm hover:border-blue-300 transition-colors">
            <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Smartphone className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">3. Permission & NLP Audit</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Flags invasive runtime mobile permissions (e.g. contacts, SMS scraping) and high-pressure deceptive loan marketing phrasing.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
