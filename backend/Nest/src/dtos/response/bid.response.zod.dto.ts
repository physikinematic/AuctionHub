import { z } from 'zod';
import { responseZodSchema } from './response.zod.dto';

const bidSchema = z
  .object({
    id: z.string().optional(),
    owner: z.any().optional(),
    auction: z.any().optional(),
    value: z.number().optional(),
    createdAt: z.date().optional(),
  })
  .strip();

export const bidResponseZodSchema = responseZodSchema.extend({
  data: z.union([bidSchema, z.array(bidSchema)]).optional(),
});

export type BidResponseDto = z.infer<typeof bidResponseZodSchema>;
