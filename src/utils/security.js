/**
 * SHIVORA PHARMA - Client-side Security & Data Sanitization Module
 * Protects against XSS, Injection Attacks, Bot Automation, and Form Flooding.
 */

// Strip HTML tags and dangerous characters to neutralize XSS payloads
export const sanitizeInput = (value) => {
  if (typeof value !== 'string') return '';
  
  return value
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .replace(/[<>'"]/g, (char) => { // Encode dangerous delimiters
      const map = { '<': '&lt;', '>': '&gt;', "'": '&#x27;', '"': '&quot;' };
      return map[char] || char;
    })
    .trim();
};

// Check for known attack signatures (SQLi, XSS, Path Traversal, Script URLs)
export const detectMaliciousPayload = (text) => {
  if (!text || typeof text !== 'string') return false;

  const attackPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, // Script tags
    /javascript:/gi,                                       // JS pseudo-protocols
    /onload\s*=|onerror\s*=|onclick\s*=/gi,                // Inline event handlers
    /(\b(union(\s+all)?|select|insert|update|delete|drop|alter)\b.{1,100}?\b(from|into|table|database)\b)/gi, // Basic SQLi
    /(--|#|\/\*)/g,                                        // SQL comments
    /\.\.\//g,                                             // Path traversal
  ];

  return attackPatterns.some((pattern) => pattern.test(text));
};

// Strict email validator conforming to standard B2B email structure
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim()) && email.length <= 120;
};

// Phone / WhatsApp validator supporting +91, standard international & local formats
export const isValidPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;
  return phoneRegex.test(phone.trim());
};

// Client-side rate limiting & cooldown protection using sessionStorage
export const checkRateLimit = (key = 'form_submission', maxAttempts = 3, windowSeconds = 60) => {
  try {
    const storageKey = `sec_rate_${key}`;
    const now = Date.now();
    const record = JSON.parse(sessionStorage.getItem(storageKey) || '{"count": 0, "firstAttempt": 0}');

    // If window expired, reset
    if (now - record.firstAttempt > windowSeconds * 1000) {
      sessionStorage.setItem(storageKey, JSON.stringify({ count: 1, firstAttempt: now }));
      return { allowed: true, remaining: maxAttempts - 1 };
    }

    if (record.count >= maxAttempts) {
      const waitSeconds = Math.ceil((record.firstAttempt + windowSeconds * 1000 - now) / 1000);
      return { 
        allowed: false, 
        waitSeconds: waitSeconds > 0 ? waitSeconds : 1,
        message: `Too many attempts. Please wait ${waitSeconds} seconds before submitting again.`
      };
    }

    record.count += 1;
    sessionStorage.setItem(storageKey, JSON.stringify(record));
    return { allowed: true, remaining: maxAttempts - record.count };
  } catch {
    // Graceful fallback if storage is disabled
    return { allowed: true, remaining: 1 };
  }
};

// Generate and verify a lightweight CSRF token for the current browsing session
export const getSessionToken = () => {
  try {
    let token = sessionStorage.getItem('shivora_csrf_token');
    if (!token) {
      const array = new Uint8Array(16);
      crypto.getRandomValues(array);
      token = Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
      sessionStorage.setItem('shivora_csrf_token', token);
    }
    return token;
  } catch {
    return 'token_fallback_' + Math.random().toString(36).substring(2);
  }
};
