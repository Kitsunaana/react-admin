import { z } from "zod"

export const localeSchema = z.object({
  id: z.string(),
  altName: z.string(),
  caption: z.string(),
  code: z.string(),
})

export const getAllLocalesResponseSchema = z.array(localeSchema)
