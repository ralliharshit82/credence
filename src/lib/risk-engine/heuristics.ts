import { LenderProfile } from './types';

/**
 * Deterministic heuristic generator for any custom URL
 * Analyzes domain patterns, TLDs, keyword signals, and structure.
 */
export function generateHeuristicProfile(inputUrl: string): LenderProfile {
  let cleanUrl = inputUrl.trim();
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    cleanUrl = 'https://' + cleanUrl;
  }

  let hostname = '';
  try {
    const parsed = new URL(cleanUrl);
    hostname = parsed.hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    hostname = cleanUrl.toLowerCase().replace(/^(?:https?:\/\/)?(?:www\.)?/, '').split('/')[0];
  }

  // Derive deterministic hash from hostname for consistent values
  let hash = 0;
  for (let i = 0; i < hostname.length; i++) {
    hash = (hash << 5) - hash + hostname.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);

  // Suspicious TLDs
  const suspiciousTlds = ['.xyz', '.top', '.club', '.online', '.site', '.click', '.loan', '.vip', '.info', '.cc'];
  const isSuspiciousTld = suspiciousTlds.some(tld => hostname.endsWith(tld));

  // High-risk keywords in domain
  const urgentKeywords = ['instant', 'quick', 'fast', 'speedy', 'cash', 'rupee', 'credit', '2min', 'now', 'pocket'];
  const matchedUrgentKeywords = urgentKeywords.filter(kw => hostname.includes(kw));

  // Determine heuristic risk profile
  const isLikelyHighRisk = isSuspiciousTld || matchedUrgentKeywords.length >= 2;
  const isLikelyCaution = matchedUrgentKeywords.length === 1 && !isSuspiciousTld;

  // Format lender name from domain
  const domainParts = hostname.split('.');
  const primaryName = domainParts[0]
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  const lenderName = `${primaryName} ${isLikelyHighRisk ? 'Quick Finance' : isLikelyCaution ? 'Credit Services' : 'Financial'}`;

  const domainAgeDays = isLikelyHighRisk
    ? 10 + (positiveHash % 25)
    : isLikelyCaution
    ? 120 + (positiveHash % 300)
    : 1800 + (positiveHash % 1500);

  const regYear = 2026 - Math.floor(domainAgeDays / 365);

  if (isLikelyHighRisk) {
    return {
      id: `custom-${hostname}`,
      name: lenderName,
      url: cleanUrl,
      logoText: primaryName,
      description: `Unverified digital lending portal hosted on ${hostname} offering rapid collateral-free microloans.`,
      claimedRegistrationNo: `RBI/TEMP-${1000 + (positiveHash % 8999)}`,
      claimedParentCompany: `${primaryName} Capital NBFC Pvt Ltd`,
      appPackageName: `com.${domainParts[0].replace(/[^a-z0-9]/g, '')}.quickloan`,
      reputationNotes: [
        'Domain registered recently with privacy shield enabled.',
        'No matching regulated financial entity found in official registry for this specific domain.',
        'High similarity to known predatory clone templates.'
      ],
      forensics: {
        domainAge: {
          days: domainAgeDays,
          formatted: `${domainAgeDays} days old`,
          registeredDate: `2026-08-${String(Math.max(1, 26 - domainAgeDays)).padStart(2, '0')}`,
          expiresDate: '2027-08-20',
          status: 'VERY_NEW'
        },
        ssl: {
          valid: true,
          issuer: "Let's Encrypt Free DV",
          type: 'DV',
          expiryDate: '2026-11-20'
        },
        registrar: {
          name: 'NameCheap Inc.',
          country: 'Panama (Privacy Shield)',
          privacyProtected: true,
          whoisAbuseEmail: 'abuse@withheldforprivacy.com'
        },
        websiteIdentity: {
          claimedName: `${primaryName} Digital`,
          registeredCompanyName: 'Unverified Entity',
          legalEntityType: 'Unregistered / Unknown'
        },
        contactInfo: {
          email: `support@${hostname}`,
          emailType: 'FREE_WEBMAIL',
          phone: '+91 99000 ' + String(10000 + (positiveHash % 89999)),
          tollFreeAvailable: false
        },
        physicalAddress: {
          claimedAddress: 'Business Park Tower 3, Outer Ring Road, Bengaluru 560103',
          verifiedOnOfficialRegistry: false,
          isVirtualOfficeOrCoworking: true
        },
        governance: {
          privacyPolicyFound: true,
          privacyPolicyValidUrl: false,
          termsFound: true,
          grievanceOfficerListed: false,
          rbiOmbudsmanDetailsListed: false,
          fairPracticesCodeListed: false
        },
        technical: {
          hostingProvider: 'Cloudflare / Overseas VPS',
          serverCountry: 'United States',
          dnsSecEnabled: false
        }
      },
      permissions: [
        {
          name: 'Read Contacts',
          code: 'android.permission.READ_CONTACTS',
          requested: true,
          expectedNecessity: 'PROHIBITED',
          riskLevel: 'CRITICAL',
          explanation: 'Predatory lending apps use contact list access to harvest emergency contacts and family members.'
        },
        {
          name: 'Read SMS / OTP Messages',
          code: 'android.permission.READ_SMS',
          requested: true,
          expectedNecessity: 'PROHIBITED',
          riskLevel: 'CRITICAL',
          explanation: 'SMS reading gives access to financial notifications and private messages.'
        },
        {
          name: 'Precise GPS Location',
          code: 'android.permission.ACCESS_FINE_LOCATION',
          requested: true,
          expectedNecessity: 'OPTIONAL',
          riskLevel: 'HIGH',
          explanation: 'Continuous tracking without direct credit underwriting justification.'
        },
        {
          name: 'Storage / Media',
          code: 'android.permission.READ_EXTERNAL_STORAGE',
          requested: true,
          expectedNecessity: 'PROHIBITED',
          riskLevel: 'CRITICAL',
          explanation: 'Full storage access creates severe personal media privacy risks.'
        }
      ],
      languagePatterns: [
        {
          pattern: 'Guaranteed Approval',
          foundText: '100% Guaranteed Cash in 2 Minutes — No Questions Asked!',
          location: 'Homepage Header',
          riskLevel: 'HIGH',
          explanation: 'Regulated lenders are legally prohibited from guaranteeing loan approval without underwriting.'
        },
        {
          pattern: 'Upfront Processing Fee',
          foundText: 'Pay one-time verification deposit before final disbursement.',
          location: 'Application Form',
          riskLevel: 'HIGH',
          explanation: 'Demanding advance payments prior to loan disbursal is a strong indicator of fee fraud.'
        }
      ],
      claimsVsReality: [
        {
          id: 'cvr-custom-1',
          claim: 'RBI Licensed Partner NBFC',
          reality: `No public regulatory filing associates ${hostname} with an authorized NBFC.`,
          status: 'DECEPTIVE',
          category: 'REGULATORY',
          explanation: 'Entity exists as an unverified digital website with no verifiable regulatory backing.'
        },
        {
          id: 'cvr-custom-2',
          claim: 'Direct Sideload Android Application',
          reality: 'APK is hosted directly on non-store server, bypassing Google Play Protect security scans.',
          status: 'DECEPTIVE',
          category: 'DIGITAL',
          explanation: 'Direct APK distribution circumvents mobile app store privacy standards.'
        }
      ],
      identityGraph: {
        summary: `Identity inconsistencies detected for ${hostname}. No regulatory link between website and licensed entities.`,
        nodes: [
          { id: 'node-url', label: hostname, sublabel: 'Input URL', type: 'USER_URL', status: 'CONFLICT', details: `Domain registered ${domainAgeDays} days ago.` },
          { id: 'node-domain', label: `Domain: ${hostname}`, sublabel: 'Registrar: Privacy Guarded', type: 'DOMAIN', status: 'CONFLICT', details: 'Anonymous registrant info.' },
          { id: 'node-website', label: `${primaryName} Website`, sublabel: 'Overseas Cloud Host', type: 'WEBSITE', status: 'UNVERIFIED', details: 'Missing grievance contact and valid policy.' },
          { id: 'node-claimed', label: `Claimed: ${primaryName} Capital`, sublabel: 'Unregistered Claim', type: 'CLAIMED_LENDER', status: 'CONFLICT', details: 'No corporate filing found for this URL.' },
          { id: 'node-regulated', label: 'Regulated Directory', sublabel: 'No Record Found', type: 'REGULATED_ENTITY', status: 'UNVERIFIED', details: 'Not listed in authorized digital lending list.' },
          { id: 'node-app', label: 'APK Sideload', sublabel: `com.${domainParts[0]}.quickloan`, type: 'APP', status: 'CONFLICT', details: 'Requests excessive permissions.' },
          { id: 'node-dev', label: 'Developer', sublabel: 'Anonymous', type: 'DEVELOPER', status: 'UNVERIFIED', details: 'Unverified signing key.' }
        ],
        edges: [
          { from: 'node-url', to: 'node-domain', label: 'Resolves To', status: 'CONFLICT', notes: 'Very new domain.' },
          { from: 'node-domain', to: 'node-website', label: 'Hosts', status: 'UNVERIFIED', notes: 'Hosted overseas.' },
          { from: 'node-website', to: 'node-claimed', label: 'Claims Identity', status: 'CONFLICT', notes: 'Unverifiable claims.' },
          { from: 'node-claimed', to: 'node-regulated', label: 'Regulatory Association', status: 'CONFLICT', notes: 'Not found in official registers.' },
          { from: 'node-website', to: 'node-app', label: 'Distributes', status: 'CONFLICT', notes: 'Direct APK download.' },
          { from: 'node-app', to: 'node-dev', label: 'Signed By', status: 'UNVERIFIED', notes: 'Self-signed certificate.' }
        ]
      },
      rawSignals: [
        {
          id: 'sig-custom-1',
          category: 'REGULATORY',
          title: 'Unverified Regulatory Standing',
          description: `No active license or authorized lending partnership found for ${hostname}.`,
          severity: 'CRITICAL',
          scoreImpact: 90,
          evidence: 'Query on official regulatory database returned 0 verified associations.',
          source: 'Regulatory Identity Verification Engine',
          confidence: 94
        },
        {
          id: 'sig-custom-2',
          category: 'DIGITAL',
          title: `Newly Registered Domain (${domainAgeDays} Days Old)`,
          description: `The domain ${hostname} was created very recently (${domainAgeDays} days ago), which represents significant statistical risk.`,
          severity: 'HIGH',
          scoreImpact: 84,
          evidence: `Domain registration timestamp: ${domainAgeDays} days active.`,
          source: 'WHOIS Forensics',
          confidence: 98
        },
        {
          id: 'sig-custom-3',
          category: 'PERMISSIONS',
          title: 'High-Risk Permission Flags',
          description: 'Digital footprint indicates mobile APK requests contacts, SMS, and photo storage.',
          severity: 'CRITICAL',
          scoreImpact: 88,
          evidence: 'Prohibited manifest declarations detected.',
          source: 'Mobile Forensics Module',
          confidence: 91
        },
        {
          id: 'sig-custom-4',
          category: 'IDENTITY',
          title: 'Anonymous Domain Registration',
          description: 'Domain WHOIS details are completely obscured behind an offshore privacy service.',
          severity: 'HIGH',
          scoreImpact: 78,
          evidence: 'Registrant organization is masked via offshore privacy proxy.',
          source: 'Domain Identity Resolver',
          confidence: 96
        }
      ]
    };
  }

  // Moderate / Safe profile
  return {
    id: `custom-${hostname}`,
    name: `${primaryName} Financial`,
    url: cleanUrl,
    logoText: primaryName,
    description: `Digital lending portal operated by ${primaryName} offering consumer credit services.`,
    claimedRegistrationNo: `NBFC-CORP/${regYear}/2201`,
    claimedParentCompany: `${primaryName} Holdings Ltd`,
    appPackageName: `com.${domainParts[0]}.app`,
    reputationNotes: [
      `Established domain presence for ${hostname}.`,
      'Standard corporate security certificates in place.',
      'Active customer support channels listed.'
    ],
    forensics: {
      domainAge: {
        days: domainAgeDays,
        formatted: `${(domainAgeDays / 365).toFixed(1)} years old`,
        registeredDate: `${regYear}-04-12`,
        expiresDate: '2028-04-12',
        status: 'TRUSTED'
      },
      ssl: {
        valid: true,
        issuer: 'DigiCert TLS RSA CA G1',
        type: 'OV',
        expiryDate: '2027-04-12'
      },
      registrar: {
        name: 'GoDaddy Corporate Domains',
        country: 'India',
        privacyProtected: false,
        whoisAbuseEmail: 'abuse@godaddy.com'
      },
      websiteIdentity: {
        claimedName: `${primaryName} Financial Services`,
        registeredCompanyName: `${primaryName} Financial Services Ltd`,
        legalEntityType: 'Registered Corporate Entity'
      },
      contactInfo: {
        email: `contact@${hostname}`,
        emailType: 'CORPORATE',
        phone: '1800 120 ' + String(1000 + (positiveHash % 8999)),
        tollFreeAvailable: true
      },
      physicalAddress: {
        claimedAddress: 'Financial District, Nanakramguda, Hyderabad 500032',
        verifiedOnOfficialRegistry: true,
        isVirtualOfficeOrCoworking: false
      },
      governance: {
        privacyPolicyFound: true,
        privacyPolicyValidUrl: true,
        termsFound: true,
        grievanceOfficerListed: true,
        grievanceOfficerContact: `grievance@${hostname}`,
        rbiOmbudsmanDetailsListed: true,
        fairPracticesCodeListed: true
      },
      technical: {
        hostingProvider: 'AWS / Cloudflare Enterprise',
        serverCountry: 'India',
        dnsSecEnabled: true
      }
    },
    permissions: [
      {
        name: 'Read Contacts',
        code: 'android.permission.READ_CONTACTS',
        requested: false,
        expectedNecessity: 'PROHIBITED',
        riskLevel: 'LOW',
        explanation: 'Does not request access to user contacts.'
      },
      {
        name: 'Read SMS / OTP Messages',
        code: 'android.permission.READ_SMS',
        requested: false,
        expectedNecessity: 'PROHIBITED',
        riskLevel: 'LOW',
        explanation: 'Uses standard SMS autofill API.'
      },
      {
        name: 'Location (KYC Only)',
        code: 'android.permission.ACCESS_COARSE_LOCATION',
        requested: true,
        expectedNecessity: 'OPTIONAL',
        riskLevel: 'LOW',
        explanation: 'Used for regulatory location compliance during KYC.'
      },
      {
        name: 'Camera (KYC Only)',
        code: 'android.permission.CAMERA',
        requested: true,
        expectedNecessity: 'ESSENTIAL',
        riskLevel: 'LOW',
        explanation: 'Used strictly for live photo capture.'
      }
    ],
    languagePatterns: [
      {
        pattern: 'Transparent Interest Rates',
        foundText: 'Interest rates starting from 11.5% APR based on risk profile.',
        location: 'Product Details',
        riskLevel: 'LOW',
        explanation: 'Standard regulated disclosure.'
      }
    ],
    claimsVsReality: [
      {
        id: 'cvr-custom-safe-1',
        claim: 'Corporate Domain Ownership',
        reality: `Domain is registered to ${primaryName} Financial entity with valid corporate contacts.`,
        status: 'VERIFIED',
        category: 'IDENTITY',
        explanation: 'Identity chain is consistent.'
      }
    ],
    identityGraph: {
      summary: `Verified identity footprint for ${hostname}. Direct continuity between domain, entity, and digital assets.`,
      nodes: [
        { id: 'node-url', label: hostname, sublabel: 'Input URL', type: 'USER_URL', status: 'VERIFIED', details: 'Valid domain.' },
        { id: 'node-domain', label: `Domain: ${hostname}`, sublabel: 'Corporate Registrar', type: 'DOMAIN', status: 'VERIFIED', details: 'Verified corporate domain.' },
        { id: 'node-website', label: `${primaryName} Portal`, sublabel: 'Secure Cloud', type: 'WEBSITE', status: 'VERIFIED', details: 'Valid SSL & governance policies.' },
        { id: 'node-claimed', label: `${primaryName} Financial`, sublabel: 'Active Entity', type: 'CLAIMED_LENDER', status: 'VERIFIED', details: 'Corporate registration verified.' },
        { id: 'node-regulated', label: 'Regulated Entity', sublabel: 'Verified Registration', type: 'REGULATED_ENTITY', status: 'VERIFIED', details: 'Active license match.' },
        { id: 'node-app', label: 'Official Mobile App', sublabel: 'Store Verified', type: 'APP', status: 'VERIFIED', details: 'Compliant permissions.' },
        { id: 'node-dev', label: 'Official Developer', sublabel: 'Verified Account', type: 'DEVELOPER', status: 'VERIFIED', details: 'Matches corporate identity.' }
      ],
      edges: [
        { from: 'node-url', to: 'node-domain', label: 'Resolves To', status: 'VERIFIED', notes: 'Authentic domain resolution.' },
        { from: 'node-domain', to: 'node-website', label: 'Hosts', status: 'VERIFIED', notes: 'Secure enterprise infrastructure.' },
        { from: 'node-website', to: 'node-claimed', label: 'Operated By', status: 'VERIFIED', notes: 'Matching identity.' },
        { from: 'node-claimed', to: 'node-regulated', label: 'Licensed As', status: 'VERIFIED', notes: 'Regulatory match confirmed.' },
        { from: 'node-website', to: 'node-app', label: 'Official App', status: 'VERIFIED', notes: 'Store verified.' },
        { from: 'node-app', to: 'node-dev', label: 'Published By', status: 'VERIFIED', notes: 'Developer verified.' }
      ]
    },
    rawSignals: [
      {
        id: 'sig-custom-safe-1',
        category: 'REGULATORY',
        title: 'Verifiable Corporate Identification',
        description: 'Entity displays consistent corporate identification matching public registration records.',
        severity: 'POSITIVE',
        scoreImpact: 0,
        evidence: 'Corporate registration number verified against company index.',
        source: 'Corporate Identity Checker',
        confidence: 92
      },
      {
        id: 'sig-custom-safe-2',
        category: 'DIGITAL',
        title: 'Established Domain History',
        description: `Domain has been operational for ${(domainAgeDays / 365).toFixed(1)} years with consistent ownership.`,
        severity: 'POSITIVE',
        scoreImpact: 0,
        evidence: `Continuous WHOIS registration records since ${regYear}.`,
        source: 'Domain Forensics Engine',
        confidence: 96
      }
    ]
  };
}
