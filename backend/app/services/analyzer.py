import asyncio, csv, ipaddress, os, re, socket
from pathlib import Path
from urllib.parse import urljoin, urlparse
import httpx, tldextract
from bs4 import BeautifulSoup

def public_url(url: str):
    p = urlparse(url)
    if p.scheme not in {'http', 'https'} or not p.hostname:
        return False, 'Only HTTP(S) URLs with a hostname are accepted.'
    if p.hostname.lower() in {'localhost', 'localhost.localdomain'}:
        return False, 'Localhost targets are blocked.'
    try:
        for x in socket.getaddrinfo(p.hostname, None):
            ip = ipaddress.ip_address(x[4][0])
            if (
                ip.is_private
                or ip.is_loopback
                or ip.is_link_local
                or ip.is_multicast
                or ip.is_reserved
                or ip.is_unspecified
            ):
                return False, 'Private or internal network targets are blocked.'
    except socket.gaierror:
        pass
    return True, ''

def same_domain(u1: str, u2: str) -> bool:
    try:
        e1 = tldextract.extract(urlparse(u1).hostname or '')
        e2 = tldextract.extract(urlparse(u2).hostname or '')
        d1 = e1.top_domain_under_public_suffix or urlparse(u1).hostname or ''
        d2 = e2.top_domain_under_public_suffix or urlparse(u2).hostname or ''
        return bool(d1 and d1.lower() == d2.lower())
    except Exception:
        return False

def domain(url: str):
    p = urlparse(url)
    e = tldextract.extract(p.hostname or '')
    reg_dom = e.top_domain_under_public_suffix or p.hostname or ''
    return {
        'domain': reg_dom,
        'subdomain': e.subdomain,
        'tld': e.suffix,
        'https': p.scheme == 'https',
        'domain_age_days': None,
        'domain_age_status': 'unknown'
    }

TRANSPARENCY_SPECS = {
    'privacy_policy': {
        'label': 'Privacy Policy',
        'link_keywords': ['privacy', 'privacy-policy', 'privacypolicy', 'privacy_policy', 'data-privacy', 'privacy-notice', 'dataprotection'],
        'text_patterns': [
            r'privacy\s+policy',
            r'privacy\s+notice',
            r'data\s+privacy',
            r'privacy\s+statement',
            r'privacypolicy',
            r'protection\s+of\s+(?:personal\s+)?data',
            r'personal\s+data\s+protection',
            r'cookie\s+policy'
        ],
        'common_paths': ['/privacy-policy', '/privacy', '/privacypolicy', '/privacy_policy', '/privacy-notice', '/legal/privacy-policy']
    },
    'terms': {
        'label': 'Terms & Conditions',
        'link_keywords': ['terms', 'terms-and-conditions', 'terms-of-use', 'terms-of-service', 'tos', 'terms_conditions', 'conditions', 'legal'],
        'text_patterns': [
            r'terms\s+(?:and|&)\s+conditions',
            r'terms\s+of\s+(?:service|use)',
            r'terms-and-conditions',
            r'user\s+agreement',
            r'terms\s+of\s+loan',
            r'sanction\s+terms',
            r'terms\s*&\s*conditions',
            r'disclaimer'
        ],
        'common_paths': ['/terms-and-conditions', '/terms-of-use', '/terms-of-service', '/terms', '/terms_and_conditions', '/termsconditions', '/legal/terms']
    },
    'grievance_mechanism': {
        'label': 'Grievance / Redressal',
        'link_keywords': ['grievance', 'complaint', 'nodal', 'escalat', 'redressal', 'dispute', 'ombudsman', 'feedback'],
        'text_patterns': [
            r'grievance',
            r'complaint',
            r'escalat',
            r'nodal\s+officer',
            r'ombudsman',
            r'redressal',
            r'grievance\s+redressal',
            r'dispute\s+resolution',
            r'customer\s+grievance'
        ],
        'common_paths': ['/grievance', '/grievance-redressal', '/grievanceredressal', '/complaints', '/nodal-officer', '/grievances', '/feedback']
    },
    'lender_identity': {
        'label': 'About / Lender Identity',
        'link_keywords': ['about', 'about-us', 'about_us', 'corporate', 'who-we-are', 'our-story', 'company', 'organization', 'overview'],
        'text_patterns': [
            r'\blender\b',
            r'\bnbfc\b',
            r'\bbank\b',
            r'\bfinance\b',
            r'about\s+us',
            r'corporate\s+identity',
            r'cin\s*:',
            r'registered\s+office',
            r'corporate\s+office',
            r'member\s+lending\s+institution',
            r'government\s+sponsored\s+schemes',
            r'national\s+portal',
            r'financial\s+institution'
        ],
        'common_paths': ['/about-us', '/about', '/about_us', '/corporate', '/who-we-are', '/company-profile']
    },
    'contact': {
        'label': 'Contact & Support',
        'link_keywords': ['contact', 'contact-us', 'contact_us', 'reach-us', 'support', 'help', 'helpdesk'],
        'text_patterns': [
            r'contact\s+us',
            r'customer\s+care',
            r'toll\s*free',
            r'toll-free',
            r'support@',
            r'email\s*:',
            r'phone\s*:',
            r'helpline',
            r'call\s+us',
            r'contact-us',
            r'get\s+in\s+touch'
        ],
        'common_paths': ['/contact-us', '/contact', '/contact_us', '/reach-us', '/support', '/help']
    }
}

async def fetch_page(client: httpx.AsyncClient, url: str, max_bytes: int = 1000000):
    ok, err = public_url(url)
    if not ok:
        return {
            'retrieved': False,
            'error': err,
            'url': url,
            'status_code': None,
            'title': '',
            'text': '',
            'script_text': '',
            'raw_html': '',
            'links': [],
            'scripts': [],
            'emails': [],
            'phones': []
        }
    try:
        r = await client.get(url)
        raw = r.content[:max_bytes]
        soup = BeautifulSoup(raw, 'html.parser')
        
        # Extract links before modifying the DOM
        raw_links = []
        for a in soup.find_all('a'):
            h = a.get('href', '')
            t = a.get_text(' ', strip=True)
            if h and not h.startswith(('javascript:', 'mailto:', 'tel:', '#')):
                abs_h = urljoin(str(r.url), h)
                raw_links.append({'text': t, 'href': abs_h, 'raw_href': h})
        
        # Extract script URLs
        scripts = []
        for s in soup.find_all('script'):
            src = s.get('src')
            if src:
                scripts.append(urljoin(str(r.url), src))

        # Capture inline script text for SPA route inspection
        script_text = ' '.join(s.get_text(' ', strip=True) for s in soup.find_all('script') if not s.get('src'))

        # Strip non-text elements
        for x in soup(['script', 'style', 'noscript', 'svg']):
            x.decompose()
            
        page_text = ' '.join(soup.get_text(' ', strip=True).split())
        title = soup.title.get_text(strip=True) if soup.title else ''
        
        emails = sorted(set(re.findall(r'[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}', page_text)))
        phones = sorted(set(re.findall(r'(?:\+?91[-\s]?)?[6-9]\d{9}', page_text)))
        
        return {
            'retrieved': True,
            'url': str(r.url),
            'status_code': r.status_code,
            'title': title,
            'text': page_text[:200000],
            'script_text': script_text[:50000],
            'raw_html': raw[:100000].decode('utf-8', errors='ignore'),
            'links': raw_links[:200],
            'scripts': scripts[:30],
            'emails': emails,
            'phones': phones
        }
    except Exception as e:
        return {
            'retrieved': False,
            'error': f'Website retrieval failed: {type(e).__name__}',
            'url': url,
            'status_code': None,
            'title': '',
            'text': '',
            'script_text': '',
            'raw_html': '',
            'links': [],
            'scripts': [],
            'emails': [],
            'phones': []
        }

def registry(name: str):
    if not name:
        return None
    try:
        csv_path = Path(__file__).parents[2] / 'data/lenders.csv'
        if not csv_path.exists():
            return None
        rows = list(csv.DictReader(csv_path.open(encoding='utf-8')))
        return next((r for r in rows if name and name.lower() in r['entity_name'].lower()), None)
    except Exception:
        return None

def extract(text: str, title: str):
    s = f'{title} {text}'
    hits = [
        n for n, p in {
            'RBI claim': r'\bRBI\s*(?:approved|registered|regulated|licensed)\b',
            'partner claim': r'\b(?:powered by|partnered with)\b',
            'NBFC claim': r'\bNBFC\b'
        }.items()
        if re.search(p, s, re.I)
    ]
    names = re.findall(r'\b([A-Z][A-Za-z]*(?:Rupee|Finance|Bank|Credit|Loans))\b', s)
    return {'claimed_lender': names[0] if names else None, 'claims': hits}

async def audit_transparency(main_url: str, main_page: dict, client: httpx.AsyncClient):
    """
    Safe, bounded same-domain crawler (max 10 relevant internal pages)
    evaluating:
    - Privacy Policy
    - Terms / Terms & Conditions
    - Grievance / Complaints
    - About / Lender Identity
    - Contact
    
    Distinguishes between:
    1. FOUND
    2. NOT_FOUND_AFTER_CHECKING
    3. COULD_NOT_RETRIEVE
    """
    if not main_page.get('retrieved'):
        res = {k: False for k in TRANSPARENCY_SPECS}
        details = {
            k: {
                'status': 'COULD_NOT_RETRIEVE',
                'retrieval_status': 'COULD_NOT_RETRIEVE',
                'error': main_page.get('error', 'Target page could not be retrieved')
            }
            for k in TRANSPARENCY_SPECS
        }
        return res, details, []

    # 1. Discover potential same-domain links
    target_urls_by_cat = {k: [] for k in TRANSPARENCY_SPECS}
    all_discovered_links = list(main_page.get('links', []))
    
    # Also parse router links from raw HTML & script tags for SPAs
    raw_source = main_page.get('raw_html', '') + ' ' + main_page.get('script_text', '')
    router_links = re.findall(r'routerLink["\':\s]+([/a-zA-Z0-9_\-]+)', raw_source) + re.findall(r'path["\':\s]+([a-zA-Z0-9_\-]+)', raw_source)
    for rl in router_links:
        full_u = urljoin(main_url, '/' + rl.lstrip('/'))
        all_discovered_links.append({'text': rl, 'href': full_u, 'raw_href': rl})

    # Classify links into categories
    for link in all_discovered_links:
        href = link['href']
        text = link['text'].lower()
        href_lower = href.lower()
        
        if not same_domain(main_url, href):
            continue
            
        for cat, spec in TRANSPARENCY_SPECS.items():
            if any(kw in text or kw in href_lower for kw in spec['link_keywords']):
                if href not in target_urls_by_cat[cat]:
                    target_urls_by_cat[cat].append(href)

    # Add top candidate fallback paths for any category missing explicit links
    for cat, spec in TRANSPARENCY_SPECS.items():
        if not target_urls_by_cat[cat]:
            for cp in spec['common_paths'][:2]:
                cand_u = urljoin(main_url, cp)
                if cand_u not in target_urls_by_cat[cat]:
                    target_urls_by_cat[cat].append(cand_u)

    # 2. Select up to 10 unique internal candidate URLs to fetch
    unique_candidates = []
    for cat in TRANSPARENCY_SPECS:
        for u in target_urls_by_cat[cat]:
            if (
                u not in unique_candidates
                and u.rstrip('/') != main_url.rstrip('/')
                and len(unique_candidates) < 10
            ):
                unique_candidates.append(u)

    # If main page has minimal text (< 800 chars), inspect same-domain JS bundle (e.g. Angular/React SPA)
    js_bundle_text = ""
    if len(main_page.get('text', '')) < 800:
        for s_url in main_page.get('scripts', []):
            if same_domain(main_url, s_url):
                try:
                    js_r = await client.get(s_url, timeout=5)
                    if js_r.status_code == 200:
                        js_bundle_text += " " + js_r.text
                except Exception:
                    pass

    # 3. Bounded concurrent fetch of internal pages
    crawled_pages = []
    if unique_candidates:
        tasks = [fetch_page(client, u) for u in unique_candidates]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        for u, res in zip(unique_candidates, results):
            if isinstance(res, dict):
                crawled_pages.append(res)
            else:
                crawled_pages.append({
                    'retrieved': False,
                    'url': u,
                    'error': str(res),
                    'status_code': None,
                    'title': '',
                    'text': '',
                    'script_text': '',
                    'raw_html': '',
                    'links': [],
                    'scripts': [],
                    'emails': [],
                    'phones': []
                })

    # 4. Evaluate each transparency signal
    tr_boolean = {}
    details = {}
    
    for cat, spec in TRANSPARENCY_SPECS.items():
        found = False
        found_info = None
        
        # Check main page
        for p in spec['text_patterns']:
            m = re.search(p, main_page.get('text', ''), re.I)
            if m:
                found = True
                start, end = max(0, m.start() - 40), min(len(main_page.get('text', '')), m.end() + 60)
                found_info = {
                    'status': 'FOUND',
                    'retrieval_status': 'FOUND',
                    'found_on': main_page.get('url', main_url),
                    'matched_pattern': m.group(0),
                    'snippet': main_page.get('text', '')[start:end]
                }
                break
        
        # Check crawled internal pages
        if not found:
            for page in crawled_pages:
                if not page.get('retrieved'):
                    continue
                for p in spec['text_patterns']:
                    m = re.search(p, page.get('text', ''), re.I)
                    if m:
                        found = True
                        start, end = max(0, m.start() - 40), min(len(page.get('text', '')), m.end() + 60)
                        found_info = {
                            'status': 'FOUND',
                            'retrieval_status': 'FOUND',
                            'found_on': page.get('url'),
                            'matched_pattern': m.group(0),
                            'snippet': page.get('text', '')[start:end]
                        }
                        break
                if found:
                    break

        # Check SPA script bundle if still not found
        if not found and js_bundle_text:
            for p in spec['text_patterns']:
                m = re.search(p, js_bundle_text, re.I)
                if m:
                    found = True
                    start, end = max(0, m.start() - 40), min(len(js_bundle_text), m.end() + 60)
                    found_info = {
                        'status': 'FOUND',
                        'retrieval_status': 'FOUND',
                        'found_on': main_url,
                        'matched_pattern': m.group(0),
                        'snippet': js_bundle_text[start:end].replace('\n', ' ')
                    }
                    break

        tr_boolean[cat] = found
        if found and found_info:
            details[cat] = found_info
        else:
            checked = [p['url'] for p in crawled_pages if p.get('retrieved')]
            failed = [p['url'] for p in crawled_pages if not p.get('retrieved')]
            
            if checked or main_page.get('retrieved'):
                details[cat] = {
                    'status': 'NOT_FOUND_AFTER_CHECKING',
                    'retrieval_status': 'NOT_FOUND_AFTER_CHECKING',
                    'checked_urls': [main_url] + checked,
                    'failed_urls': failed
                }
            else:
                details[cat] = {
                    'status': 'COULD_NOT_RETRIEVE',
                    'retrieval_status': 'COULD_NOT_RETRIEVE',
                    'error': 'Target internal pages could not be retrieved'
                }

    crawled_summary = [
        {
            'url': p.get('url'),
            'retrieved': p.get('retrieved'),
            'status_code': p.get('status_code'),
            'error': p.get('error')
        }
        for p in crawled_pages
    ]

    return tr_boolean, details, crawled_summary

async def analyze(url: str, permissions=None, purpose: str = 'LOAN APPLICATION'):
    timeout_sec = float(os.getenv('REQUEST_TIMEOUT_SECONDS', '8'))
    max_redirects = int(os.getenv('MAX_REDIRECTS', '3'))
    max_bytes = int(os.getenv('MAX_RESPONSE_BYTES', '1000000'))
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 LoanShield/0.1'
    }
    
    async with httpx.AsyncClient(
        timeout=timeout_sec,
        follow_redirects=True,
        max_redirects=max_redirects,
        headers=headers
    ) as client:
        w = await fetch_page(client, url, max_bytes)
        tr, tr_details, crawled_pages = await audit_transparency(url, w, client)
        
    c = extract(w.get('text', ''), w.get('title', ''))
    row = registry(c['claimed_lender'])
    d = domain(url)
    text = w.get('text', '').lower()
    
    # NLP semantic checks
    pats = {
        'Guaranteed approval': r'guaranteed\s+approval',
        'Instant loan': r'instant\s+loan',
        'No credit check': r'no\s+credit\s+check',
        'No documents': r'no\s+documents?',
        'Act now': r'act\s+now',
        'Urgent': r'\burgent\b'
    }
    found = [n for n, p in pats.items() if re.search(p, text, re.I)]
    nlp = min(1.0, len(found) * 0.18)
    
    # Permissions evaluation
    permissions = permissions or {}
    rule = {
        'contacts': ('HIGH', 'Contacts access is disproportionate for a lending application.'),
        'sms': ('HIGH', 'SMS access can expose sensitive messages and OTPs.'),
        'call_logs': ('HIGH', 'Call-log access is disproportionate for a lending application.'),
        'storage': ('MEDIUM', 'Storage needs a narrow document-upload purpose.'),
        'gallery': ('MEDIUM', 'Gallery access may be reasonable only for user-initiated KYC.'),
        'camera': ('LOW', 'Camera can be potentially reasonable for KYC.'),
        'microphone': ('HIGH', 'Microphone is not ordinarily needed for lending.')
    }
    findings = [
        {'permission': k, 'purpose': purpose, 'severity': v[0], 'explanation': v[1]}
        for k, v in rule.items()
        if permissions.get(k)
    ]
    ps = min(1.0, sum({'LOW': 0.1, 'MEDIUM': 0.25, 'HIGH': 0.4}[x['severity']] for x in findings))
    
    # Identity graph
    ident = {
        'claimed_lender': c['claimed_lender'],
        'lender_found': bool(row),
        'association_verified': bool(row and row.get('rbi_dla_association') == 'True' and row.get('domain', '').rstrip('/') in url.rstrip('/')),
        'domain_match': bool(row and row.get('domain', '').rstrip('/') in url.rstrip('/'))
    }
    
    signals = []
    score = 0
    
    def add(n, s, x, e, ev):
        signals.append({'name': n, 'severity': s, 'score': round(x, 2), 'explanation': e, 'evidence': ev})
        
    if c['claimed_lender'] and not row:
        score += 25
        add(
            'Unverified lender identity',
            'HIGH',
            0.85,
            'The claimed lender was not found in the available synthetic registry.',
            {'claimed_lender': c['claimed_lender']}
        )
        
    if row and not ident['association_verified']:
        score += 25
        add(
            'Association not verified',
            'HIGH',
            0.9,
            'A matching entity exists, but its association with this domain is not verified.',
            {'record': row}
        )
        
    # Evaluate missing transparency signals only after same-domain check
    missing = [k for k, v in tr.items() if not v]
    if missing:
        score += min(18, len(missing) * 4)
        missing_labels = [TRANSPARENCY_SPECS[k]['label'] for k in missing if k in TRANSPARENCY_SPECS]
        add(
            'Missing transparency signals',
            'MEDIUM',
            min(1.0, len(missing) / 4),
            f'Key transparency disclosures were not found after auditing homepage and same-domain internal pages: {", ".join(missing_labels)}.',
            {
                'missing': missing,
                'missing_labels': missing_labels,
                'details': {k: tr_details[k] for k in missing if k in tr_details},
                'crawled_pages_count': len(crawled_pages)
            }
        )
        
    if nlp:
        score += nlp * 18
        add('Predatory language', 'HIGH' if nlp >= 0.6 else 'MEDIUM', nlp, 'Promotional pressure patterns were detected.', {'phrases': found})
        
    if ps:
        score += ps * 17
        add('Permission-purpose mismatch', 'HIGH' if ps >= 0.5 else 'MEDIUM', ps, 'Requested permissions may be disproportionate.', {'findings': findings})
        
    if not w.get('retrieved'):
        score += 12
        add('Website retrieval failure', 'MEDIUM', 0.5, 'The page could not be retrieved; evidence is limited.', {'error': w.get('error')})
        
    if not d['https']:
        score += 5
        add('No HTTPS', 'MEDIUM', 0.35, 'The URL does not use HTTPS.', {'https': False})
        
    score = min(100, round(score))
    risk_lower_max = int(os.getenv('RISK_LOWER_MAX', '30'))
    risk_caution_max = int(os.getenv('RISK_CAUTION_MAX', '60'))
    
    level = 'LOWER_RISK' if score <= risk_lower_max else ('CAUTION' if score <= risk_caution_max else 'HIGH_RISK')
    
    rec = {
        'HIGH_RISK': 'Do not submit personal documents, OTPs, bank credentials or payments until the lender identity is independently verified.',
        'CAUTION': 'Verify the lender independently before sharing sensitive information.',
        'LOWER_RISK': 'Available evidence did not reveal major warning signals, but LoanShield does not certify safety.'
    }[level]
    
    # Combined transparency category with backward-compatible booleans + rich audit details
    transparency_payload = {
        'privacy_policy': tr.get('privacy_policy', False),
        'terms': tr.get('terms', False),
        'grievance_mechanism': tr.get('grievance_mechanism', False),
        'lender_identity': tr.get('lender_identity', False),
        'contact': tr.get('contact', False),
        'details': tr_details,
        'crawled_pages': crawled_pages
    }
    
    return {
        'url': url,
        'risk_level': level,
        'risk_score': score,
        'evidence_strength': 'HIGH' if any(x['severity'] == 'HIGH' for x in signals) else 'MEDIUM',
        'identity': ident,
        'signals': signals,
        'categories': {
            'regulatory': {'record': row, 'claims': c['claims']},
            'digital': d,
            'transparency': transparency_payload,
            'language': {'score': nlp, 'detected_patterns': found},
            'permissions': {'score': ps, 'findings': findings},
            'reputation': {'status': 'unknown'},
            'website': {
                'retrieved': w.get('retrieved'),
                'status_code': w.get('status_code'),
                'title': w.get('title'),
                'emails': w.get('emails', []),
                'phones': w.get('phones', [])
            }
        },
        'recommendation': rec,
        'disclaimer': 'LoanShield provides a risk assessment based on available evidence. It does not certify that a lender is safe or fraudulent.'
    }
