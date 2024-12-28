import { z } from "zod"

export const localeSchema = z.object({
  altName: z.string(),
  caption: z.string(),
  code: z.string(),
  id: z.string(),
})

export const localesSchema = z.array(localeSchema)
