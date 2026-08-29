/**
 * Extensible Provider Interfaces for LoanShield Trust Engine
 * 
 * These interfaces define the contract for live API integration.
 * In this hackathon MVP, Mock Providers implement these interfaces,
 * allowing production systems to seamlessly plug into live third-party services:
 * - RBI / MCA Registry APIs
 * - WhoisXML / SecurityTrails / Censys
 * - Google Play Developer / App Store Scraper APIs
 * - OpenAI / Google Gemini NLP Claim Evaluator
 */

import { DigitalForensicsData, PermissionItem, LanguagePatternItem, RiskSignal } from './types';

export interface IRegulatoryProvider {
  /**
   * Cross-reference claimed registration number and corporate name against official registry.
   */
  verifyRegistration(claimedNumber: string, entityName: string): Promise<{
    isRegistered: boolean;
    officialName?: string;
    registeredAddress?: string;
    licenseType?: string;
    status: 'ACTIVE' | 'DORMANT' | 'CANCELLED' | 'NOT_FOUND';
    authorizedDomains: string[];
    authorizedApps: string[];
  }>;
}

export interface IForensicsProvider {
  /**
   * Inspect domain age, WHOIS registrar, SSL certificates, DNSSEC, and server geolocation.
   */
  inspectDomain(domainOrUrl: string): Promise<DigitalForensicsData>;
}

export interface IAppStoreProvider {
  /**
   * Analyze Google Play / iOS App Store package permissions, developer identity, and reviews.
   */
  analyzeAppPackage(packageNameOrUrl: string): Promise<{
    appExists: boolean;
    developerName: string;
    developerEmail: string;
    developerWebsite: string;
    permissions: PermissionItem[];
    installRange: string;
    averageRating: number;
    reviewSentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'HARASSMENT_COMPLAINTS';
  }>;
}

export interface ILanguageProvider {
  /**
   * NLP semantic analysis on website text & marketing claims to identify predatory triggers.
   */
  analyzeLendingClaims(pageText: string): Promise<{
    patterns: LanguagePatternItem[];
    urgencyScore: number; // 0-100
    guaranteeScore: number; // 0-100
    advanceFeeDetected: boolean;
  }>;
}

export interface IReputationProvider {
  /**
   * Query cyber threat intelligence feeds, consumer forums, and anti-fraud registries.
   */
  checkReputation(domain: string, entityName: string): Promise<{
    threatSignals: RiskSignal[];
    communityReportsCount: number;
    knownScamSignature: boolean;
  }>;
}
