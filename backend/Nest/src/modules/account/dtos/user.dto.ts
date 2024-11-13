import { responseSchema } from "src/dtos/response.dto";
import { z } from "zod";

export const userSchema = responseSchema.extend({
  data: z.object({
    firstName: z.string()
      .min(1)
      .max(20)
      .optional(),
    lastName: z.string()
      .min(1)
      .max(20)
      .optional(),
    email: z.string()
      .email()
      .optional(),
  }).strip().optional()
});

export type UserDto = z.infer<typeof userSchema>;