import { z } from 'zod';

export type PatchOrderCategoryDto = {
  order: number;
  id: string;
};

export const patchOrderCategorySchema = z.object({
  order: z.number(),
  id: z.string(),
});
