import { z } from "zod"
import { validation } from "shared/lib/validation"

export const characteristicSchema = z.object({
  id: z.number(),
  value: z.string(),
  hideClient: z.boolean(),
  characteristic: z.object({
    caption: z.string(),
  }),
  unit: z.object({
    caption: z.string().nullable(),
  }),
})

export type TCharacteristic = z.infer<typeof characteristicSchema>

export const transformCharacteristic = (characteristic: TCharacteristic) => {
  const data = validation(characteristicSchema, characteristic)

  return {
    id: data.id,
    value: data.value,
    hideClient: data.hideClient,
    caption: data.characteristic.caption,
    unit: data.unit.caption,
  }
}

export const characteristicsSchema = z.array(characteristicSchema)

export type TCharacteristics = z.infer<typeof characteristicsSchema >

export const transformCharacteristics = (characteristics: TCharacteristic[]) => (
  characteristics.map(transformCharacteristic)
)
