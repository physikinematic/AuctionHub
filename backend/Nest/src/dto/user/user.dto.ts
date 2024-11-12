import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string()
    .min(1)
    .max(20),
  lastName: z.string()
    .min(1)
    .max(20),
  email: z.string()
    .email(),
}).strip().optional();

export type UserDto = z.infer<typeof userSchema>;