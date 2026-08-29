'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Globe, RefreshCw, AlertCircle } from 'lucide-react';
import { ScanResponse } from '@/lib/api-types';
import { scanWebsite, getDemoScenario, ApiError } from '@/lib/api';
import { validateScanUrl } from '@/lib/url-validator';
import { BackendResults } from '@/components/results/backend-results';

function ScanPageContent() {
  const searchParams = useSearchParams();
  const urlParam = searchParams.get('url');
  const scenarioParam = searchParams.get('scenario');

  const [inputUrl, setInputUrl] = useState(urlParam || '');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanResult, setScanResult] = useState<ScanResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [helperMessage, setHelperMessage] = useState<string | null>(null);

  const scanStages = [
    '1/5: Fetching lender website & SSL certificate...',
    '2/5: Auditing same-domain transparency disclosures...',
    '3/5: Verifying claimed regulatory entity & domain association...',
    '4/5: Inspecting mobile permissions & high-pressure phrasing...',
    '5/5: Generating explainable risk verdict...',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputUrl(val);
    if (errorMessage) {
      setErrorMessage(null);
      setHelperMessage(null);
    }
  };

  const triggerScan = async (targetUrl: string, isDemo: boolean = false) => {
    // 1. Client-side URL validation BEFORE calling backend
    const validation = validateScanUrl(targetUrl);
    if (!validation.isValid) {
      setErrorMessage(validation.errorMessage || 'Invalid URL — Please enter a valid website URL.');
      setHelperMessage(validation.helperMessage || 'Example: https://example.com');
      setIsScanning(false);
      setScanResult(null);
      return;
    }

    const cleanUrl = validation.cleanUrl;
    setInputUrl(cleanUrl);

    setIsScanning(true);
    setScanResult(null);
    setErrorMessage(null);
    setHelperMessage(null);
    setScanStep(0);

    const timer = setInterval(() => {
      setScanStep((prev) => (prev < scanStages.length - 1 ? prev + 1 : prev));
    }, 300);

    try {
      const data = await scanWebsite(cleanUrl);
      setTimeout(() => {
        clearInterval(timer);
        setIsScanning(false);
        setScanResult(data);
      }, 1000);
    } catch (err: unknown) {
      clearInterval(timer);
      setIsScanning(false);
      if (err instanceof ApiError) {
        setErrorMessage(err.message);
        if (err.status === 400 || err.status === 422) {
          setHelperMessage('Example: https://example.com');
        }
      } else {
        setErrorMessage('LoanShield backend is unavailable. Start the backend and try again.');
      }
    }
  };

  useEffect(() => {
    if (urlParam) {
      triggerScan(urlParam, urlParam.includes('demo'));
    } else if (scenarioParam) {
      getDemoScenario(scenarioParam)
        .then((d) => {
          setInputUrl(d.url);
          triggerScan(d.url, true);
        })
        .catch(() => {
          setErrorMessage('LoanShield backend is unavailable. Start the backend and try again.');
        });
    }
  }, [urlParam, scenarioParam]);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 space-y-8 text-center">
      
      {/* Header */}
      <div className="space-y-3 max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Digital Lender Scanner
        </h1>
        <p className="text-slate-300 text-sm">
          Enter any lending website or application domain to audit regulatory standing, transparency, and risk signals.
        </p>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            triggerScan(inputUrl);
          }}
          className="flex flex-col sm:flex-row items-stretch gap-2 bg-slate-900 border border-slate-700 rounded-lg p-1.5 focus-within:border-blue-500 transition-colors text-left"
        >
          <div className="flex-1 flex items-center pl-3">
            <Globe className="h-4 w-4 text-slate-400 shrink-0 mr-2.5" />
            <input
              type="text"
              value={inputUrl}
              onChange={handleInputChange}
              placeholder="Paste lender URL (e.g. https://...)"
              className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none font-mono"
            />
            {inputUrl && (
              <button
                type="button"
                onClick={() => {
                  setInputUrl('');
                  setScanResult(null);
                  setErrorMessage(null);
                  setHelperMessage(null);
                }}
                className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={!inputUrl.trim() || isScanning}
            className="flex items-center justify-center gap-2 rounded-md bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-50 disabled:pointer-events-none shrink-0"
          >
            {isScanning ? <span>Scanning...</span> : <span>Scan URL</span>}
          </button>
        </form>

        {/* Quick Demo Links */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 pt-1">
          <span>Try sample:</span>
          <button
            type="button"
            onClick={() => {
              setInputUrl('https://quickrupee.demo');
              triggerScan('https://quickrupee.demo', true);
            }}
            className="text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 px-2.5 py-1 rounded transition-colors"
          >
            QuickRupee (High Risk Demo)
          </button>
          <button
            type="button"
            onClick={() => {
              setInputUrl('https://verified-demo.loanshield.local');
              triggerScan('https://verified-demo.loanshield.local', true);
            }}
            className="text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 px-2.5 py-1 rounded transition-colors"
          >
            Demo Cooperative (Verified Demo)
          </button>
        </div>
      </div>

      {/* Progress Animation */}
      {isScanning && (
        <div className="mx-auto max-w-xl animate-in fade-in duration-150">
          <div className="rounded-lg bg-slate-900 border border-slate-800 p-6 space-y-4 text-center">
            <div className="text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider">
              Investigation In Progress
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
        </div>
      )}

      {/* User-Friendly Error / Validation Message */}
      {errorMessage && !isScanning && (
        <div className="mx-auto max-w-xl animate-in fade-in duration-150">
          <div className="rounded-lg bg-rose-950/40 border border-rose-800/60 p-4 text-center space-y-1.5">
            <div className="flex items-center justify-center gap-2 text-rose-300 font-semibold text-sm">
              <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            {helperMessage && (
              <p className="text-xs text-slate-400 font-mono">
                {helperMessage}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Results View */}
      {scanResult && !isScanning && (
        <div className="max-w-4xl mx-auto">
          <BackendResults data={scanResult} isDemo={inputUrl.includes('demo')} />
        </div>
      )}

    </div>
  );
}

export default function ScanPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center text-sm text-slate-400">
          Loading Scanner...
        </div>
      }
    >
      <ScanPageContent />
    </Suspense>
  );
}
