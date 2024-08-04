import { z } from "zod"

export const categoryFormSchema = z.object({
  description: z.string().optional(),
  caption: z.string(),
  images: z.array(z.object({
    caption: z.string(),
    data: z.record(z.unknown()),
    index: z.number().optional(),
    id: z.string(),
    type: z.string(),
  })),
})

export const imageSchema = z.object({
  id: z.number(),
  path: z.string(),
})

export const categorySchema = z.object({
  id: z.number(),
  caption: z.string(),
  description: z.string().optional(),
  order: z.number(),
  // images: z.array(imageSchema),
})

export const categoriesSchema = z.array(categorySchema)
