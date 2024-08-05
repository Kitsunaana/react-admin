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
  id: z.number(),
  path: z.string(),
  filename: z.string(),
})

export const categorySchema = z.object({
  id: z.number(),
  caption: z.string(),
  description: z.string(),
  order: z.number(),
  media: z.array(mediaSchema).optional(),
})

export const categoriesSchema = z.array(categorySchema)
