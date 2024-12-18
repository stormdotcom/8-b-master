import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

export const globalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 200 requests per window
  });

export const securityMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Apply Helmet with custom configurations
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "cdn.example.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "cdn.example.com"],
        connectSrc: ["'self'", "api.example.com"],
      },
    },
    frameguard: { action: 'deny' }, // Prevent clickjacking
    hidePoweredBy: true, // Remove X-Powered-By header
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }, // Enforce HTTPS
    xssFilter: true, // Protect against XSS
    referrerPolicy: { policy: 'no-referrer' }, // Control referrer policy
  })(req, res, () => {
    compression()(req, res, next);
  });
};

export const allowedOrigins = ['http://localhost:6060', 'https://api.ajmalnasumudeen.in'];

/**
 * Validate the origin for CORS requests.
 * @param origin - The origin of the request.
 * @param callback - The callback to signal whether the origin is allowed or not.
 */
export const validateOrigin = (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void): void => {
  // Allow requests with no origin (e.g., mobile apps, curl)
  if (!origin) {
    callback(null, true);
    return;
  }

  // Check if the origin is in the allowed list
  if (allowedOrigins.includes(origin)) {
    callback(null, true);
  } else {
    console.error(`CORS error: Origin ${origin} not allowed`);
    callback(new Error('Not allowed by CORS'));
  }
};
