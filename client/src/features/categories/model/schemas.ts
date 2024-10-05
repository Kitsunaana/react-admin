import { z } from "zod"

export const customCategorySchema = z.object({
  isShowPhotoWithGoods: z.boolean(),
  captionPosition: z.enum([
    "top-left",
    "top-center",
    "top-right",
    "center-left",
    "center-center",
    "center-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ]),
  color: z.string(),
  bgColor: z.string(),
  blur: z.number(),
  activeImageId: z.string().nullable(),
})

export type CustomCategory = z.infer<typeof customCategorySchema>

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
  originalName: z.string(),
  path: z.string(),
  order: z.number().nullable(),
  filename: z.string(),
  mimetype: z.string(),
  size: z.number(),
})

export const categorySchema = z.object({
  id: z.number(),
  description: z.string(),
  caption: z.string(),
  order: z.number().nullable(),
  media: z.array(mediaSchema),
  custom: customCategorySchema.optional().nullable(),
  characteristics: z.any(),
  altNames: z.any(),
  tags: z.any(),
})

export type TCategory = z.infer<typeof categorySchema>

export const categoriesSchema = z.object({
  count: z.number(),
  rows: z.array(categorySchema),
})
