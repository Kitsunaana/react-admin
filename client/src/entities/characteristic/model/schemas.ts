import { z } from "zod"

export const getCharacteristicsResponse = z.array(z.object({
  id: z.number(),
  caption: z.string(),
}))
