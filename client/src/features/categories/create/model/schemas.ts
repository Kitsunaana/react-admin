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

export const categorySchema = z.object({
  id: z.number(),
  caption: z.string(),
  description: z.string().optional(),
  deletedAt: z.date().nullable(),
})

export const categoriesSchema = z.array(categorySchema)
