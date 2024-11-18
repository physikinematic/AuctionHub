import { z } from 'zod';

export const signupZodSchema = z
  .object({
    firstName: z.string().min(1).max(20),
    lastName: z.string().min(1).max(20),
    email: z.string().email(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(16, 'Password must not exceed 16 characters')
      .regex(/[a-z]/, 'Password must contain at least one small letter')
      .regex(/[A-Z]/, 'Password must contain at least one capital letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[^a-zA-Z0-9]/,
        'Password must contain at least one special character',
      ),
  })
  .strict();

export type SignupDto = z.infer<typeof signupZodSchema>;
