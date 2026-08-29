export type RiskCategory =
  | 'REGULATORY'
  | 'IDENTITY'
  | 'DIGITAL'
  | 'PERMISSIONS'
  | 'LANGUAGE'
  | 'REPUTATION';

export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO' | 'POSITIVE';

export type NodeStatus = 'VERIFIED' | 'PARTIAL' | 'UNVERIFIED' | 'CONFLICT';

export type RiskVerdict = 'LOW_RISK' | 'CAUTION' | 'HIGH_RISK';

export interface RiskSignal {
  id: string;
  category: RiskCategory;
  title: string;
  description: string;
  severity: SeverityLevel;
  scoreImpact: number; // 0 to 100 contribution scale
  evidence: string;
  source: string;
  confidence: number; // 0 to 100%
}

export interface ClaimVsRealityItem {
  id: string;
  claim: string;
  reality: string;
  status: 'VERIFIED' | 'MISMATCH' | 'UNVERIFIABLE' | 'DECEPTIVE';
  category: RiskCategory;
  explanation: string;
}

export interface GraphNode {
  id: string;
  label: string;
  sublabel?: string;
  type: 'USER_URL' | 'DOMAIN' | 'WEBSITE' | 'CLAIMED_LENDER' | 'REGULATED_ENTITY' | 'APP' | 'DEVELOPER';
  status: NodeStatus;
  details: string;
}

export interface GraphEdge {
  from: string;
  to: string;
  label: string;
  status: NodeStatus;
  notes?: string;
}

export interface IdentityGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  summary: string;
}

export interface DigitalForensicsData {
  domainAge: {
    days: number;
    formatted: string;
    registeredDate: string;
    expiresDate: string;
    status: 'TRUSTED' | 'SUSPICIOUS' | 'VERY_NEW';
  };
  ssl: {
    valid: boolean;
    issuer: string;
    type: 'EV' | 'OV' | 'DV' | 'SELF_SIGNED' | 'NONE';
    expiryDate: string;
  };
  registrar: {
    name: string;
    country: string;
    privacyProtected: boolean;
    whoisAbuseEmail?: string;
  };
  websiteIdentity: {
    claimedName: string;
    registeredCompanyName?: string;
    legalEntityType?: string;
  };
  contactInfo: {
    email: string;
    emailType: 'CORPORATE' | 'FREE_WEBMAIL' | 'DISPOSABLE';
    phone: string;
    tollFreeAvailable: boolean;
  };
  physicalAddress: {
    claimedAddress: string;
    verifiedOnOfficialRegistry: boolean;
    isVirtualOfficeOrCoworking: boolean;
    coordinates?: { lat: number; lng: number };
  };
  governance: {
    privacyPolicyFound: boolean;
    privacyPolicyValidUrl: boolean;
    termsFound: boolean;
    grievanceOfficerListed: boolean;
    grievanceOfficerContact?: string;
    rbiOmbudsmanDetailsListed: boolean;
    fairPracticesCodeListed: boolean;
  };
  technical: {
    hostingProvider: string;
    serverCountry: string;
    dnsSecEnabled: boolean;
  };
}

export interface PermissionItem {
  name: string;
  code: string;
  requested: boolean;
  expectedNecessity: 'ESSENTIAL' | 'OPTIONAL' | 'UNNECESSARY' | 'PROHIBITED';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  explanation: string;
}

export interface LanguagePatternItem {
  pattern: string;
  foundText: string;
  location: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  explanation: string;
}

export interface CategoryBreakdown {
  category: RiskCategory;
  weight: number; // e.g., 0.25
  rawScore: number; // 0-100 where 100 is maximum risk
  weightedScore: number;
  status: 'SAFE' | 'CAUTION' | 'DANGER';
  signalCount: number;
}

export interface LenderProfile {
  id: string;
  name: string;
  url: string;
  logoText?: string;
  description: string;
  claimedRegistrationNo?: string;
  claimedParentCompany?: string;
  appPackageName?: string;
  forensics: DigitalForensicsData;
  permissions: PermissionItem[];
  languagePatterns: LanguagePatternItem[];
  claimsVsReality: ClaimVsRealityItem[];
  identityGraph: IdentityGraphData;
  rawSignals: RiskSignal[];
  reputationNotes: string[];
}

export interface RiskAssessment {
  scanId: string;
  targetUrl: string;
  timestamp: string;
  lenderName: string;
  verdict: RiskVerdict;
  riskScore: number; // 0-100 (0-29 Low, 30-59 Caution, 60-100 High)
  confidence: number; // 0-100%
  verdictTitle: string;
  verdictSummary: string;
  recommendation: string;
  recommendationChecklist: string[];
  categoryBreakdown: Record<RiskCategory, CategoryBreakdown>;
  signals: RiskSignal[];
  claimsVsReality: ClaimVsRealityItem[];
  identityGraph: IdentityGraphData;
  forensics: DigitalForensicsData;
  permissions: PermissionItem[];
  languagePatterns: LanguagePatternItem[];
  reputationSummary: string;
  disclaimer: string;
}

export interface ScanInput {
  url?: string;
  scenarioId?: 'high-risk' | 'caution' | 'low-risk' | string;
  customData?: Partial<LenderProfile>;
}
