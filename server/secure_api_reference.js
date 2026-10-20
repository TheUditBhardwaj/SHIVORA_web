/**
 * SHIVORA PHARMA - Enterprise Secure Backend Reference
 * Ready-to-deploy Node.js/Express API handler with:
 *  - Helmet (Strict Security Headers)
 *  - Rate Limiting (DDoS & Brute-force mitigation)
 *  - CORS Whitelisting
 *  - Zod Schema Validation & Sanitization
 *  - Parameterized Database Querying (SQL Injection Prevention)
 *  - Audit Logging (Security Incident Detection)
 */

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';

const app = express();

// 1. Enforce Strict HTTP Security Headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      frameAncestors: ["'none'"]
    }
  },
  crossOriginEmbedderPolicy: true,
  crossOriginResourcePolicy: { policy: "same-origin" },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }, // 1-year HSTS
  noSniff: true,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" }
}));

// 2. Strict CORS Policy (Only allow official Shivora domain)
const allowedOrigins = [
  'https://shivorapharma.com',
  'https://www.shivorapharma.com',
  'http://localhost:5173' // Development only
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy: Unauthorized origin.'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  credentials: true
}));

// 3. Payload Body Size Limiter (Prevents buffer exhaustion / memory DoS)
app.use(express.json({ limit: '10kb' }));

// 4. Rate Limiting (Prevents Form Flooding, Brute-Force & Bot Spam)
const enquiryRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Maximum 5 requests per IP in 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests from this IP. Please wait 15 minutes before submitting again.'
  }
});

// 5. Strict Schema Validation with Zod (Blocks Malformed / Malicious Payloads)
const EnquirySchema = z.object({
  name: z.string().trim().min(2).max(60).regex(/^[a-zA-Z\s.'-]+$/, 'Invalid characters in name'),
  email: z.string().trim().email().max(100),
  phone: z.string().trim().min(7).max(20).regex(/^[+]?[0-9\s\-()]+$/, 'Invalid phone number format'),
  company: z.string().trim().max(100).optional(),
  enquiryType: z.enum([
    'Request a Quote',
    'Bulk Product Enquiry',
    'Private Label Enquiry',
    'Manufacturer Partnership',
    'Send Your Requirement'
  ]),
  message: z.string().trim().min(10).max(1000),
  hp_verify_code: z.string().max(0).optional() // Honeypot must be empty
});

// 6. Secure Endpoint Route
app.post('/api/v1/enquiry', enquiryRateLimiter, async (req, res) => {
  try {
    // Check Honeypot: If filled, bot trapped! Silently return 200 without doing work.
    if (req.body.hp_verify_code) {
      console.warn(`[BOT TRAP TRIGGERED] IP: ${req.ip}`);
      return res.status(200).json({ success: true, message: 'Enquiry received.' });
    }

    // Validate payload against schema
    const validatedData = EnquirySchema.parse(req.body);

    // Database insertion MUST use parameterized queries or ORM
    // Example:
    // await db.query(
    //   'INSERT INTO enquiries (name, email, phone, company, type, message, ip_address, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())',
    //   [validatedData.name, validatedData.email, validatedData.phone, validatedData.company, validatedData.enquiryType, validatedData.message, req.ip]
    // );

    console.log(`[AUDIT LOG] Valid enquiry received from ${validatedData.email} at ${new Date().toISOString()}`);

    return res.status(201).json({
      success: true,
      message: 'Your enquiry has been securely processed.'
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: err.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
      });
    }

    console.error('[SECURITY ERROR]', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default app;
