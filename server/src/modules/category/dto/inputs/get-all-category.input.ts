import { z } from 'zod';

export type IGetAllCategoryInput = {
  search?: string;
  page?: string;
};

export const getAllCategoryInput = z.object({
  search: z.string().optional(),
  page: z.string().optional(),
});
