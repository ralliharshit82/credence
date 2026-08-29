/**
 * Strict Client-Side URL Validator for LoanShield
 * Rejects malformed strings before sending requests to the backend.
 */

export interface UrlValidationResult {
  isValid: boolean;
  cleanUrl: string;
  errorMessage?: string;
  helperMessage?: string;
}

export function validateScanUrl(rawInput: string): UrlValidationResult {
  const defaultError = 'Invalid URL — Please enter a valid website URL.';
  const defaultHelper = 'Example: https://example.com';

  if (!rawInput || typeof rawInput !== 'string') {
    return {
      isValid: false,
      cleanUrl: '',
      errorMessage: defaultError,
      helperMessage: defaultHelper,
    };
  }

  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      isValid: false,
      cleanUrl: '',
      errorMessage: defaultError,
      helperMessage: defaultHelper,
    };
  }

  // Must strictly begin with http:// or https:// (case insensitive)
  if (!/^https?:\/\//i.test(trimmed)) {
    return {
      isValid: false,
      cleanUrl: trimmed,
      errorMessage: defaultError,
      helperMessage: defaultHelper,
    };
  }

  // Reject malformed leading characters like {{{ or illegal url characters
  if (/^[^\w/]*http/i.test(trimmed) && !trimmed.toLowerCase().startsWith('http://') && !trimmed.toLowerCase().startsWith('https://')) {
    return {
      isValid: false,
      cleanUrl: trimmed,
      errorMessage: defaultError,
      helperMessage: defaultHelper,
    };
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return {
        isValid: false,
        cleanUrl: trimmed,
        errorMessage: defaultError,
        helperMessage: defaultHelper,
      };
    }

    const hostname = parsed.hostname;
    if (!hostname || hostname.includes(' ')) {
      return {
        isValid: false,
        cleanUrl: trimmed,
        errorMessage: defaultError,
        helperMessage: defaultHelper,
      };
    }

    if (hostname !== 'localhost') {
      // Must have valid domain syntax with at least one dot, valid labels
      const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
      if (!domainRegex.test(hostname)) {
        return {
          isValid: false,
          cleanUrl: trimmed,
          errorMessage: defaultError,
          helperMessage: defaultHelper,
        };
      }
    }

    return {
      isValid: true,
      cleanUrl: parsed.toString(),
    };
  } catch {
    return {
      isValid: false,
      cleanUrl: trimmed,
      errorMessage: defaultError,
      helperMessage: defaultHelper,
    };
  }
}
