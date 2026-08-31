import { ScanResponse } from './api-types';

export interface ScanHistoryRecord {
  id: string;
  url: string;
  domain: string;
  lenderName: string;
  claimedEntity: string;
  category: string;
  score: number;
  verdict: 'HIGH_RISK' | 'CAUTION' | 'LOWER_RISK';
  flag: string;
  timestamp: number;
  signals: string[];
}

const STORAGE_KEY = 'credence_scan_history_records';

export function getScanHistory(): ScanHistoryRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveScanToHistory(data: ScanResponse): ScanHistoryRecord {
  if (typeof window === 'undefined') {
    return {
      id: String(Date.now()),
      url: data.url,
      domain: data.categories.digital.domain || 'unknown',
      lenderName: data.identity.claimed_lender || data.categories.website.title || data.categories.digital.domain,
      claimedEntity: data.identity.claimed_lender || 'Unspecified Entity',
      category: data.identity.lender_found ? 'Registered Entity' : 'Unregistered / Direct URL',
      score: data.risk_score,
      verdict: data.risk_level,
      flag: data.signals.length > 0 ? data.signals[0].name : 'No suspicious risk indicators detected',
      timestamp: Date.now(),
      signals: data.signals.map((s) => s.name),
    };
  }

  const existing = getScanHistory();

  const domain = data.categories.digital.domain || data.url.replace(/^https?:\/\//i, '').split('/')[0];
  const lenderName = data.identity.claimed_lender || data.categories.website.title || domain;
  const claimedEntity = data.identity.claimed_lender || 'Unspecified Entity';
  const category = data.identity.lender_found 
    ? (data.categories.regulatory.record ? 'Regulated NBFC' : 'Registry Match') 
    : (data.risk_level === 'HIGH_RISK' ? 'Impersonator / Unverified' : 'Digital Platform');

  const primaryFlag = data.signals.length > 0
    ? data.signals[0].name
    : (data.categories.digital.https ? 'Verified HTTPS + Clean Disclosures' : 'Basic Disclosures Present');

  const newRecord: ScanHistoryRecord = {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    url: data.url,
    domain,
    lenderName,
    claimedEntity,
    category,
    score: data.risk_score,
    verdict: data.risk_level,
    flag: primaryFlag,
    timestamp: Date.now(),
    signals: data.signals.map((s) => s.name),
  };

  // Prepend new record, keeping up to 100 items
  const updated = [newRecord, ...existing.filter((item) => item.url !== data.url || (Date.now() - item.timestamp > 60000))].slice(0, 100);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('credence_history_updated'));
  } catch (err) {
    console.error('Failed to persist scan history:', err);
  }

  return newRecord;
}

export function clearScanHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('credence_history_updated'));
  } catch (err) {
    console.error('Failed to clear scan history:', err);
  }
}

export function formatTimeAgo(timestamp: number): string {
  if (!timestamp) return 'Just now';
  const diffMs = Date.now() - timestamp;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 45) return 'Just now';
  if (diffMin === 1) return '1 min ago';
  if (diffMin < 60) return `${diffMin} mins ago`;
  if (diffHour === 1) return '1 hour ago';
  if (diffHour < 24) return `${diffHour} hours ago`;
  if (diffDay === 1) return 'Yesterday';
  if (diffDay < 7) return `${diffDay} days ago`;

  const date = new Date(timestamp);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export interface TelemetrySummary {
  totalScans: number;
  highRiskCount: number;
  cautionCount: number;
  verifiedCount: number;
  avgScore: number;
  highRiskPct: number;
  cautionPct: number;
  verifiedPct: number;
  topSignals: { name: string; count: number; freq: string; tag: string }[];
}

export function calculateTelemetryStats(history: ScanHistoryRecord[]): TelemetrySummary {
  const totalScans = history.length;
  if (totalScans === 0) {
    return {
      totalScans: 0,
      highRiskCount: 0,
      cautionCount: 0,
      verifiedCount: 0,
      avgScore: 0,
      highRiskPct: 0,
      cautionPct: 0,
      verifiedPct: 0,
      topSignals: [],
    };
  }

  const highRiskCount = history.filter((s) => s.verdict === 'HIGH_RISK').length;
  const cautionCount = history.filter((s) => s.verdict === 'CAUTION').length;
  const verifiedCount = history.filter((s) => s.verdict === 'LOWER_RISK').length;

  const totalScore = history.reduce((sum, s) => sum + s.score, 0);
  const avgScore = Number((totalScore / totalScans).toFixed(1));

  const highRiskPct = Math.round((highRiskCount / totalScans) * 100);
  const cautionPct = Math.round((cautionCount / totalScans) * 100);
  const verifiedPct = Math.round((verifiedCount / totalScans) * 100);

  // Aggregate signal frequencies
  const signalMap: Record<string, number> = {};
  history.forEach((record) => {
    record.signals.forEach((sig) => {
      signalMap[sig] = (signalMap[sig] || 0) + 1;
    });
  });

  const sortedSignals = Object.entries(signalMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => {
      let tag = 'FORENSICS';
      if (name.toLowerCase().includes('permission')) tag = 'PERMISSIONS';
      else if (name.toLowerCase().includes('domain') || name.toLowerCase().includes('ssl')) tag = 'DIGITAL';
      else if (name.toLowerCase().includes('rbi') || name.toLowerCase().includes('regist')) tag = 'REGULATORY';
      else if (name.toLowerCase().includes('fee') || name.toLowerCase().includes('claim')) tag = 'LANGUAGE';
      else if (name.toLowerCase().includes('brand') || name.toLowerCase().includes('impersonat')) tag = 'IDENTITY';

      return {
        name,
        count,
        freq: `${Math.round((count / totalScans) * 100)}%`,
        tag,
      };
    });

  return {
    totalScans,
    highRiskCount,
    cautionCount,
    verifiedCount,
    avgScore,
    highRiskPct,
    cautionPct,
    verifiedPct,
    topSignals: sortedSignals,
  };
}
