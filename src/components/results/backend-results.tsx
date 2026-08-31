'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  ShieldCheck,
  Globe,
  FileCheck2,
  Smartphone,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Info,
  Layers,
  Database,
  Building2,
  Volume2,
  Square,
  Play,
  Shield
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

  // Audio Speech Synthesis State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'en' | 'hi'>('en');
  const [speechSupported, setSpeechSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSpeechSupported(false);
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Standardized single recommendation text strictly following rules
  const getRecommendation = (level: ScanResponse['risk_level']): string => {
    switch (level) {
      case 'HIGH_RISK':
        return 'High Risk — Do not proceed or share personal, banking, or OTP details.';
      case 'CAUTION':
        return 'Medium Risk — Proceed with caution and independently verify the lender and loan terms before sharing sensitive information.';
      case 'LOWER_RISK':
      default:
        return 'Low Risk — You may proceed, but verify the loan terms and lender details before sharing sensitive information.';
    }
  };

  const recommendationMessage = getRecommendation(data.risk_level);

  // Verdict Theme Helpers
  const getTheme = (level: ScanResponse['risk_level']) => {
    switch (level) {
      case 'HIGH_RISK':
        return {
          label: 'HIGH RISK',
          icon: ShieldAlert,
          badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
          scoreColor: 'text-rose-600',
          cardBorder: 'border-rose-200 bg-white',
          recBg: 'bg-rose-50 border-rose-200 text-rose-950',
          recIconColor: 'text-rose-600',
        };
      case 'CAUTION':
        return {
          label: 'MEDIUM RISK',
          icon: AlertTriangle,
          badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
          scoreColor: 'text-amber-600',
          cardBorder: 'border-amber-200 bg-white',
          recBg: 'bg-amber-50 border-amber-200 text-amber-950',
          recIconColor: 'text-amber-600',
        };
      case 'LOWER_RISK':
      default:
        return {
          label: 'LOW RISK',
          icon: ShieldCheck,
          badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          scoreColor: 'text-emerald-600',
          cardBorder: 'border-emerald-200 bg-white',
          recBg: 'bg-emerald-50 border-emerald-200 text-emerald-950',
          recIconColor: 'text-emerald-600',
        };
    }
  };

  const theme = getTheme(data.risk_level);
  const VerdictIcon = theme.icon;
  const targetTitle = data.identity.claimed_lender || data.categories.website.title || data.categories.digital.domain;

  // Construct Dynamic Speech Text strictly using Credence branding
  const getSpeechScript = (lang: 'en' | 'hi') => {
    const riskLabelEn = data.risk_level === 'HIGH_RISK' ? 'High Risk' : (data.risk_level === 'CAUTION' ? 'Medium Risk' : 'Low Risk');
    const riskLabelHi = data.risk_level === 'HIGH_RISK' ? 'उच्च जोखिम (हाई रिस्क)' : (data.risk_level === 'CAUTION' ? 'मध्यम जोखिम (मीडियम रिस्क)' : 'कम जोखिम (लो रिस्क)');
    
    // Top reasons
    const topSignals = data.signals.slice(0, 3);
    const reasonsEn = topSignals.length > 0
      ? `Primary reasons: ${topSignals.map((s) => s.explanation).join('. ')}.`
      : 'No suspicious indicators detected. Digital identity and transparency disclosures were verified.';

    if (lang === 'hi') {
      let hiRec = '';
      if (data.risk_level === 'HIGH_RISK') {
        hiRec = 'उच्च जोखिम — आगे न बढ़ें और अपनी व्यक्तिगत, बैंकिंग या ओटीपी जानकारी साझा न करें।';
      } else if (data.risk_level === 'CAUTION') {
        hiRec = 'मध्यम जोखिम — सावधानी से आगे बढ़ें और संवेदनशील जानकारी साझा करने से पहले ऋणदाता और ऋण शर्तों की स्वतंत्र रूप से पुष्टि करें।';
      } else {
        hiRec = 'कम जोखिम — आप आगे बढ़ सकते हैं, लेकिन संवेदनशील जानकारी साझा करने से पहले ऋण शर्तों और ऋणदाता विवरण की पुष्टि करें।';
      }

      return `क्रीडेंस सुरक्षा रिपोर्ट। लक्ष्य: ${targetTitle}। जोखिम स्तर: ${riskLabelHi}। रिस्क स्कोर: 100 में से ${data.risk_score}। सलाह: ${hiRec}`;
    }

    return `Credence Security Assessment for ${targetTitle}. Risk Level: ${riskLabelEn}. Risk Score: ${data.risk_score} out of 100. ${reasonsEn} Recommendation: ${recommendationMessage}`;
  };

  const handleSpeakToggle = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const script = getSpeechScript(selectedLang);
    const utterance = new SpeechSynthesisUtterance(script);
    utteranceRef.current = utterance;

    utterance.lang = selectedLang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = selectedLang === 'hi' ? 0.95 : 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    if (selectedLang === 'hi') {
      const hindiVoice = voices.find((v) => v.lang.includes('hi') || v.name.toLowerCase().includes('hindi'));
      if (hindiVoice) utterance.voice = hindiVoice;
    } else {
      const engVoice = voices.find((v) => v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en-US'));
      if (engVoice) utterance.voice = engVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleLanguageChange = (lang: 'en' | 'hi') => {
    setSelectedLang(lang);
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', `credence-scan-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. IMMEDIATE VERDICT + SCORE + SINGLE RECOMMENDATION */}
      <div className={cn('rounded-2xl border p-6 sm:p-7 text-left space-y-5 shadow-sm', theme.cardBorder)}>
        
        {/* Top Header: Badge, Target Domain, Score */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={cn('inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold border', theme.badgeBg)}>
                <VerdictIcon className="h-4 w-4" />
                <span>{theme.label}</span>
              </span>
              {isDemo && (
                <span className="text-[11px] font-mono font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  Demo Fixture
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {targetTitle}
            </h2>
            <div className="text-xs text-slate-500 font-mono">
              {data.url}
            </div>
          </div>

          {/* Score Box */}
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 px-5 py-3 rounded-xl shrink-0 shadow-inner">
            <div>
              <div className={cn('text-3xl font-black font-mono', theme.scoreColor)}>
                {data.risk_score}
                <span className="text-xs text-slate-400 font-normal"> / 100</span>
              </div>
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Risk Score
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="text-xs text-slate-600 space-y-0.5">
              <div>Evidence: <strong className="text-slate-900">{data.evidence_strength}</strong></div>
              <div>Signals: <strong className="text-slate-900">{data.signals.length}</strong></div>
            </div>
          </div>
        </div>

        {/* SINGLE CONCISE RECOMMENDATION BOX */}
        <div className={cn('rounded-xl border p-4 flex items-start gap-3 shadow-sm', theme.recBg)}>
          <VerdictIcon className={cn('h-5 w-5 shrink-0 mt-0.5', theme.recIconColor)} />
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 block font-mono">
              Credence Safety Recommendation
            </span>
            <p className="text-sm font-bold leading-relaxed text-slate-900">
              {recommendationMessage}
            </p>
          </div>
        </div>

        {/* Quick Meta Footer with Export */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px]">Domain: <strong className="text-slate-700">{data.categories.digital.domain}</strong></span>
            <span>•</span>
            <span className="font-mono text-[11px]">SSL: <strong className={data.categories.digital.https ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>{data.categories.digital.https ? 'HTTPS Encrypted' : 'Insecure'}</strong></span>
          </div>

          <button
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-1.5 text-xs text-slate-700 shrink-0 font-mono font-medium transition-colors shadow-sm"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export JSON</span>
          </button>
        </div>

      </div>

      {/* 2. 🔊 LISTEN TO YOUR RESULT CARD */}
      {speechSupported && (
        <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4 sm:p-5 text-left space-y-3 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            
            {/* Audio Header */}
            <div className="flex items-center gap-3">
              <div className={cn(
                'h-9 w-9 rounded-xl flex items-center justify-center border transition-colors shadow-sm',
                isSpeaking ? 'bg-blue-600 text-white border-blue-600 animate-pulse' : 'bg-white border-blue-200 text-blue-600'
              )}>
                <Volume2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>Listen to Risk Assessment</span>
                  {isSpeaking && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-600 text-white animate-pulse">
                      Playing Audio...
                    </span>
                  )}
                </h3>
                <p className="text-xs text-slate-600">
                  Hear the verdict and recommendation spoken aloud via Web Speech API.
                </p>
              </div>
            </div>

            {/* Language & Play Controls */}
            <div className="flex items-center gap-2 shrink-0">
              
              {/* Language Selector */}
              <div className="flex items-center rounded-xl bg-white border border-blue-200 p-0.5 text-xs font-medium shadow-sm">
                <button
                  type="button"
                  onClick={() => handleLanguageChange('en')}
                  className={cn(
                    'px-3 py-1 rounded-lg transition-colors font-semibold',
                    selectedLang === 'en' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('hi')}
                  className={cn(
                    'px-3 py-1 rounded-lg transition-colors font-semibold',
                    selectedLang === 'hi' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  हिन्दी (Hindi)
                </button>
              </div>

              {/* Play / Stop Button */}
              <button
                type="button"
                onClick={handleSpeakToggle}
                className={cn(
                  'flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all text-white shadow-sm',
                  isSpeaking ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'
                )}
              >
                {isSpeaking ? (
                  <>
                    <Square className="h-3.5 w-3.5 fill-current" />
                    <span>Stop</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Play Audio</span>
                  </>
                )}
              </button>

            </div>
          </div>
        </div>
      )}

      {/* 3. 🔍 PROMINENT "WHY THIS VERDICT?" EVIDENCE CARD */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 text-left space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600">
              <Info className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Why This Verdict?</h3>
              <p className="text-xs text-slate-500">Key evidence signals evaluated by the Credence risk engine.</p>
            </div>
          </div>

          <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
            {data.signals.length} {data.signals.length === 1 ? 'Signal' : 'Signals'} Detected
          </span>
        </div>

        {/* Signals List or Positive Evidence List */}
        {data.signals.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="rounded-xl bg-emerald-50/70 border border-emerald-200 p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Verified Entity Identity</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Official registry record or legitimate domain match confirmed without lookalike patterns.
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50/70 border border-emerald-200 p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Transparency Disclosures</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Privacy policy, terms of service, and grievance redressal mechanisms found on same domain.
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50/70 border border-emerald-200 p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Clean Digital Footprint</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Encrypted HTTPS active, zero predatory language, and no suspicious threat intelligence records.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {data.signals.slice(0, 4).map((sig, idx) => {
              const isHigh = sig.severity === 'HIGH';
              const isMed = sig.severity === 'MEDIUM';

              return (
                <div
                  key={idx}
                  className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 sm:p-4 space-y-2 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={cn(
                        'px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border shrink-0',
                        isHigh ? 'bg-rose-100 text-rose-800 border-rose-300' :
                        isMed ? 'bg-amber-100 text-amber-800 border-amber-300' :
                        'bg-slate-200 text-slate-800 border-slate-300'
                      )}>
                        {sig.severity}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">
                        {sig.name}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {sig.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. STRUCTURED FORENSIC DETAILS & TABS */}
      <div className="space-y-4 pt-2">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 overflow-x-auto">
          {[
            { id: 'signals', label: 'All Evidence Signals', count: data.signals.length },
            { id: 'identity', label: 'Claim vs Reality' },
            { id: 'reputation', label: 'Reputation & Threat Intel', highlight: Boolean(data.categories.reputation?.threat_record || data.categories.reputation?.brand_impersonation) },
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
                  'flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all shadow-sm',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                )}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={cn('rounded px-1.5 py-0.2 text-[10px] font-mono', isActive ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-700')}>
                    {tab.count}
                  </span>
                )}
                {tab.highlight && (
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: ALL EVIDENCE SIGNALS */}
        {activeTab === 'signals' && (
          <div className="space-y-3">
            {data.signals.length === 0 ? (
              <div className="rounded-2xl bg-white border border-slate-200 p-6 text-center space-y-1 shadow-sm">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">No Suspicious Signals Detected</h4>
                <p className="text-xs text-slate-500">Available evidence did not reveal warning signals for this target.</p>
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
                    className="rounded-xl border border-slate-200 bg-white overflow-hidden text-left shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedSignal(isExpanded ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left gap-3 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={cn(
                          'px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border shrink-0',
                          isHigh ? 'bg-rose-100 text-rose-800 border-rose-300' :
                          isMed ? 'bg-amber-100 text-amber-800 border-amber-300' :
                          'bg-slate-200 text-slate-800 border-slate-300'
                        )}>
                          {sig.severity}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {sig.name}
                        </h4>
                      </div>

                      <div className="flex items-center gap-3 text-slate-500 text-xs shrink-0">
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-slate-100 bg-slate-50/70 p-4 space-y-3.5 text-xs">
                        
                        {/* WHY IT MATTERS - Human explanation */}
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                            Why this matters:
                          </span>
                          <p className="text-slate-800 leading-relaxed font-medium">
                            {sig.explanation}
                          </p>
                        </div>

                        {/* FORMATTED EVIDENCE BREAKDOWN */}
                        <div className="rounded-xl bg-white border border-slate-200 p-3.5 space-y-2 shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase text-blue-600 font-bold flex items-center gap-1">
                              <Layers className="h-3.5 w-3.5" />
                              <span>Forensic Evidence Breakdown:</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => setShowRawJson((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                              className="text-[10px] font-mono text-slate-500 hover:text-slate-800 underline"
                            >
                              {isJsonVisible ? 'Hide Raw JSON' : 'Show Raw JSON'}
                            </button>
                          </div>

                          {/* Structured Key-Value Presentation */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-slate-700">
                            {Object.entries(sig.evidence)
                              .filter(([k]) => typeof sig.evidence[k] === 'string' || typeof sig.evidence[k] === 'number' || typeof sig.evidence[k] === 'boolean')
                              .map(([k, v]) => (
                                <div key={k} className="flex flex-col bg-slate-50 rounded-lg p-2 border border-slate-200">
                                  <span className="text-[10px] uppercase text-slate-500 font-mono font-bold">
                                    {k.replace(/_/g, ' ')}
                                  </span>
                                  <span className="text-slate-900 font-semibold break-all">
                                    {String(v)}
                                  </span>
                                </div>
                              ))}
                          </div>

                          {/* Raw JSON Accordion for technical details */}
                          {isJsonVisible && (
                            <pre className="mt-2 p-2.5 rounded bg-slate-900 font-mono text-[11px] text-slate-200 overflow-x-auto whitespace-pre-wrap break-all border border-slate-800">
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
          <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4 text-left shadow-sm">
            <h3 className="text-sm font-bold text-slate-900">Identity & Association Audit</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">1. Claimed / Extracted Lender</span>
                <div className="font-bold text-slate-900">{data.identity.claimed_lender || 'None declared on page'}</div>
                <p className="text-slate-500 text-[11px]">Extracted from website branding and disclosures.</p>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">2. Registry Record Found</span>
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  {data.identity.lender_found ? (
                    <><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span className="text-emerald-800">Record Exists</span></>
                  ) : (
                    <><XCircle className="h-4 w-4 text-rose-600" /><span className="text-rose-800">No Record Found</span></>
                  )}
                </div>
                <p className="text-slate-500 text-[11px]">Checked against available lender database.</p>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">3. Association Verified</span>
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  {data.identity.association_verified ? (
                    <><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span className="text-emerald-800">Domain Association Verified</span></>
                  ) : (
                    <><XCircle className="h-4 w-4 text-rose-600" /><span className="text-rose-800">Association NOT Verified</span></>
                  )}
                </div>
                <p className="text-slate-500 text-[11px]">Verifies domain belongs to the claimed entity.</p>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">4. Domain Matching</span>
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  {data.identity.domain_match ? (
                    <><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span className="text-emerald-800">Matches Official Domain</span></>
                  ) : (
                    <><AlertTriangle className="h-4 w-4 text-amber-600" /><span className="text-amber-800">Domain Unlinked / Mismatch</span></>
                  )}
                </div>
                <p className="text-slate-500 text-[11px]">Target URL matches registered website.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB: REPUTATION & BRAND LAYER */}
        {activeTab === 'reputation' && (
          <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4 text-left text-xs shadow-sm">
            <h3 className="text-sm font-bold text-slate-900">Brand Impersonation & Historical Threat Intelligence</h3>

            <div className="rounded-xl bg-blue-50 border border-blue-200 p-3 text-slate-700 text-[11px]">
              <strong>Layer Architecture:</strong> Distinguishes <em>Live Website Observation</em> vs <em>External Threat Records</em>. {data.categories.reputation?.disclaimer}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Brand Impersonation Card */}
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-2">
                <span className="text-[10px] font-mono uppercase text-blue-600 font-bold flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5" />
                  <span>Brand Lookalike / Impersonation Audit:</span>
                </span>
                {data.categories.reputation?.brand_impersonation?.detected ? (
                  <div className="space-y-1 text-slate-800">
                    <div>Matched Brand: <strong className="text-slate-900">{data.categories.reputation.brand_impersonation.matched_brand}</strong></div>
                    <div>Official Domain: <code className="text-emerald-700 font-bold">{data.categories.reputation.brand_impersonation.expected_official_domain}</code></div>
                    <p className="text-rose-700 font-medium text-[11px] pt-1">
                      {data.categories.reputation.brand_impersonation.similarity_reason}
                    </p>
                  </div>
                ) : (
                  <p className="text-slate-500">No banking or NBFC brand impersonation detected in domain or subdomains.</p>
                )}
              </div>

              {/* Threat Intel Card */}
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-2">
                <span className="text-[10px] font-mono uppercase text-blue-600 font-bold flex items-center gap-1">
                  <Database className="h-3.5 w-3.5" />
                  <span>Historical Threat Record:</span>
                </span>
                {data.categories.reputation?.threat_record ? (
                  <div className="space-y-1 text-slate-800">
                    <div>Status: <span className="font-mono font-bold text-rose-700">{data.categories.reputation.threat_record.status}</span></div>
                    <div>Category: <span className="font-mono font-semibold">{data.categories.reputation.threat_record.category}</span></div>
                    <div>Source: <span>{data.categories.reputation.threat_record.source_type}</span></div>
                    <p className="text-slate-600 text-[11px] pt-1 leading-relaxed">
                      {data.categories.reputation.threat_record.description}
                    </p>
                  </div>
                ) : (
                  <p className="text-slate-500">No documented threat intelligence flags found for this target.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TRANSPARENCY AUDIT */}
        {activeTab === 'transparency' && (
          <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4 text-left text-xs shadow-sm">
            <h3 className="text-sm font-bold text-slate-900">Transparency Signals Audit</h3>
            
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
                  <div key={item.key} className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{item.label}</span>
                      {isFound ? (
                        <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Found
                        </span>
                      ) : (
                        <span className="text-[10px] text-rose-700 font-bold flex items-center gap-1">
                          <XCircle className="h-3.5 w-3.5 text-rose-600" /> Missing
                        </span>
                      )}
                    </div>
                    {detail?.found_on && (
                      <p className="text-slate-500 text-[11px] font-mono truncate">
                        Source: {detail.found_on}
                      </p>
                    )}
                    {detail?.matched_pattern && (
                      <p className="text-slate-600 text-[11px]">
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
          <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4 text-left text-xs shadow-sm">
            <h3 className="text-sm font-bold text-slate-900">Regulatory Verification</h3>

            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-amber-900 text-[11px]">
              <strong>Registry Notice:</strong> Synthetic demo data — not official RBI data. Credence never certifies lenders as &ldquo;RBI approved&rdquo; merely because a name exists.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Regulatory Claims Detected</span>
                {data.categories.regulatory.claims.length > 0 ? (
                  <ul className="list-disc list-inside text-slate-800 space-y-0.5">
                    {data.categories.regulatory.claims.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500">No explicit regulatory keywords found.</p>
                )}
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">Matched Registry Entity</span>
                {data.categories.regulatory.record ? (
                  <div className="font-mono text-slate-800 space-y-0.5">
                    <div>Name: <strong className="text-slate-900">{data.categories.regulatory.record.entity_name}</strong></div>
                    <div>Domain: {data.categories.regulatory.record.domain}</div>
                    <div>DLA Association: {data.categories.regulatory.record.rbi_dla_association}</div>
                  </div>
                ) : (
                  <p className="text-slate-500">No registered lender entity matched.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: DIGITAL FORENSICS */}
        {activeTab === 'forensics' && (
          <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4 text-left text-xs shadow-sm">
            <h3 className="text-sm font-bold text-slate-900">Digital Forensics</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Domain</span>
                <div className="font-bold text-slate-900 truncate">{data.categories.digital.domain}</div>
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">HTTPS</span>
                <div className={cn('font-bold', data.categories.digital.https ? 'text-emerald-700' : 'text-rose-700')}>
                  {data.categories.digital.https ? 'Encrypted (HTTPS)' : 'Insecure (HTTP)'}
                </div>
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Domain Age</span>
                <div className="font-bold text-slate-900">{data.categories.digital.domain_age_status}</div>
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Retrieval</span>
                <div className="font-bold text-slate-900">{data.categories.website.retrieved ? '200 OK' : 'Failed'}</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PERMISSIONS & LANGUAGE */}
        {activeTab === 'permissions' && (
          <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4 text-left text-xs shadow-sm">
            <h3 className="text-sm font-bold text-slate-900">Mobile Permissions & Language Patterns</h3>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block mb-1.5">
                  Mobile Runtime Permissions Findings:
                </span>
                {data.categories.permissions?.findings?.length === 0 ? (
                  <p className="text-slate-500">No disproportionate runtime permissions declared.</p>
                ) : (
                  <div className="space-y-2">
                    {data.categories.permissions.findings.map((f, i) => (
                      <div key={i} className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-slate-900 font-mono uppercase">{f.permission}</strong>
                          <span className={cn('text-[10px] font-mono font-bold px-2 py-0.5 rounded', f.severity === 'HIGH' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800')}>
                            {f.severity}
                          </span>
                        </div>
                        <p className="text-slate-600">{f.explanation}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block mb-1.5">
                  Language & Promotional Pressure Patterns:
                </span>
                {data.categories.language?.detected_patterns?.length === 0 ? (
                  <p className="text-slate-500">No aggressive predatory phrasing detected.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {data.categories.language.detected_patterns.map((p, i) => (
                      <span key={i} className="rounded-lg bg-rose-50 border border-rose-200 px-2.5 py-1 text-rose-800 text-xs font-mono font-semibold">
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
      <div className="text-center text-[11px] text-slate-500 pt-2">
        <span>{data.disclaimer}</span>
      </div>

    </div>
  );
}
