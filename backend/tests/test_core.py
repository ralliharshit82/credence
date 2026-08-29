from app.services.analyzer import public_url,domain,extract

def test_security_and_domain():
 assert public_url('http://localhost')[0] is False
 assert domain('https://sub.example.com/x')['domain']=='example.com'
def test_extraction():
 x=extract('RBI approved QuickRupee Instant loan no credit check','')
 assert x['claims'] and x['claimed_lender']=='QuickRupee'
