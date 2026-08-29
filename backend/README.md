# LoanShield Backend

An explainable FastAPI prototype for assessing risky digital lending websites. It uses safe HTTP retrieval, BeautifulSoup parsing, deterministic lender/claim extraction, synthetic-registry identity checks, transparency and predatory-language signals, optional app permission analysis, and a configurable rule policy returning `LOWER_RISK`, `CAUTION`, or `HIGH_RISK`.

The records in `data/` are explicitly synthetic demo data and are not official RBI data. Domain age and reputation are unknown by default. No single signal, including RBI presence, domain age, NLP, or reputation, is treated as a verdict. The backend does not certify safety or fraud.

Run with `python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && uvicorn app.main:app --reload`, then open `/docs`. Endpoints are `GET /health`, `POST /scan`, `POST /scan/app`, `GET /lenders/{name}`, and `GET /demo/{scenario}`. Security controls include URL validation, SSRF blocking for local/private IPs, timeouts, redirect limits, response-size limits, no JavaScript execution, and graceful retrieval failure.
