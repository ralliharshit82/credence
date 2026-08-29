import pytest
from app.services.analyzer import detect_brand_impersonation, lookup_threat_intel, analyze

def test_brand_impersonation_detection():
    # Official domain matches
    res_sbi = detect_brand_impersonation('https://sbi.co.in')
    assert res_sbi['detected'] is True
    assert res_sbi['is_official'] is True

    res_jansamarth = detect_brand_impersonation('https://www.jansamarth.in')
    assert res_jansamarth['detected'] is True
    assert res_jansamarth['is_official'] is True

    # Lookalike / Impersonations
    res_sbicf = detect_brand_impersonation('https://sbicf.co.in')
    assert res_sbicf['detected'] is True
    assert res_sbicf['is_official'] is False
    assert 'State Bank of India' in res_sbicf['matched_brand']

    res_hdfc = detect_brand_impersonation('https://hdfc-instant-loan.xyz')
    assert res_hdfc['detected'] is True
    assert res_hdfc['is_official'] is False

def test_threat_intel_lookup():
    rec = lookup_threat_intel('https://sbicf.co.in')
    assert rec is not None
    assert rec['status'] == 'DOCUMENTED_CASE'
    assert 'State Bank of India' in rec['description']

@pytest.mark.anyio
async def test_sbicf_is_high_risk():
    res = await analyze('https://sbicf.co.in')
    assert res['risk_level'] == 'HIGH_RISK'
    assert res['risk_score'] >= 65
    assert res['evidence_strength'] == 'HIGH'
    signal_names = [s['name'] for s in res['signals']]
    assert 'Potential brand impersonation' in signal_names or 'Historical threat intelligence match' in signal_names
