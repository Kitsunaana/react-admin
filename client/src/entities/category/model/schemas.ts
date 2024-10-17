import { z } from "zod"

export const searchParamsSchema = z.object({
  page: z.string().optional(),
  search: z.string().optional(),
})
