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

export const characteristicFieldsSchema = z.object({
  caption: z
    .string({ message: "requiredSelect" })
    .min(3, { message: "minLength" }),
  hideClient: z.boolean(),
  unit: z.string().nullable(),
  value: z.string().min(1, { message: "required" }),
})

export const characteristicSchema = characteristicFieldsSchema.extend({
  id: z.string(),
  status: z.enum(["update", "create", "remove", "none"]),
})
