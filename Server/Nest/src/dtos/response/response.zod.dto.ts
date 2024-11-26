import { z } from 'zod';

export const responseZodSchema = z
  .object({
    success: z.boolean(),
    message: z.string().optional(),
    data: z.any().optional(),
    pagination: z.any().optional(),
  })
  .strip();

export type ResponseDto = z.infer<typeof responseZodSchema>;
