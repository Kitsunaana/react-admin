import { z } from "zod"

export const categorySearchParamsSchema = z.object({
  search: z.string().nullable(),
  page: z.string().transform((value) => {
    if (Number.isNaN(parseInt(value, 10))) throw new Error("search param must be a number")
    return parseInt(value, 10)
  }).nullable(),
})

export const categoryFieldsSchema = z.object({
  caption: z.string()
    .nonempty({ message: "required" })
    .min(3, { message: "minLength" }),
  bgColor: z.string(),
  blur: z.number().min(0).max(20),
  color: z.string(),
  description: z.string(),
  isShowPhotoWithGoods: z.boolean(),
})
