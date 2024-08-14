import { z } from "zod"

export const createCategorySchema = z.object({
  caption: z.string(),
  description: z.string().optional(),
  images: z.array(z.object({
    caption: z.string(),
    data: z.record(z.unknown()),
    order: z.number().optional(),
    id: z.string(),
    type: z.string(),
  })).optional(),
})

export const mediaSchema = z.object({
  id: z.string(),
  path: z.string(),
  originalName: z.string(),
  order: z.number().nullable(),
})

export const categorySchema = z.object({
  id: z.number(),
  caption: z.string(),
  description: z.string(),
  order: z.number(),
  media: z.array(mediaSchema).optional(),
})

export type TCategory = z.infer<typeof categorySchema>

export const categoriesSchema = z.array(categorySchema)
