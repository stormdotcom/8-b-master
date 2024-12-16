import { Request, Response, NextFunction } from "express";

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  // Replace this with your actual token validation logic
  if (token !== "your-secure-token") {
    return res.status(403).json({ error: "Forbidden: Invalid token" });
  }

  next();
};
