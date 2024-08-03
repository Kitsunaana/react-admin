import { z } from "zod"

export const formSchema = z.object({
  description: z.string().optional(),
  caption: z.string(),
  images: z.array(z.object({
    caption: z.string(),
    data: z.object({
      lastModified: z.number().optional(),
    }),
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
