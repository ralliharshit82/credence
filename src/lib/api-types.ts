/**
 * TypeScript definitions matching the FastAPI backend schemas exactly.
 */

export type RiskLevel = 'LOWER_RISK' | 'CAUTION' | 'HIGH_RISK';
export type EvidenceStrength = 'LOW' | 'MEDIUM' | 'HIGH';
export type SignalSeverity = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Permissions {
  contacts?: boolean;
  sms?: boolean;
  call_logs?: boolean;
  storage?: boolean;
  gallery?: boolean;
  camera?: boolean;
  microphone?: boolean;
}

export interface ScanRequest {
  url: string;
}

export interface AppScanRequest extends ScanRequest {
  permissions?: Permissions;
  stated_purpose?: string;
}

export interface Signal {
  name: string;
  severity: SignalSeverity;
  score: number; // 0 to 1
  confidence?: number;
  explanation: string;
  evidence: Record<string, unknown>;
}

export interface IdentityResult {
  claimed_lender: string | null;
  lender_found: boolean;
  association_verified: boolean;
  domain_match: boolean;
}

export interface RegulatoryAnalysis {
  record: {
    entity_id: string;
    entity_name: string;
    entity_type: string;
    domain: string;
    rbi_registered: string;
    rbi_dla_association: string;
    source: string;
  } | null;
  claims: string[];
}

export interface DigitalAnalysis {
  domain: string;
  subdomain: string;
  tld: string;
  https: boolean;
  domain_age_days: number | null;
  domain_age_status: string;
}

export interface TransparencyAnalysis {
  privacy_policy: boolean;
  terms: boolean;
  grievance_mechanism: boolean;
  lender_identity: boolean;
  contact?: boolean;
  details?: Record<string, any>;
  crawled_pages?: Array<{
    url: string;
    retrieved: boolean;
    status_code?: number | null;
    error?: string | null;
  }>;
}

export interface LanguageAnalysis {
  score: number;
  detected_patterns: string[];
}

export interface PermissionFinding {
  permission: string;
  purpose: string;
  severity: SignalSeverity;
  explanation: string;
}

export interface PermissionsAnalysis {
  score: number;
  findings: PermissionFinding[];
}

export interface WebsiteRetrievalAnalysis {
  retrieved: boolean;
  status_code?: number;
  title?: string;
  emails?: string[];
  phones?: string[];
  error?: string;
}

export interface ThreatRecord {
  domain: string;
  status: string;
  category: string;
  evidence_strength: string;
  source_type: string;
  description: string;
  disclaimer: string;
}

export interface BrandImpersonationAudit {
  detected: boolean;
  is_official: boolean;
  matched_brand: string | null;
  expected_official_domain: string | null;
  similarity_reason: string | null;
  confidence: number;
}

export interface ReputationAnalysis {
  status: string;
  source_type?: string;
  threat_record?: ThreatRecord | null;
  brand_impersonation?: BrandImpersonationAudit | null;
  disclaimer?: string;
}

export interface RiskCategories {
  regulatory: RegulatoryAnalysis;
  digital: DigitalAnalysis;
  transparency: TransparencyAnalysis;
  language: LanguageAnalysis;
  permissions: PermissionsAnalysis;
  reputation: ReputationAnalysis;
  website: WebsiteRetrievalAnalysis;
}

export interface ScanResponse {
  url: string;
  risk_level: RiskLevel;
  risk_score: number; // 0 to 100
  evidence_strength: EvidenceStrength;
  identity: IdentityResult;
  signals: Signal[];
  categories: RiskCategories;
  recommendation: string;
  disclaimer: string;
}

export interface HealthResponse {
  status: string;
  service: string;
  mode: string;
}

export interface DemoScenarioResponse {
  scenario: string;
  url: string;
  label: string;
}

export interface LenderRecordResponse {
  records: Array<{
    entity_id: string;
    entity_name: string;
    entity_type: string;
    domain: string;
    rbi_registered: string;
    rbi_dla_association: string;
    source: string;
  }>;
  source_note: string;
}
