import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas.scan import ScanRequest, AppScanRequest, ScanResponse
from app.services.analyzer import analyze, registry

app = FastAPI(
    title='LoanShield Backend',
    version='0.1.0',
    description='Explainable prototype risk assessment for digital lending websites.'
)

# CORS Configuration for local frontend origins
allowed_origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3005",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:3005",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/health')
def health():
    return {
        'status': 'ok',
        'service': 'loanshield-backend',
        'mode': 'demo' if os.getenv('DEMO_MODE', 'true').lower() == 'true' else 'live'
    }

@app.post('/scan', response_model=ScanResponse)
async def scan(req: ScanRequest):
    return await analyze(str(req.url))

@app.post('/scan/app', response_model=ScanResponse)
async def scan_app(req: AppScanRequest):
    return await analyze(str(req.url), req.permissions.model_dump(), req.stated_purpose)

@app.get('/lenders/{name}')
def lenders(name: str):
    r = registry(name)
    return {
        'records': [r] if r else [],
        'source_note': 'Local records are synthetic demo data, not official RBI data.'
    }

@app.get('/demo/{scenario}')
def demo(scenario: str):
    u = {
        'verified': 'https://verified-demo.loanshield.local',
        'quickrupee': 'https://quickrupee.demo'
    }
    if scenario not in u:
        raise HTTPException(404, 'Use verified or quickrupee.')
    return {
        'scenario': scenario,
        'url': u[scenario],
        'label': 'SYNTHETIC DEMO'
    }
