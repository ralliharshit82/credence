# 🛡️ CREDENCE — Explainable Digital Lender Trust Engine

> **An explainable trust engine for detecting fraudulent digital lenders — before you trust them.**

**Credence** is an explainable multi-vector trust engine designed to protect consumers, analysts, and regulators from fraudulent digital lending platforms, predatory loan apps, and domain lookalike impersonators by auditing regulatory identity, same-domain transparency disclosures, digital footprints, and mobile APK permissions.

---

## 🌟 Key Capabilities

1. **Brand & Entity Impersonation Detection**:
   - Compares claimed lending institutions (e.g. SBI, HDFC, ICICI, Bajaj, Axis, Kotak) against authoritative registry domains.
   - Detects brand lookalike typosquatting, suspicious TLD changes (e.g. `.xyz`, `.top`, `.online`), and unlinked intermediary claims.

2. **Bounded Same-Domain Forensic Crawler**:
   - Inspects internal pages and SPA routes (Angular/React) on the target lender's domain.
   - Audits mandatory consumer governance disclosures:
     - **Privacy Policy**
     - **Terms of Service**
     - **Grievance Redressal Mechanism & Officer**
     - **Lender Corporate Identity & Registered Office**
     - **Contact & Support Details**

3. **Multi-Signal Deterministic Risk Engine**:
   - Produces an explainable, weighted risk score (0–100) and 3-tier verdict:
     - 🟢 **LOW RISK** (Verified / Regulated)
     - 🟡 **MEDIUM RISK** (Caution / Unverified Broker)
     - 🔴 **HIGH RISK** (Impersonator / Severe Inconsistencies)
   - Outputs a **single clear safety recommendation** with zero ambiguous checklist redirects.

4. **Bilingual Voice Accessibility Engine**:
   - Built-in speech synthesis powered by native Web Speech API.
   - Speaks verdict, risk score, top forensic signals, and safety recommendations in **English** and **हिन्दी (Hindi)** with zero third-party cloud audio latency.

5. **Dynamic Threat Intelligence Telemetry**:
   - Real-time telemetry dashboard calculating active scan metrics, risk distributions, and prevalent threat vectors dynamically from actual user investigations.
   - Chronological audit log with live relative timestamps.

---

## 🏗️ Architecture

```
credence/
├── backend/                  # FastAPI Python Risk & Crawler Engine
│   ├── app/
│   │   ├── main.py           # FastAPI service & CORS middleware
│   │   ├── schemas/          # Pydantic request/response models
│   │   └── services/         # Multi-layer forensic analyzer
│   ├── data/                 # Local lender registry database
│   ├── tests/                # Pytest verification test suite
│   └── requirements.txt      # Python dependencies
├── src/                      # Next.js 15 App Router Frontend & Serverless API
│   ├── app/                  # Pages: Home Scanner, Threat Intel, Methodology
│   │   ├── api/              # Serverless cloud endpoints (/api/scan, /api/health)
│   ├── components/           # UI, Scanner, Results & Dashboard components
│   ├── lib/                  # API client, URL validator, Telemetry store & Types
│   └── globals.css           # Ice-Blue & Royal Slate styling
├── package.json
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.17+ or v20+
- **Python**: 3.10+ (for local FastAPI engine)

### 1. Run the Frontend (Next.js)
```bash
npm install
npm run dev -- -p 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Run the Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 127.0.0.1 --port 8000
```
- **API Base:** `http://127.0.0.1:8000`
- **Interactive Swagger Docs:** `http://127.0.0.1:8000/docs`

---

## ☁️ Live Cloud Deployment (Vercel)

Credence is engineered to be deployed directly to **Vercel** with zero configuration:

1. Push your repository to GitHub: `https://github.com/ralliharshit82/credence`
2. Go to [vercel.com/new](https://vercel.com/new) and log in with your GitHub account.
3. Import your **`credence`** repository.
4. Click **Deploy**.
5. Vercel will automatically build and deploy your live public link (e.g. `https://credence.vercel.app`), ready to paste into your presentation PPT!

---

## 📄 License
MIT License. Developed for Next-Gen Fintech Safety & Trust.
