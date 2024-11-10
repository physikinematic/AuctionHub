import { z } from "zod";

export const signinSchema = z.object({
  email: z.string()
    .email(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .max(16, 'Password must not exceed 16 characters')
}).required();

export type SigninDto = z.infer<typeof signinSchema>;