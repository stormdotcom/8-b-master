import { createLogger, transports, format } from "winston";
import { randomUUID } from "crypto";

export const commonLogFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message, ...meta }) => {
      const metadata = Object.keys(meta).length ? ` | Metadata: ${JSON.stringify(meta)}` : "";
      return `[${timestamp}] ${level.toUpperCase()}: ${message}${metadata}`;
    })
  );

const logger = createLogger({
    level: "info", // Default log level
    format: commonLogFormat,
    transports: [
      new transports.File({ filename: "logs/app.log" }), // Log to a file
      new transports.File({ filename: "logs/error.log", level: "error" })
    ],
  });

  const apiLogger = createLogger({
    level: "info",
    format: commonLogFormat,
    transports: [
      
      new transports.File({ filename: "logs/api.log" }), 
    ],
  });

  const gorkApiLogger = createLogger({
    level: "error",
    format: commonLogFormat,
    transports: [
      new transports.File({ filename: "logs/gork.log" }), 
    ],
  });
  
  
  

   const requestLoggerMiddleware = (req: any, res: any, next: any) => {
    const startTime = Date.now();
    const requestId = randomUUID(); // Generate a unique ID for the request
  
    // Attach the ID to the request object for downstream use
    req.headers['x-request-id'] = requestId;
  
    // Log details once the response is finished
    res.on("finish", () => {
      const endTime = Date.now();
      const duration = endTime - startTime;
  
      apiLogger.info(
        `Request ID: ${requestId} | ${req.method} ${req.originalUrl} | Status: ${res.statusCode} | Duration: ${duration}ms | Client: ${
          req.ip || req.socket.remoteAddress
        } | User-Agent: ${req.headers["user-agent"]}`
      );
    });
  
    next();
  };


  
  
  export  {logger, apiLogger, requestLoggerMiddleware, gorkApiLogger};