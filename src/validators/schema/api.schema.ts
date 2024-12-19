

import { z } from "zod";

// Define the validation schema
export  const promptChatSchema = z.object({
  visitorId: z
    .string()
    .min(1, { message: "visitorId is required and cannot be empty" })
    .max(200, { message: "visitorId cannot be 200 characters" }),
    input: z
    .string()
    .min(1, { message: "message is required and cannot be empty" }),
  timestamp: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "timestamp must be a valid ISO date string",
    }),
});



