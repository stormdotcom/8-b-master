import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { promptChatSchema } from "./schema/api.schema";

export const validateApiBody = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Validate the request body
    promptChatSchema.parse(req.body);
    next(); // If validation succeeds, move to the next middleware or controller
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        errors: error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
      return; 
    }
    next(error);
  }
};
