import { z } from "zod"

export type GetAllCategoriesInput = {
  search: string | null;
  page: number | null;
};

export const getAllCategoriesInput = z.object({
  search: z.string().nullable(),
  page: z.number().nullable(),
})
