# Credence Backend

An explainable FastAPI service for assessing digital lending websites and detecting fraudulent loan platforms. It combines safe HTTP retrieval, BeautifulSoup parsing, deterministic lender/claim extraction, synthetic-registry identity checks, brand lookalike impersonation detection, transparency signals, and mobile permission analysis.

The local registry records in `data/` are synthetic demo data and not official RBI records. Credence provides explainable risk intelligence based on observed evidence and does not make a legal determination of fraud.

Run with:
```bash
uvicorn app.main:app --host 127.0.0.1 --port 8000
```
Open `http://127.0.0.1:8000/docs` for the interactive API Swagger UI.
