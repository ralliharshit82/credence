import {
  CategoryBreakdown,
  LenderProfile,
  RiskAssessment,
  RiskCategory,
  RiskSignal,
  RiskVerdict,
  ScanInput,
} from './types';
import { DEMO_SCENARIOS, HIGH_RISK_SCENARIO, CAUTION_SCENARIO, LOW_RISK_SCENARIO } from './scenarios';
import { generateHeuristicProfile } from './heuristics';

// Exact category weights per specifications
export const CATEGORY_WEIGHTS: Record<RiskCategory, number> = {
  REGULATORY: 0.25,
  IDENTITY: 0.25,
  DIGITAL: 0.15,
  PERMISSIONS: 0.15,
  LANGUAGE: 0.10,
  REPUTATION: 0.10,
};

const DISCLAIMER_TEXT =
  "Credence provides risk intelligence and does not make a legal determination of fraud. Users should independently verify financial entities before sharing personal information or making payments.";

/**
 * Calculates raw risk score (0-100) for a category based on its signals
 */
function calculateCategoryScore(category: RiskCategory, signals: RiskSignal[], profile: LenderProfile): number {
  const categorySignals = signals.filter(s => s.category === category);

  if (categorySignals.length === 0) {
    // If no explicit signals, derive from profile metrics
    switch (category) {
      case 'REGULATORY':
        return profile.forensics.governance.grievanceOfficerListed ? 10 : 60;
      case 'IDENTITY':
        return profile.forensics.websiteIdentity.legalEntityType?.includes('Unregistered') ? 85 : 15;
      case 'DIGITAL':
        return profile.forensics.domainAge.days < 30 ? 80 : profile.forensics.domainAge.days < 365 ? 40 : 10;
      case 'PERMISSIONS':
        const dangerousPerms = profile.permissions.filter(p => p.requested && (p.riskLevel === 'CRITICAL' || p.riskLevel === 'HIGH'));
        return dangerousPerms.length > 0 ? Math.min(95, dangerousPerms.length * 30) : 10;
      case 'LANGUAGE':
        const highRiskPhrases = profile.languagePatterns.filter(l => l.riskLevel === 'HIGH');
        return highRiskPhrases.length > 0 ? Math.min(90, highRiskPhrases.length * 35) : 15;
      case 'REPUTATION':
        return profile.reputationNotes.length > 2 ? 65 : 20;
      default:
        return 20;
    }
  }

  // Weight by severity and score impact
  let totalWeightedImpact = 0;
  let totalWeights = 0;

  for (const sig of categorySignals) {
    let weight = 1.0;
    if (sig.severity === 'CRITICAL') weight = 2.0;
    else if (sig.severity === 'HIGH') weight = 1.5;
    else if (sig.severity === 'MEDIUM') weight = 1.0;
    else if (sig.severity === 'LOW') weight = 0.6;
    else if (sig.severity === 'POSITIVE') weight = 1.0;

    totalWeightedImpact += sig.scoreImpact * weight;
    totalWeights += weight;
  }

  const raw = totalWeights > 0 ? totalWeightedImpact / totalWeights : 0;
  return Math.round(Math.min(100, Math.max(0, raw)));
}

/**
 * Calculates overall confidence (0-100%) based on inspectable signals
 */
function calculateConfidence(signals: RiskSignal[], profile: LenderProfile): number {
  if (signals.length === 0) return 82;

  const avgSignalConfidence = signals.reduce((acc, s) => acc + s.confidence, 0) / signals.length;
  const dataCompletenessBonus = profile.forensics.ssl.valid ? 5 : 0;
  const whoisBonus = profile.forensics.registrar.name ? 5 : 0;

  const totalConfidence = Math.round(avgSignalConfidence * 0.9 + dataCompletenessBonus + whoisBonus);
  return Math.min(99, Math.max(70, totalConfidence));
}

/**
 * Maps composite score to RiskVerdict
 * 0–29 = VERIFIED / LOWER RISK
 * 30–59 = UNVERIFIED / CAUTION
 * 60–100 = HIGH RISK
 */
export function getVerdictFromScore(score: number): RiskVerdict {
  if (score <= 29) return 'LOW_RISK';
  if (score <= 59) return 'CAUTION';
  return 'HIGH_RISK';
}

/**
 * Generates actionable recommendation and checklist based on verdict and profile
 */
function generateRecommendation(verdict: RiskVerdict, profile: LenderProfile): { recommendation: string; checklist: string[] } {
  switch (verdict) {
    case 'HIGH_RISK':
      return {
        recommendation:
          "DO NOT submit personal documents, bank details, or make any advance payments. The digital footprint indicates severe identity inconsistencies, predatory app permissions, and unverified regulatory claims.",
        checklist: [
          "Do not install sideloaded APK files from unofficial websites or SMS links.",
          "Never pay any 'processing fee', 'security deposit', or 'file charge' before loan disbursal.",
          "Check whether the lender is registered on the official Reserve Bank of India (RBI) list of regulated NBFCs.",
          "If you have already installed the app, revoke Contact and SMS permissions in device settings and uninstall immediately."
        ]
      };
    case 'CAUTION':
      return {
        recommendation:
          "Proceed with caution. This platform operates as an unverified loan lead broker or DSA without direct, transparent disclosures of its regulated underwriting NBFC partners.",
        checklist: [
          "Request the specific legal name and RBI registration number of the underwriting NBFC before signing.",
          "Carefully review the Key Fact Statement (KFS) including total APR, processing charges, and penalty fees.",
          "Be aware that submitting your phone number may lead to third-party telemarketing calls.",
          "Verify the physical office address and grievance redressal mechanism independently."
        ]
      };
    case 'LOW_RISK':
    default:
      return {
        recommendation:
          "Verified consistent digital identity. This lender is associated with an active, regulated financial institution with transparent fair practice disclosures.",
        checklist: [
          "Always confirm that the website URL matches the official domain listed on RBI or bank directories.",
          "Ensure you download mobile apps exclusively through official app stores (Google Play or Apple App Store).",
          "Review the Key Fact Statement (KFS) provided before consenting to the loan agreement.",
          "Reach out to the designated Grievance Officer in case of any loan servicing queries."
        ]
      };
  }
}

/**
 * Main entry point: deterministic risk assessment
 */
export function analyzeLender(input: ScanInput): RiskAssessment {
  let profile: LenderProfile;

  // 1. Resolve Profile from Scenario ID or Custom URL
  if (input.scenarioId && input.scenarioId in DEMO_SCENARIOS) {
    profile = DEMO_SCENARIOS[input.scenarioId as keyof typeof DEMO_SCENARIOS];
  } else if (input.url) {
    const lowerUrl = input.url.toLowerCase();
    if (lowerUrl.includes('speedyrupee') || lowerUrl.includes('quickloan.xyz') || lowerUrl.includes('high-risk')) {
      profile = HIGH_RISK_SCENARIO;
    } else if (lowerUrl.includes('flexicredit') || lowerUrl.includes('caution')) {
      profile = CAUTION_SCENARIO;
    } else if (lowerUrl.includes('tatadigital') || lowerUrl.includes('tatacapital') || lowerUrl.includes('low-risk')) {
      profile = LOW_RISK_SCENARIO;
    } else {
      profile = generateHeuristicProfile(input.url);
    }
  } else {
    // Default fallback to High Risk scenario for demonstration
    profile = HIGH_RISK_SCENARIO;
  }

  // 2. Calculate category breakdowns
  const categories: RiskCategory[] = ['REGULATORY', 'IDENTITY', 'DIGITAL', 'PERMISSIONS', 'LANGUAGE', 'REPUTATION'];
  const categoryBreakdown = {} as Record<RiskCategory, CategoryBreakdown>;

  let compositeScore = 0;

  for (const cat of categories) {
    const rawScore = calculateCategoryScore(cat, profile.rawSignals, profile);
    const weight = CATEGORY_WEIGHTS[cat];
    const weightedScore = rawScore * weight;
    compositeScore += weightedScore;

    const signalCount = profile.rawSignals.filter(s => s.category === cat).length;
    const status: 'SAFE' | 'CAUTION' | 'DANGER' = rawScore < 30 ? 'SAFE' : rawScore < 60 ? 'CAUTION' : 'DANGER';

    categoryBreakdown[cat] = {
      category: cat,
      weight,
      rawScore,
      weightedScore: Math.round(weightedScore * 10) / 10,
      status,
      signalCount: Math.max(1, signalCount)
    };
  }

  const roundedScore = Math.round(Math.min(100, Math.max(0, compositeScore)));
  const verdict = getVerdictFromScore(roundedScore);
  const confidence = calculateConfidence(profile.rawSignals, profile);
  const { recommendation, checklist } = generateRecommendation(verdict, profile);

  const verdictTitle =
    verdict === 'HIGH_RISK'
      ? 'High Risk / Severe Inconsistencies Detected'
      : verdict === 'CAUTION'
      ? 'Unverified / Exercise Caution'
      : 'Verified / Lower Risk Profile';

  const verdictSummary =
    verdict === 'HIGH_RISK'
      ? `Credence identified ${profile.rawSignals.filter(s => s.severity === 'CRITICAL' || s.severity === 'HIGH').length} critical risk signals including identity conflicts, excessive permission requests, and unverified regulatory claims for ${profile.name}.`
      : verdict === 'CAUTION'
      ? `Credence identified incomplete regulatory disclosures and intermediate lead-broker risk signals for ${profile.name}.`
      : `Credence verified that ${profile.name}'s digital footprint, corporate identity, and RBI regulatory standing form a consistent, trustworthy graph.`;

  return {
    scanId: profile.id,
    targetUrl: profile.url,
    timestamp: new Date().toISOString(),
    lenderName: profile.name,
    verdict,
    riskScore: roundedScore,
    confidence,
    verdictTitle,
    verdictSummary,
    recommendation,
    recommendationChecklist: checklist,
    categoryBreakdown,
    signals: profile.rawSignals,
    claimsVsReality: profile.claimsVsReality,
    identityGraph: profile.identityGraph,
    forensics: profile.forensics,
    permissions: profile.permissions,
    languagePatterns: profile.languagePatterns,
    reputationSummary: profile.reputationNotes.join(' '),
    disclaimer: DISCLAIMER_TEXT,
  };
}
