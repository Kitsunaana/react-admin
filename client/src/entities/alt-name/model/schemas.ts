import { z } from "zod"

export const translateSchema = z.object({
  trans: z.object({
    caption: z.string(),
    description: z.string().nullable().optional(),
  }),
})
