import { z } from "zod"

export const localeSchema = z.object({
  id: z.number(),
  caption: z.string(),
  code: z.string(),
  altName: z.string(),
})

export const localesSchema = z.array(localeSchema).optional()

export const altNameSchema = z.object({
  id: z.number(),
  caption: z.string(),
  description: z.string(),
  localeId: z.number().optional(),
  categoryId: z.number().optional(),
  locale: localeSchema,
})

export const altNamesSchema = z.array(altNameSchema)
