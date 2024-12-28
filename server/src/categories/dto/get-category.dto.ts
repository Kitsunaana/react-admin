import { z } from 'zod';

export type GetCategoryDto = {
  search?: string;
  page?: string;
};

export const getCategorySchema = z.object({
  search: z.string().optional(),
  page: z.string().optional(),
});
