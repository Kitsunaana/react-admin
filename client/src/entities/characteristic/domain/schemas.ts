import { z } from "zod"

export const getCharacteristicsResponse = z.array(
  z.object({
    id: z.string(),
    caption: z.string(),
  }),
)

export const getUnitsResponse = z.array(
  z.object({
    id: z.string(),
    caption: z.string().nullable(),
  }),
)
