import { Request, Response, NextFunction } from "express";
import { logger } from "../../utils/logger";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Log the error details
  logger.error(
    `Error occurred: ${err.message} | Request ID: ${req.headers['x-request-id'] || 'N/A'} | Method: ${req.method} | URL: ${req.originalUrl} | Client: ${req.ip}`
  );

  // Console logging for debugging during development
  if (process.env.NODE_ENV !== "production") {
    console.error(`[ERROR] ${err.message}`);
  }

  // Respond with a standard error message
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};
