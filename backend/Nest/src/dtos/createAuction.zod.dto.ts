import { z } from 'zod';

export const createAuctionZodSchema = z
  .object({
    name: z.string(),
    category: z.string(),
    description: z.string().optional(),
    owner: z.string().optional(),
    initialPrice: z.number(),
    minBid: z.number(),
    endDate: z.date(),
  })
  .strict();

export type CreateAuctionDto = z.infer<typeof createAuctionZodSchema>;
