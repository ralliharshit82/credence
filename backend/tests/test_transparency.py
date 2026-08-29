import pytest
from app.services.analyzer import analyze, same_domain

def test_same_domain():
    assert same_domain('https://www.jansamarth.in', 'https://jansamarth.in/privacy') is True
    assert same_domain('https://www.jansamarth.in', 'https://www.jansamarth.in/terms') is True
    assert same_domain('https://www.jansamarth.in', 'https://google.com') is False

@pytest.mark.anyio
async def test_example_com_transparency():
    res = await analyze('https://example.com/')
    assert res['risk_score'] >= 0
    tr = res['categories']['transparency']
    assert 'details' in tr
    for sig in ['privacy_policy', 'terms', 'grievance_mechanism', 'lender_identity']:
        assert tr['details'][sig]['status'] in ['NOT_FOUND', 'NOT_FOUND_AFTER_CHECKING', 'FOUND', 'COULD_NOT_VERIFY', 'COULD_NOT_RETRIEVE']
