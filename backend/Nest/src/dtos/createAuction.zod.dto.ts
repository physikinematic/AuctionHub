import { z } from 'zod';

export const createAuctionZodSchema = z
  .object({
    name: z.string(),
    category: z.string(),
    description: z.string().optional(),
    owner: z.string(),
    initialPrice: z.number(),
    minBid: z.number(),
    endDate: z
      .string()
      .regex(/(\d{4})-(\d{2})-(\d{2})T((\d{2}):(\d{2}):(\d{2}))\.(\d{3})Z/),
  })
  .strict();

export type CreateAuctionDto = z.infer<typeof createAuctionZodSchema>;
