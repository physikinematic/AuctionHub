import { z } from 'zod';
import { responseZodSchema } from './response.zod.dto';

const auctionSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    category: z.any().optional(),
    description: z.string().optional(),
    owner: z.any().optional(),
    initialPrice: z.number().optional(),
    minBid: z.number().optional(),
    endDate: z.date().optional(),
    createdAt: z.date().optional(),
  })
  .strip();

export const auctionResponseZodSchema = responseZodSchema.extend({
  data: z.union([auctionSchema, z.array(auctionSchema)]).optional(),
});

export type AuctionResponseDto = z.infer<typeof auctionResponseZodSchema>;
