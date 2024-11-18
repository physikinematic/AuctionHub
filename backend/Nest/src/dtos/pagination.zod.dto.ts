import { z } from 'zod';

export const paginationZodSchema = z
  .object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
  })
  .strict();

export type PaginationDto = z.infer<typeof paginationZodSchema>;
