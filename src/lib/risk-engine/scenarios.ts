import { LenderProfile } from './types';

export const HIGH_RISK_SCENARIO: LenderProfile = {
  id: 'high-risk',
  name: 'SpeedyRupee Instant Cash',
  url: 'https://speedyrupee-quickloan.xyz',
  logoText: 'SpeedyRupee',
  description: 'Instant collateral-free digital personal loans claiming 2-minute disbursement and guaranteed approval without credit checks.',
  claimedRegistrationNo: 'RBI/NBFC-BL/14.02981',
  claimedParentCompany: 'Speedy Capital NBFC Pvt Ltd',
  appPackageName: 'com.speedyrupee.instant.cash.quickloan',
  reputationNotes: [
    'Flagged on community forums (Reddit r/IndiaInvestments, Twitter #LoanHarassment) for harassment and contact scraping.',
    'Domain registered within the last 14 days; registrar has high incidence of phishing reports.',
    'No legitimate business registration found matching APK signing certificate.'
  ],
  forensics: {
    domainAge: {
      days: 12,
      formatted: '12 days old',
      registeredDate: '2026-08-14',
      expiresDate: '2027-08-14',
      status: 'VERY_NEW'
    },
    ssl: {
      valid: true,
      issuer: "Let's Encrypt Free DV",
      type: 'DV',
      expiryDate: '2026-11-14'
    },
    registrar: {
      name: 'NameCheap Inc.',
      country: 'Panama (Privacy Guarded)',
      privacyProtected: true,
      whoisAbuseEmail: 'abuse@withheldforprivacy.com'
    },
    websiteIdentity: {
      claimedName: 'SpeedyRupee Loans Pvt Ltd',
      registeredCompanyName: 'Speedy Capital NBFC Pvt Ltd (Impersonated Entity)',
      legalEntityType: 'Unverified Shell / Impersonator'
    },
    contactInfo: {
      email: 'speedyrupeehelpdesk@protonmail.com',
      emailType: 'FREE_WEBMAIL',
      phone: '+91 98765 43210 (Unregistered VoIP / Mobile)',
      tollFreeAvailable: false
    },
    physicalAddress: {
      claimedAddress: 'Level 4, Nariman Point, Mumbai, Maharashtra 400021',
      verifiedOnOfficialRegistry: false,
      isVirtualOfficeOrCoworking: true
    },
    governance: {
      privacyPolicyFound: true,
      privacyPolicyValidUrl: false, // 404 dead link
      termsFound: true,
      grievanceOfficerListed: false,
      rbiOmbudsmanDetailsListed: false,
      fairPracticesCodeListed: false
    },
    technical: {
      hostingProvider: 'DigitalOcean Singapore Droplet / Cloudflare CDN',
      serverCountry: 'Singapore',
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
      explanation: 'Predatory lending apps use contact list access to harvest emergency contacts, friends, and family for harassment and debt shaming.'
    },
    {
      name: 'Read SMS / OTP Messages',
      code: 'android.permission.READ_SMS',
      requested: true,
      expectedNecessity: 'PROHIBITED',
      riskLevel: 'CRITICAL',
      explanation: 'SMS access allows unauthorized scraping of bank transaction logs, salary alerts, and OTPs. Prohibited under RBI digital lending guidelines.'
    },
    {
      name: 'Precise GPS Location',
      code: 'android.permission.ACCESS_FINE_LOCATION',
      requested: true,
      expectedNecessity: 'OPTIONAL',
      riskLevel: 'HIGH',
      explanation: 'Continuous fine background location tracking is unnecessary for credit assessment and creates severe surveillance risk.'
    },
    {
      name: 'Camera & Gallery',
      code: 'android.permission.CAMERA',
      requested: true,
      expectedNecessity: 'ESSENTIAL',
      riskLevel: 'MEDIUM',
      explanation: 'Camera is legitimate for KYC selfies, but combined with external storage permission it creates risk of photo gallery scraping.'
    },
    {
      name: 'Read External Storage / Photos',
      code: 'android.permission.READ_EXTERNAL_STORAGE',
      requested: true,
      expectedNecessity: 'PROHIBITED',
      riskLevel: 'CRITICAL',
      explanation: 'Access to photo album files has been weaponized by illegal loan apps for morphing images and extortion.'
    },
    {
      name: 'Phone State & Call Logs',
      code: 'android.permission.READ_PHONE_STATE',
      requested: true,
      expectedNecessity: 'UNNECESSARY',
      riskLevel: 'HIGH',
      explanation: 'Harvests device IMEI, SIM serial numbers, and call logs to track user identities across reinstallations.'
    }
  ],
  languagePatterns: [
    {
      pattern: 'Guaranteed Approval',
      foundText: '100% Guaranteed Approval in 2 Minutes — No CIBIL Check Required!',
      location: 'Hero Banner & App Description',
      riskLevel: 'HIGH',
      explanation: 'Regulated financial institutions are legally required to evaluate creditworthiness; "guaranteed approval" is a hallmark predatory marketing trigger.'
    },
    {
      pattern: 'Advance Processing Fee',
      foundText: 'Pay Rs. 499 refundable security verification fee before loan disbursal.',
      location: 'Application Step 3',
      riskLevel: 'HIGH',
      explanation: 'Demanding upfront payments or "security fees" prior to loan disbursement is an established advance-fee loan scam vector.'
    },
    {
      pattern: 'Extreme Urgency',
      foundText: 'Limited offer: Only 3 loan slots remaining today. Apply in the next 10 minutes!',
      location: 'Countdown Popup',
      riskLevel: 'MEDIUM',
      explanation: 'Manufactured urgency exploits psychological panic to prevent consumers from doing due diligence.'
    },
    {
      pattern: 'No Documents Needed',
      foundText: 'Zero paperwork, no salary slip, no bank statement, instant cash to wallet.',
      location: 'Feature List',
      riskLevel: 'HIGH',
      explanation: 'Claims of disbursing loans without standard KYC or income verification frequently indicate data-harvesting or predatory micro-loans.'
    }
  ],
  claimsVsReality: [
    {
      id: 'cvr-1',
      claim: 'RBI Approved NBFC (Reg #14.02981)',
      reality: 'Registration number 14.02981 belongs to an unrelated dormant firm in Kolkata. No digital lending permission or URL association exists for speedyrupee-quickloan.xyz.',
      status: 'DECEPTIVE',
      category: 'REGULATORY',
      explanation: 'Scammers frequently lift genuine registration numbers from public RBI registers to fake regulatory legitimacy.'
    },
    {
      id: 'cvr-2',
      claim: 'Powered by Speedy Capital NBFC Pvt Ltd',
      reality: 'Digital identity and domain registrar do not establish any verifiable corporate connection to the claimed NBFC entity.',
      status: 'MISMATCH',
      category: 'IDENTITY',
      explanation: 'Domain is registered to an anonymous individual in Panama using a disposable ProtonMail contact.'
    },
    {
      id: 'cvr-3',
      claim: 'Official Grievance Redressal & RBI Ombudsman',
      reality: 'Grievance officer contact page leads to a 404 error; no nodal officer email or physical address is provided.',
      status: 'UNVERIFIABLE',
      category: 'REGULATORY',
      explanation: 'RBI Digital Lending Directions mandate a clear, functional Grievance Redressal Officer.'
    },
    {
      id: 'cvr-4',
      claim: 'Google Play Verified Financial App',
      reality: 'App is distributed via direct APK sideload download link, bypassing Google Play Protect and security screening.',
      status: 'DECEPTIVE',
      category: 'DIGITAL',
      explanation: 'Sideloaded APKs bypass Google Play’s policy banning apps that access Contacts, Photos, and SMS.'
    }
  ],
  identityGraph: {
    summary: 'Severe identity conflicts detected between claimed NBFC entity, Panama domain registrar, and overseas APK developer.',
    nodes: [
      { id: 'node-url', label: 'speedyrupee-quickloan.xyz', sublabel: 'Input URL', type: 'USER_URL', status: 'CONFLICT', details: 'Domain registered 12 days ago via privacy guard.' },
      { id: 'node-domain', label: 'Domain: speedyrupee-quickloan.xyz', sublabel: 'Registrar: NameCheap Panama', type: 'DOMAIN', status: 'CONFLICT', details: 'Anonymous WHOIS with disposable webmail contact.' },
      { id: 'node-website', label: 'SpeedyRupee Website', sublabel: 'Hosted on Singapore VPS', type: 'WEBSITE', status: 'UNVERIFIED', details: 'Dead privacy policy link, missing grievance mechanism.' },
      { id: 'node-claimed', label: 'Claimed: Speedy Capital NBFC', sublabel: 'Claimed Registration: 14.02981', type: 'CLAIMED_LENDER', status: 'CONFLICT', details: 'Entity name lifted from public directory without authorization.' },
      { id: 'node-regulated', label: 'Actual Regulated NBFC', sublabel: 'Speedy Capital (Kolkata)', type: 'REGULATED_ENTITY', status: 'UNVERIFIED', details: 'Real entity has no online lending portal or digital app registered.' },
      { id: 'node-app', label: 'Sideloaded APK v2.1', sublabel: 'Package: com.speedyrupee.cash', type: 'APP', status: 'CONFLICT', details: 'Requests prohibited SMS, Contacts, and Storage access.' },
      { id: 'node-dev', label: 'Dev: QuickCash Tech Labs', sublabel: 'Guangzhou / Unknown', type: 'DEVELOPER', status: 'CONFLICT', details: 'No corporate registry match or verifiable legal presence.' }
    ],
    edges: [
      { from: 'node-url', to: 'node-domain', label: 'Resolves To', status: 'CONFLICT', notes: 'Domain registered recently (12d old).' },
      { from: 'node-domain', to: 'node-website', label: 'Hosts', status: 'UNVERIFIED', notes: 'Anonymous cloud hosting.' },
      { from: 'node-website', to: 'node-claimed', label: 'Claims Identity', status: 'CONFLICT', notes: 'Identity misappropriation detected.' },
      { from: 'node-claimed', to: 'node-regulated', label: 'Regulatory Association', status: 'CONFLICT', notes: 'No verifiable link to licensed entity.' },
      { from: 'node-website', to: 'node-app', label: 'Distributes', status: 'CONFLICT', notes: 'Direct APK sideloading outside App Store.' },
      { from: 'node-app', to: 'node-dev', label: 'Signed By', status: 'CONFLICT', notes: 'Unverified self-signed developer certificate.' }
    ]
  },
  rawSignals: [
    {
      id: 'sig-1',
      category: 'REGULATORY',
      title: 'Deceptive Regulatory Registration Number',
      description: 'The displayed RBI NBFC registration number belongs to an unrelated dormant corporation with no authorized digital lending apps.',
      severity: 'CRITICAL',
      scoreImpact: 95,
      evidence: 'RBI Registered NBFC list cross-reference shows no registered digital platform under speedyrupee-quickloan.xyz.',
      source: 'RBI Master List & MCA Digital Lending Registry',
      confidence: 96
    },
    {
      id: 'sig-2',
      category: 'IDENTITY',
      title: 'Severe Corporate Identity Mismatch',
      description: 'The lender claims to be an Indian NBFC based in Mumbai, but digital infrastructure traces to Panama and Singapore.',
      severity: 'CRITICAL',
      scoreImpact: 92,
      evidence: 'Domain contact email: speedyrupeehelpdesk@protonmail.com vs registered NBFC corporate domain.',
      source: 'WHOIS & Infrastructure Intelligence',
      confidence: 94
    },
    {
      id: 'sig-3',
      category: 'DIGITAL',
      title: 'Extremely New Domain (<14 Days)',
      description: 'The website domain was registered only 12 days ago. Over 91% of loan fraud instances occur on domains under 30 days old.',
      severity: 'HIGH',
      scoreImpact: 85,
      evidence: 'Creation Date: 2026-08-14 (12 days before scan)',
      source: 'Domain Forensics Engine',
      confidence: 99
    },
    {
      id: 'sig-4',
      category: 'PERMISSIONS',
      title: 'Prohibited Mobile Permissions Requested',
      description: 'The mobile app bundle requests READ_CONTACTS, READ_SMS, and READ_EXTERNAL_STORAGE, violating central bank digital lending mandates.',
      severity: 'CRITICAL',
      scoreImpact: 90,
      evidence: 'APK Manifest inspection found 3 prohibited and 2 high-risk permissions.',
      source: 'Static APK Forensic Analyzer',
      confidence: 98
    },
    {
      id: 'sig-5',
      category: 'LANGUAGE',
      title: 'Advance Processing Fee & Guaranteed Loan Promises',
      description: 'Lender advertises guaranteed approval without credit checks and demands a pre-disbursement verification fee of Rs. 499.',
      severity: 'HIGH',
      scoreImpact: 80,
      evidence: 'NLP detected advance fee patterns and 100% approval guarantees on landing page and application flow.',
      source: 'Lending Claim NLP Analyzer',
      confidence: 92
    },
    {
      id: 'sig-6',
      category: 'REPUTATION',
      title: 'Active Consumer Harassment Complaints',
      description: 'Community threat intelligence flagged identical app fingerprints for unauthorized contact harassment and aggressive debt recovery.',
      severity: 'HIGH',
      scoreImpact: 88,
      evidence: '34 correlated reports across consumer complaint databases.',
      source: 'Fintech Threat Intelligence Feed',
      confidence: 85
    }
  ]
};

export const CAUTION_SCENARIO: LenderProfile = {
  id: 'caution',
  name: 'FlexiCredit India',
  url: 'https://flexicreditloans.in',
  logoText: 'FlexiCredit',
  description: 'Online loan marketplace and direct selling agent (DSA) offering personal and business loans from multiple partner lenders.',
  claimedRegistrationNo: 'DSA-REG/DL/2024/9912',
  claimedParentCompany: 'FlexiCredit Tech Solutions Pvt Ltd',
  appPackageName: 'in.flexicredit.loans.marketplace',
  reputationNotes: [
    'Operates as an unregulated loan aggregator / lead broker.',
    'Users report unsolicited marketing calls after submitting phone number.',
    'Lacks explicit transparent co-lending APR and partner NBFC disclosures on front page.'
  ],
  forensics: {
    domainAge: {
      days: 245,
      formatted: '8 months old',
      registeredDate: '2025-12-20',
      expiresDate: '2026-12-20',
      status: 'SUSPICIOUS'
    },
    ssl: {
      valid: true,
      issuer: 'Cloudflare Inc ECC CA-3',
      type: 'DV',
      expiryDate: '2027-01-10'
    },
    registrar: {
      name: 'GoDaddy.com LLC',
      country: 'India',
      privacyProtected: false,
      whoisAbuseEmail: 'abuse@godaddy.com'
    },
    websiteIdentity: {
      claimedName: 'FlexiCredit India',
      registeredCompanyName: 'FlexiCredit Tech Solutions Pvt Ltd',
      legalEntityType: 'Private Limited Company (Unregulated Intermediary)'
    },
    contactInfo: {
      email: 'support@flexicreditloans.in',
      emailType: 'CORPORATE',
      phone: '+91 11 4009 8812',
      tollFreeAvailable: false
    },
    physicalAddress: {
      claimedAddress: 'Unit 302, Sector 62, Noida, Uttar Pradesh 201309',
      verifiedOnOfficialRegistry: true,
      isVirtualOfficeOrCoworking: true
    },
    governance: {
      privacyPolicyFound: true,
      privacyPolicyValidUrl: true,
      termsFound: true,
      grievanceOfficerListed: false, // missing designated officer
      rbiOmbudsmanDetailsListed: false,
      fairPracticesCodeListed: false
    },
    technical: {
      hostingProvider: 'Amazon Web Services (AWS Mumbai)',
      serverCountry: 'India',
      dnsSecEnabled: false
    }
  },
  permissions: [
    {
      name: 'Read Contacts',
      code: 'android.permission.READ_CONTACTS',
      requested: false,
      expectedNecessity: 'PROHIBITED',
      riskLevel: 'LOW',
      explanation: 'App does not request contact book access.'
    },
    {
      name: 'Read SMS / OTP Messages',
      code: 'android.permission.READ_SMS',
      requested: false,
      expectedNecessity: 'PROHIBITED',
      riskLevel: 'LOW',
      explanation: 'App uses standard SMS Retriever API rather than reading full SMS inbox.'
    },
    {
      name: 'Approximate Location',
      code: 'android.permission.ACCESS_COARSE_LOCATION',
      requested: true,
      expectedNecessity: 'OPTIONAL',
      riskLevel: 'MEDIUM',
      explanation: 'Used to filter loan offers by state/pincode, but data is shared with third-party advertising brokers.'
    },
    {
      name: 'Camera',
      code: 'android.permission.CAMERA',
      requested: true,
      expectedNecessity: 'ESSENTIAL',
      riskLevel: 'LOW',
      explanation: 'Used for identity document capture during loan pre-qualification.'
    },
    {
      name: 'Storage Access',
      code: 'android.permission.READ_EXTERNAL_STORAGE',
      requested: true,
      expectedNecessity: 'UNNECESSARY',
      riskLevel: 'MEDIUM',
      explanation: 'Requests broad storage access instead of using scoped storage photo picker.'
    },
    {
      name: 'Phone State',
      code: 'android.permission.READ_PHONE_STATE',
      requested: false,
      expectedNecessity: 'UNNECESSARY',
      riskLevel: 'LOW',
      explanation: 'Does not read hardware identifiers.'
    }
  ],
  languagePatterns: [
    {
      pattern: 'Vague Partner Disclosures',
      foundText: 'Partnered with 20+ leading banks and NBFCs across India.',
      location: 'Homepage Footer',
      riskLevel: 'MEDIUM',
      explanation: 'Fails to explicitly name the specific registered underwriting lender prior to collecting personal data.'
    },
    {
      pattern: 'Fast-Track Pre-Approval',
      foundText: 'Instant pre-approval in 60 seconds with zero credit score impact.',
      location: 'Lead Capture Form',
      riskLevel: 'LOW',
      explanation: 'Common lead-generation marketing phrasing; soft-pull pre-approval is standard but creates lead-sharing risk.'
    },
    {
      pattern: 'Data Sharing Consent in Small Print',
      foundText: 'By submitting, you consent to receive calls and messages from our lending partners and affiliates.',
      location: 'Terms & Conditions clause 4.2',
      riskLevel: 'MEDIUM',
      explanation: 'Unchecked consent permits your phone number to be distributed to multiple loan sales call centers.'
    }
  ],
  claimsVsReality: [
    {
      id: 'cvr-c1',
      claim: 'Registered Direct Selling Partner of Top NBFCs',
      reality: 'Operates as an unverified digital lead aggregator. Specific co-lending agreements and sanctioned NBFC partners are not transparently linked.',
      status: 'UNVERIFIABLE',
      category: 'REGULATORY',
      explanation: 'Consumers cannot verify which specific financial entity is underwriting the loan until application is forwarded.'
    },
    {
      id: 'cvr-c2',
      claim: 'Zero Hidden Charges & 100% Transparency',
      reality: 'Facilitation fees and insurance bundling terms are concealed until step 4 of loan submission.',
      status: 'MISMATCH',
      category: 'LANGUAGE',
      explanation: 'Initial marketing emphasizes zero cost, but partner terms reveal potential processing commissions.'
    },
    {
      id: 'cvr-c3',
      claim: 'Regulated Corporate Entity',
      reality: 'Incorporated as a private tech company (MCA valid), but lacks NBFC or regulated lending status itself.',
      status: 'VERIFIED',
      category: 'IDENTITY',
      explanation: 'Company exists legally, but acts purely as a lead broker without direct lending supervision.'
    }
  ],
  identityGraph: {
    summary: 'Partially verified entity. Company is legally registered, but specific regulated NBFC underwriting relationships are opaque.',
    nodes: [
      { id: 'node-url', label: 'flexicreditloans.in', sublabel: 'Input URL', type: 'USER_URL', status: 'PARTIAL', details: 'Domain active 8 months, Indian registry.' },
      { id: 'node-domain', label: 'Domain: flexicreditloans.in', sublabel: 'Registrar: GoDaddy India', type: 'DOMAIN', status: 'VERIFIED', details: 'Consistent Indian corporate registration.' },
      { id: 'node-website', label: 'FlexiCredit Portal', sublabel: 'Hosted on AWS Mumbai', type: 'WEBSITE', status: 'VERIFIED', details: 'Valid SSL, active web portal.' },
      { id: 'node-claimed', label: 'FlexiCredit Tech Solutions', sublabel: 'MCA CIN: U72900DL2024PTC', type: 'CLAIMED_LENDER', status: 'VERIFIED', details: 'Active corporate registration with MCA India.' },
      { id: 'node-regulated', label: 'Unspecified Partner NBFCs', sublabel: 'No direct license listed', type: 'REGULATED_ENTITY', status: 'UNVERIFIED', details: 'Underwriting lenders not disclosed upfront on website.' },
      { id: 'node-app', label: 'FlexiCredit App', sublabel: 'Google Play Store', type: 'APP', status: 'PARTIAL', details: 'Listed on Play Store with moderate permission footprint.' },
      { id: 'node-dev', label: 'FlexiCredit Tech Pvt Ltd', sublabel: 'Verified Developer Account', type: 'DEVELOPER', status: 'VERIFIED', details: 'Developer account matches corporate domain.' }
    ],
    edges: [
      { from: 'node-url', to: 'node-domain', label: 'Resolves To', status: 'VERIFIED', notes: 'Direct domain mapping.' },
      { from: 'node-domain', to: 'node-website', label: 'Hosts', status: 'VERIFIED', notes: 'Hosted in India AWS data center.' },
      { from: 'node-website', to: 'node-claimed', label: 'Operated By', status: 'VERIFIED', notes: 'Legal entity matches website ownership.' },
      { from: 'node-claimed', to: 'node-regulated', label: 'Brokering For', status: 'UNVERIFIED', notes: 'Partner NBFC agreements not publicly linked.' },
      { from: 'node-website', to: 'node-app', label: 'App Link', status: 'PARTIAL', notes: 'Play Store link verified.' },
      { from: 'node-app', to: 'node-dev', label: 'Published By', status: 'VERIFIED', notes: 'Developer verified.' }
    ]
  },
  rawSignals: [
    {
      id: 'sig-c1',
      category: 'REGULATORY',
      title: 'Opaque Underwriting NBFC Disclosures',
      description: 'The platform operates as a loan broker without publicly displaying the explicit list of regulated NBFC partners or co-lending contracts.',
      severity: 'MEDIUM',
      scoreImpact: 45,
      evidence: 'RBI Digital Lending Guidelines require DSAs to prominently list all partnering NBFCs and direct links.',
      source: 'Regulatory Compliance Checker',
      confidence: 88
    },
    {
      id: 'sig-c2',
      category: 'IDENTITY',
      title: 'Lead Generation / Aggregator Identity',
      description: 'Entity is a registered tech company but not a financial institution. Your data will likely be sold or shared with multiple third parties.',
      severity: 'MEDIUM',
      scoreImpact: 40,
      evidence: 'MCA records confirm IT consulting classification rather than financial services.',
      source: 'MCA Corporate Registry',
      confidence: 95
    },
    {
      id: 'sig-c3',
      category: 'DIGITAL',
      title: 'Missing Designated Grievance Officer',
      description: 'Website does not designate a named Grievance Redressal Officer with physical address and resolution turnaround timeline.',
      severity: 'LOW',
      scoreImpact: 35,
      evidence: 'Governance inspection found generic contact email only.',
      source: 'Website Governance Auditor',
      confidence: 90
    },
    {
      id: 'sig-c4',
      category: 'PERMISSIONS',
      title: 'Broad Storage Permission on Mobile App',
      description: 'App requests broad storage read permission instead of utilizing scoped document pickers.',
      severity: 'LOW',
      scoreImpact: 25,
      evidence: 'APK manifest inspect: READ_EXTERNAL_STORAGE present without scoped restriction.',
      source: 'Play Store App Manifest',
      confidence: 85
    },
    {
      id: 'sig-c5',
      category: 'LANGUAGE',
      title: 'Data Sharing Consent in Small Print',
      description: 'Terms of service include broad consent clauses permitting lead sharing with unaffiliated telemarketers.',
      severity: 'MEDIUM',
      scoreImpact: 42,
      evidence: 'NLP detected lead syndication consent language in user agreement.',
      source: 'Privacy Agreement Analyzer',
      confidence: 89
    },
    {
      id: 'sig-c6',
      category: 'REPUTATION',
      title: 'Frequent Telemarketing Lead Complaints',
      description: 'Consumer forums note frequent promotional phone calls after loan inquiry submission.',
      severity: 'LOW',
      scoreImpact: 30,
      evidence: '12 user mentions regarding unsolicited sales calls on public consumer forums.',
      source: 'Public Sentiment Index',
      confidence: 80
    }
  ]
};

export const LOW_RISK_SCENARIO: LenderProfile = {
  id: 'low-risk',
  name: 'Tata Capital Financial Services',
  url: 'https://tatadigitalfinance.com',
  logoText: 'Tata Capital',
  description: 'Direct RBI-registered Non-Banking Financial Company (NBFC-ICC) offering transparent consumer and business credit solutions.',
  claimedRegistrationNo: 'RBI/NBFC/N-13.01824',
  claimedParentCompany: 'Tata Capital Limited (Tata Sons Group)',
  appPackageName: 'com.tatacapital.digital.loans',
  reputationNotes: [
    'Highly reputable AAA-rated Non-Banking Financial Company.',
    'Over 15 years of continuous regulatory compliance with RBI.',
    'Transparent APR, key fact statements, and grievance redressal systems.'
  ],
  forensics: {
    domainAge: {
      days: 3420,
      formatted: '9.3 years old',
      registeredDate: '2017-03-12',
      expiresDate: '2028-03-12',
      status: 'TRUSTED'
    },
    ssl: {
      valid: true,
      issuer: 'DigiCert Extended Validation TLS CA G2',
      type: 'EV',
      expiryDate: '2027-04-15'
    },
    registrar: {
      name: 'MarkMonitor Inc. (Enterprise Corporate Registrar)',
      country: 'India',
      privacyProtected: false,
      whoisAbuseEmail: 'abusecomplaints@markmonitor.com'
    },
    websiteIdentity: {
      claimedName: 'Tata Capital Financial Services Limited',
      registeredCompanyName: 'Tata Capital Financial Services Limited',
      legalEntityType: 'Systemically Important Non-Deposit Taking NBFC (NBFC-ICC)'
    },
    contactInfo: {
      email: 'contactus@tatacapital.com',
      emailType: 'CORPORATE',
      phone: '1800 209 6060 (Toll Free 24x7)',
      tollFreeAvailable: true
    },
    physicalAddress: {
      claimedAddress: '11th Floor, Tower A, Peninsula Business Park, Ganpatrao Kadam Marg, Lower Parel, Mumbai 400013',
      verifiedOnOfficialRegistry: true,
      isVirtualOfficeOrCoworking: false
    },
    governance: {
      privacyPolicyFound: true,
      privacyPolicyValidUrl: true,
      termsFound: true,
      grievanceOfficerListed: true,
      grievanceOfficerContact: 'grievance.redressal@tatacapital.com / Nodal Officer: Mr. S. Iyer',
      rbiOmbudsmanDetailsListed: true,
      fairPracticesCodeListed: true
    },
    technical: {
      hostingProvider: 'Tata Communications Ltd / Akamai Edge Cloud',
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
      explanation: 'No contact access requested. Strict compliance with RBI digital lending directives.'
    },
    {
      name: 'Read SMS / OTP Messages',
      code: 'android.permission.READ_SMS',
      requested: false,
      expectedNecessity: 'PROHIBITED',
      riskLevel: 'LOW',
      explanation: 'Uses Google SMS Retriever API for one-time password verification without accessing personal inbox.'
    },
    {
      name: 'Approximate Location',
      code: 'android.permission.ACCESS_COARSE_LOCATION',
      requested: true,
      expectedNecessity: 'OPTIONAL',
      riskLevel: 'LOW',
      explanation: 'Used strictly at runtime during digital KYC verification as required by anti-money laundering norms.'
    },
    {
      name: 'Camera (KYC Only)',
      code: 'android.permission.CAMERA',
      requested: true,
      expectedNecessity: 'ESSENTIAL',
      riskLevel: 'LOW',
      explanation: 'Runtime permission invoked only during video KYC session with customer consent.'
    },
    {
      name: 'Storage Access',
      code: 'android.permission.READ_EXTERNAL_STORAGE',
      requested: false,
      expectedNecessity: 'UNNECESSARY',
      riskLevel: 'LOW',
      explanation: 'Uses Android System File Picker; does not request broad file storage permissions.'
    },
    {
      name: 'Phone State',
      code: 'android.permission.READ_PHONE_STATE',
      requested: false,
      expectedNecessity: 'UNNECESSARY',
      riskLevel: 'LOW',
      explanation: 'Complies with Google Play financial privacy guidelines.'
    }
  ],
  languagePatterns: [
    {
      pattern: 'Transparent APR Disclosure',
      foundText: 'Annual Percentage Rate (APR) ranges from 10.99% to 24.00% p.a. Repayment tenure from 12 to 84 months.',
      location: 'Product Page Header & Loan Calculator',
      riskLevel: 'LOW',
      explanation: 'Standard, legally compliant transparent disclosure of interest rates and tenure ranges.'
    },
    {
      pattern: 'Key Fact Statement (KFS)',
      foundText: 'Download sample Key Fact Statement (KFS) with all-inclusive cost breakdown.',
      location: 'Application Form',
      riskLevel: 'LOW',
      explanation: 'Provides full pre-contractual Key Fact Statement in compliance with RBI norms.'
    },
    {
      pattern: 'No Upfront Fee Guarantee',
      foundText: 'Tata Capital does not charge any upfront cash fees before loan sanction.',
      location: 'Consumer Safety Warning Notice',
      riskLevel: 'LOW',
      explanation: 'Explicit consumer safety warning advising borrowers against advance-fee scams.'
    }
  ],
  claimsVsReality: [
    {
      id: 'cvr-l1',
      claim: 'RBI Registered Systemically Important NBFC',
      reality: 'Registration number N-13.01824 is active, verified, and mapped directly to Tata Capital Financial Services Ltd on RBI Master Database.',
      status: 'VERIFIED',
      category: 'REGULATORY',
      explanation: 'Digital entity, legal certificate of incorporation, and domain mapping match 100%.'
    },
    {
      id: 'cvr-l2',
      claim: 'Enterprise Domain Ownership & EV SSL',
      reality: 'Domain is registered to Tata Capital Ltd via MarkMonitor enterprise registrar, secured by Extended Validation SSL.',
      status: 'VERIFIED',
      category: 'DIGITAL',
      explanation: 'No anonymous whois or third-party intermediary proxy detected.'
    },
    {
      id: 'cvr-l3',
      claim: 'Official Nodal Officer & RBI Ombudsman Scheme',
      reality: 'Dedicated Principal Nodal Officer contact, physical escalation matrix, and RBI Ombudsman links are active and functional.',
      status: 'VERIFIED',
      category: 'REGULATORY',
      explanation: 'Complete adherence to Fair Practices Code.'
    },
    {
      id: 'cvr-l4',
      claim: 'Official Verified App on Google Play & iOS App Store',
      reality: 'App published under verified Tata Capital corporate developer account with zero invasive permissions.',
      status: 'VERIFIED',
      category: 'IDENTITY',
      explanation: 'Developer identity matches website domain and corporate PAN/CIN.'
    }
  ],
  identityGraph: {
    summary: '100% Verified Identity Chain. Domain, website, corporate entity, RBI registry, and mobile app form a continuous unbroken trusted graph.',
    nodes: [
      { id: 'node-url', label: 'tatadigitalfinance.com', sublabel: 'Input URL', type: 'USER_URL', status: 'VERIFIED', details: 'Domain active 9.3 years, EV SSL certified.' },
      { id: 'node-domain', label: 'Domain: tatadigitalfinance.com', sublabel: 'Registrar: MarkMonitor Inc.', type: 'DOMAIN', status: 'VERIFIED', details: 'Direct enterprise corporate ownership.' },
      { id: 'node-website', label: 'Tata Capital Web Portal', sublabel: 'Tata Communications Akamai CDN', type: 'WEBSITE', status: 'VERIFIED', details: 'EV SSL, active security headers, DNSSEC enabled.' },
      { id: 'node-claimed', label: 'Tata Capital Financial Services', sublabel: 'CIN: U67100MH2010PLC210201', type: 'CLAIMED_LENDER', status: 'VERIFIED', details: 'Valid corporate registration on Ministry of Corporate Affairs.' },
      { id: 'node-regulated', label: 'RBI Regulated NBFC-ICC', sublabel: 'RBI Reg: N-13.01824', type: 'REGULATED_ENTITY', status: 'VERIFIED', details: 'Listed on RBI active authorized financial institutions directory.' },
      { id: 'node-app', label: 'Tata Capital Mobile App', sublabel: 'Play Store & App Store', type: 'APP', status: 'VERIFIED', details: 'Verified corporate badge, zero prohibited permissions.' },
      { id: 'node-dev', label: 'Tata Capital Limited', sublabel: 'Official Developer Org', type: 'DEVELOPER', status: 'VERIFIED', details: 'Matches corporate identity & domain verification records.' }
    ],
    edges: [
      { from: 'node-url', to: 'node-domain', label: 'Resolves To', status: 'VERIFIED', notes: 'Authentic domain resolution.' },
      { from: 'node-domain', to: 'node-website', label: 'Hosts', status: 'VERIFIED', notes: 'Secure enterprise infrastructure.' },
      { from: 'node-website', to: 'node-claimed', label: 'Operated By', status: 'VERIFIED', notes: 'Direct legal entity match.' },
      { from: 'node-claimed', to: 'node-regulated', label: 'Licensed As', status: 'VERIFIED', notes: 'RBI Master Directory verified.' },
      { from: 'node-website', to: 'node-app', label: 'Official App', status: 'VERIFIED', notes: 'Store verified digital lending app.' },
      { from: 'node-app', to: 'node-dev', label: 'Published By', status: 'VERIFIED', notes: 'Direct developer organization match.' }
    ]
  },
  rawSignals: [
    {
      id: 'sig-l1',
      category: 'REGULATORY',
      title: 'Verified RBI NBFC License & Active Status',
      description: 'Lender registration number N-13.01824 is active on the RBI official registry and matches the domain and corporate entity exactly.',
      severity: 'POSITIVE',
      scoreImpact: 0,
      evidence: 'Direct cross-match with RBI Centralized Registry of Regulated Entities.',
      source: 'RBI Master Banking & NBFC Database',
      confidence: 99
    },
    {
      id: 'sig-l2',
      category: 'IDENTITY',
      title: 'Continuous Identity & Infrastructure Verification',
      description: 'Domain, corporate registry, DNS, and app developer belong to the same verified enterprise corporate structure.',
      severity: 'POSITIVE',
      scoreImpact: 0,
      evidence: 'Enterprise EV SSL issued to Tata Capital Financial Services Limited.',
      source: 'Identity Graph Analyzer',
      confidence: 98
    },
    {
      id: 'sig-l3',
      category: 'DIGITAL',
      title: 'Established Domain (>9 Years) & Enterprise SSL',
      description: 'Domain has been active continuously for over 9 years with clean historical ownership and DNSSEC cryptographic protection.',
      severity: 'POSITIVE',
      scoreImpact: 0,
      evidence: 'Registered in March 2017 with continuous renewal through 2028.',
      source: 'Historical WHOIS & DNSSEC Auditor',
      confidence: 99
    },
    {
      id: 'sig-l4',
      category: 'PERMISSIONS',
      title: 'Strict Adherence to RBI App Permission Norms',
      description: 'Mobile app does not access contacts, SMS inbox, or external media storage. Only runtime KYC camera access is requested.',
      severity: 'POSITIVE',
      scoreImpact: 0,
      evidence: 'Zero high-risk permissions detected in manifest inspection.',
      source: 'Mobile App Store Security Scan',
      confidence: 98
    },
    {
      id: 'sig-l5',
      category: 'LANGUAGE',
      title: 'Standard APR & Transparent Fee Disclosures',
      description: 'Provides upfront Annual Percentage Rate (APR) calculator, Key Fact Statement (KFS), and explicit anti-scam warnings.',
      severity: 'POSITIVE',
      scoreImpact: 0,
      evidence: 'Standard compliant loan pricing disclosures found across all consumer touchpoints.',
      source: 'Lending Disclosure NLP Auditor',
      confidence: 95
    },
    {
      id: 'sig-l6',
      category: 'REPUTATION',
      title: 'Strong Institutional Rating & Ombudsman Redressal',
      description: 'AAA credit rating, functional Grievance Redressal Officer, and direct linkage to RBI Integrated Ombudsman Scheme.',
      severity: 'POSITIVE',
      scoreImpact: 0,
      evidence: 'Official Ombudsman notice and escalation matrix fully verified.',
      source: 'Financial Governance Records',
      confidence: 96
    }
  ]
};

export const DEMO_SCENARIOS = {
  'high-risk': HIGH_RISK_SCENARIO,
  'caution': CAUTION_SCENARIO,
  'low-risk': LOW_RISK_SCENARIO,
};
