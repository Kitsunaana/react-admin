import { z } from "zod"

const tagBaseSchema = z.object({
  id: z.number(),
  caption: z.string(),
})

const tagSchema = z.object({
  id: z.number(),
  tag: z.string(),
  icon: z.string(),
  tagColor: z.string(),
})

export const tagsSchema = z.array(tagSchema)
