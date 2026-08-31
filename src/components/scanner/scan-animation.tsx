'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  Loader2,
  ArrowRight,
  Terminal,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScanAnimationProps {
  targetUrl: string;
  scenarioId?: string;
  onComplete?: () => void;
}

const INVESTIGATION_STEPS = [
  { id: 1, label: 'Fetching lender identity...', icon: Search, detail: 'Extracting declared company name, registration number, and DNS host.' },
  { id: 2, label: 'Checking regulatory signals...', icon: FileCheck2, detail: 'Cross-referencing RBI Master Directory and MCA corporate database.' },
  { id: 3, label: 'Mapping claimed lender relationships...', icon: Network, detail: 'Building multi-entity identity graph to verify digital association.' },
  { id: 4, label: 'Inspecting digital footprint...', icon: Globe, detail: 'Auditing WHOIS creation date, SSL certificates, and hosting location.' },
  { id: 5, label: 'Analyzing permissions...', icon: Smartphone, detail: 'Decompiling APK manifest for contacts, SMS, and storage access.' },
  { id: 6, label: 'Analyzing website language...', icon: MessageSquareWarning, detail: 'Running NLP on urgency triggers, guaranteed loan promises, and fee demands.' },
  { id: 7, label: 'Calculating trust signals...', icon: Cpu, detail: 'Weighing risk factors across Regulatory (25%), Identity (25%), Digital (15%), Permissions (15%), Language (10%), Reputation (10%).' },
  { id: 8, label: 'Generating explainable verdict...', icon: Shield, detail: 'Synthesizing evidence cards, claim vs reality matrices, and consumer recommendations.' }
];

export function ScanAnimation({ targetUrl, scenarioId, onComplete }: ScanAnimationProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const router = useRouter();

  // Determine scan target ID
  let targetId = scenarioId || 'high-risk';
  if (!scenarioId) {
    const lower = targetUrl.toLowerCase();
    if (lower.includes('speedy') || lower.includes('quickloan') || lower.includes('high')) {
      targetId = 'high-risk';
    } else if (lower.includes('flexi') || lower.includes('caution')) {
      targetId = 'caution';
    } else if (lower.includes('tata') || lower.includes('low')) {
      targetId = 'low-risk';
    } else {
      targetId = encodeURIComponent(targetUrl.replace(/^(?:https?:\/\/)?(?:www\.)?/, '').split('/')[0]);
    }
  }

  useEffect(() => {
    const stepDuration = 700; // ms per step
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < INVESTIGATION_STEPS.length - 1) {
          const nextIndex = prev + 1;
          // Add telemetry log
          const step = INVESTIGATION_STEPS[nextIndex];
          setLogs((prevLogs) => [
            ...prevLogs.slice(-6),
            `[SENTINEL-LOG ${new Date().toLocaleTimeString()}] ${step.label} => ${step.detail.slice(0, 60)}...`
          ]);
          return nextIndex;
        } else {
          clearInterval(timer);
          setIsDone(true);
          if (onComplete) onComplete();
          return prev;
        }
      });
    }, stepDuration);

    // Initial log
    setLogs([
      `[SENTINEL-LOG ${new Date().toLocaleTimeString()}] Initializing Credence Forensic Scanner for ${targetUrl}`,
      `[SENTINEL-LOG ${new Date().toLocaleTimeString()}] Target resolved: ${targetUrl}`
    ]);

    return () => clearInterval(timer);
  }, [targetUrl, onComplete]);

  // Auto redirect after completion
  useEffect(() => {
    if (isDone) {
      const redirectTimer = setTimeout(() => {
        router.push(`/results/${targetId}?url=${encodeURIComponent(targetUrl)}`);
      }, 1200);
      return () => clearTimeout(redirectTimer);
    }
  }, [isDone, targetId, targetUrl, router]);

  const progressPercent = Math.round(((currentStepIndex + 1) / INVESTIGATION_STEPS.length) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      
      {/* Central Radar & Target Header */}
      <div className="relative overflow-hidden rounded-2xl bg-[#090e1c] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        
        {/* Ambient scanning light */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          
          {/* Animated Investigation Badge */}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-900 border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.25)]">
            <div className="absolute inset-0 rounded-2xl border border-cyan-400/40 animate-ping opacity-30" />
            <Shield className="h-10 w-10 text-cyan-400 animate-pulse" />
          </div>

          <div className="space-y-1 max-w-lg">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-950/60 border border-cyan-500/40 px-3 py-1 text-xs font-mono text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span>CREDENCE MULTI-VECTOR INVESTIGATION</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Investigating Target Entity
            </h2>
            <p className="text-sm font-mono text-cyan-300/80 break-all">
              {targetUrl}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md space-y-2 pt-2">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>Investigation Progress</span>
              <span className="text-cyan-400 font-bold">{progressPercent}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800 border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

        </div>

      </div>

      {/* Investigation Pipeline Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {INVESTIGATION_STEPS.map((step, idx) => {
          const isCurrent = idx === currentStepIndex;
          const isPassed = idx < currentStepIndex || isDone;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={cn(
                'flex items-start gap-3 rounded-xl p-3.5 border transition-all duration-200',
                isPassed
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                  : isCurrent
                  ? 'bg-cyan-950/30 border-cyan-500/60 text-white shadow-[0_0_20px_rgba(6,182,212,0.2)] ring-1 ring-cyan-400/40'
                  : 'bg-slate-900/40 border-slate-800/60 text-slate-400 opacity-60'
              )}
            >
              <div className="shrink-0 mt-0.5">
                {isPassed ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="h-5 w-5 text-cyan-400 animate-spin" />
                ) : (
                  <Icon className="h-5 w-5 text-slate-400" />
                )}
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">0{step.id}</span>
                  <span className={cn(
                    'text-xs font-bold',
                    isPassed ? 'text-emerald-300' : isCurrent ? 'text-cyan-300' : 'text-slate-400'
                  )}>
                    {step.label}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {step.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Sentinel Console / Telemetry Stream */}
      <div className="rounded-xl bg-[#03060d] border border-slate-800 p-4 font-mono text-xs text-slate-300 space-y-2">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-cyan-400" />
            <span>CREDENCE FORENSIC TELEMETRY STREAM</span>
          </div>
          <span className="text-emerald-400">LIVE FEED</span>
        </div>
        <div className="space-y-1.5 min-h-[90px]">
          {logs.map((log, i) => (
            <div key={i} className="text-[11px] text-slate-400 flex items-start gap-2">
              <span className="text-cyan-500 shrink-0">›</span>
              <span className="font-mono">{log}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Immediate Jump Button */}
      {isDone && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => router.push(`/results/${targetId}?url=${encodeURIComponent(targetUrl)}`)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-emerald-500/20 hover:from-emerald-400 hover:to-cyan-400 transition-all hover:scale-105"
          >
            <span>View Full Investigation Report</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

    </div>
  );
}
