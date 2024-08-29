import { z } from "zod"

export const characteristicSchema = z.object({
  id: z.number(),
  characteristicId: z.number(),
  categoryId: z.number(),
  unitId: z.number().optional().nullable(),
  value: z.string(),
  hideClient: z.boolean(),
  characteristic: z.object({
    id: z.number(),
    caption: z.string(),
  }),
  unit: z.object({
    id: z.number(),
    caption: z.string(),
  }),
})

export const characteristicsSchema = z.array(characteristicSchema.optional())
