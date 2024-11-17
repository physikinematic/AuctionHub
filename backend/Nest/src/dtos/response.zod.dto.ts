import { z } from 'zod';

export const responseSchema = z
  .object({
    success: z.boolean(),
    message: z.string().optional(),
    data: z.any().optional(),
  })
  .strip();

export type ResponseDto = z.infer<typeof responseSchema>;
