import { z } from "zod"

export const translateSchema = z.object({
  trans: z.object({
    caption: z.string(),
    description: z.string(),
  }),
})

export const localeSchema = z.object({
  altName: z.string(),
  caption: z.string(),
  code: z.string(),
  id: z.number(),
})

export const localesSchema = z.array(localeSchema)
