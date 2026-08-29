import {
  AppScanRequest,
  DemoScenarioResponse,
  HealthResponse,
  LenderRecordResponse,
  Permissions,
  ScanRequest,
  ScanResponse,
} from './api-types';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://127.0.0.1:8000';

export class ApiError extends Error {
  status?: number;
  data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Common fetch helper with timeout and standardized error handling.
 */
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(options.headers || {}),
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = `Server error (${response.status})`;
      let errorData = null;
      try {
        errorData = await response.json();
        if (errorData?.detail) {
          errorMessage = typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail);
        } else if (errorData?.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // Response was not JSON
      }

      throw new ApiError(errorMessage, response.status, errorData);
    }

    const data: T = await response.json();
    return data;
  } catch (error: unknown) {
    clearTimeout(timeoutId);

    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('Request timed out. The backend server took too long to respond.', 408);
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError(
        'LoanShield backend is unavailable. Please make sure the FastAPI backend is running at ' +
          API_BASE_URL +
          ' and try again.',
        503
      );
    }

    throw new ApiError(
      error instanceof Error ? error.message : 'An unexpected error occurred while communicating with the backend.',
      500
    );
  }
}

/**
 * Scan a digital lender website URL via POST /scan.
 */
export async function scanWebsite(targetUrl: string): Promise<ScanResponse> {
  let normalizedUrl = targetUrl.trim();
  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = `https://${normalizedUrl}`;
  }

  const payload: ScanRequest = { url: normalizedUrl };

  return fetchApi<ScanResponse>('/scan', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Scan a digital lender app and its requested Android permissions via POST /scan/app.
 */
export async function scanApp(
  targetUrl: string,
  permissions: Permissions = {},
  statedPurpose: string = 'LOAN APPLICATION'
): Promise<ScanResponse> {
  let normalizedUrl = targetUrl.trim();
  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = `https://${normalizedUrl}`;
  }

  const payload: AppScanRequest = {
    url: normalizedUrl,
    permissions,
    stated_purpose: statedPurpose,
  };

  return fetchApi<ScanResponse>('/scan/app', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Retrieve synthetic demo scenario metadata via GET /demo/{scenario}.
 * Supported scenarios: 'verified' | 'quickrupee'
 */
export async function getDemoScenario(scenario: string): Promise<DemoScenarioResponse> {
  return fetchApi<DemoScenarioResponse>(`/demo/${encodeURIComponent(scenario)}`);
}

/**
 * Retrieve local synthetic demo registry records for a claimed entity via GET /lenders/{name}.
 */
export async function getLenderRecord(name: string): Promise<LenderRecordResponse> {
  return fetchApi<LenderRecordResponse>(`/lenders/${encodeURIComponent(name)}`);
}

/**
 * Check backend service health via GET /health.
 */
export async function healthCheck(): Promise<HealthResponse> {
  return fetchApi<HealthResponse>('/health');
}
