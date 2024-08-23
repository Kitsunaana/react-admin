import { z } from "zod"

export const localeSchema = z.object({
  id: z.number(),
  caption: z.string(),
  code: z.string(),
  altName: z.string(),
})

export const altNameSchema = z.object({
  id: z.number(),
  caption: z.string(),
  localeId: z.number(),
  categoryId: z.number(),
  locale: localeSchema,
})

export const altNamesSchema = z.array(altNameSchema)
