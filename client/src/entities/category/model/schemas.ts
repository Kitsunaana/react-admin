import { z } from "zod"

export const categorySearchParamsSchema = z.object({
  page: z.string().transform((v) => {
    if (Number.isNaN(parseInt(v, 10))) throw new Error("search param must be a number")
    return parseInt(v, 10)
  }).nullable(),
  search: z.string().nullable(),
})
