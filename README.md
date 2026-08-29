# 🛡️ LOANSHIELD — Explainable Digital Lender Trust Engine

> **Detect fraudulent digital lenders before you trust them.**

LOANSHIELD is an explainable trust engine that protects consumers from fraudulent loan apps and predatory digital lenders by auditing regulatory claims, digital footprints, same-domain transparency disclosures, and mobile APK permissions.

---

## 🌟 Key Features

1. **Regulatory Identity Verification**:
   - Cross-references claimed corporate lender names against central registries to detect impersonators.
   - Verifies whether the domain is actually registered to and associated with the claimed NBFC/Bank.

2. **Bounded Same-Domain Forensic Crawler**:
   - Discovers and audits same-domain internal pages and SPA client-side routes (Angular/React).
   - Verifies critical consumer governance signals:
     - **Privacy Policy**
     - **Terms & Conditions**
     - **Grievance Redressal / Complaints**
     - **Lender Identity / Registered Office**
     - **Contact & Customer Support**
   - Distinguishes between `FOUND`, `NOT_FOUND_AFTER_CHECKING`, and `COULD_NOT_RETRIEVE`.

3. **Mobile Permission & NLP Predatory Phrasing Audit**:
   - Flags invasive runtime Android permissions (e.g. Contacts, SMS scraping, Call logs).
   - Detects predatory pressure tactics (e.g. *"Guaranteed approval"*, *"No credit check"*, *"Act now"*).

4. **Explainable Risk Verdict & Score**:
   - Clear 3-tier risk verdict:
     - 🟢 **VERIFIED / LOWER RISK**
     - 🟡 **UNVERIFIED / CAUTION**
     - 🔴 **HIGH RISK**
   - Score gauge (0–100) with a concise, prominent **"Why this verdict"** summary and raw forensic JSON evidence.

---

## 🏗️ Architecture

```
loanshield/
├── backend/                  # FastAPI Python Backend
│   ├── app/
│   │   ├── main.py           # FastAPI entry point & CORS
│   │   ├── schemas/          # Pydantic request/response models
│   │   └── services/         # Forensic analyzer & bounded crawler
│   ├── data/                 # Local lender registry database
│   ├── tests/                # Pytest test suite
│   └── requirements.txt      # Python dependencies
├── src/                      # Next.js 15 App Router Frontend
│   ├── app/                  # Pages: Home, Scanner, Threat Intel, Methodology
│   ├── components/           # UI & Result components
│   ├── lib/                  # API client, types & utilities
│   └── styles/
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.17+ or v20+
- **Python**: 3.10+

---

### 1. Start the FastAPI Backend (Port 8000)

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

- **Backend API:** `http://127.0.0.1:8000`
- **Interactive Swagger Docs:** `http://127.0.0.1:8000/docs`
- **Health Check:** `http://127.0.0.1:8000/health`

---

### 2. Start the Next.js Frontend (Port 3000 / 3005)

```bash
# In the project root:
npm install

# Run the development server
npm run dev -- -p 3005
```

Open [http://localhost:3005](http://localhost:3005) in your browser.

---

## 🧪 Running Tests

### Backend Tests
```bash
cd backend
pytest tests/
```

### Frontend Build Verification
```bash
npm run build
```

---

## 📄 License
MIT License
