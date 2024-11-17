import { z } from 'zod';
import { responseSchema } from '../../../dtos/response.zod.dto';

export const accountResponseZodSchema = responseSchema.extend({
  data: z
    .object({
      id: z.string().optional(),
      firstName: z.string().min(1).max(20).optional(),
      lastName: z.string().min(1).max(20).optional(),
      email: z.string().email().optional(),
    })
    .strip()
    .optional(),
});

export type AccountResponseDto = z.infer<typeof accountResponseZodSchema>;
