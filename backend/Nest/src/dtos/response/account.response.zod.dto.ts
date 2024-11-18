import { z } from 'zod';
import { responseZodSchema } from './response.zod.dto';

const accountSchema = z
  .object({
    id: z.string().optional(),
    firstName: z.string().min(1).max(20).optional(),
    lastName: z.string().min(1).max(20).optional(),
    email: z.string().email().optional(),
    createdAt: z.date().optional(),
  })
  .strip();

export const accountResponseZodSchema = responseZodSchema.extend({
  data: z.union([accountSchema, z.array(accountSchema)]).optional(),
});

export type AccountResponseDto = z.infer<typeof accountResponseZodSchema>;
