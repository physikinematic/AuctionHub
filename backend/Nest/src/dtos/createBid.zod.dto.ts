import { z } from 'zod';

export const createBidZodSchema = z
  .object({
    value: z.number(),
    owner: z.string().optional(),
    auction: z.string(),
  })
  .strict();

export type CreateBidDto = z.infer<typeof createBidZodSchema>;
