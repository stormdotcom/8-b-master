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
