import { z } from "zod"

export const validationCategorySchema = z.object({
  caption: z.string()
    .nonempty({ message: "required" })
    .min(3, { message: "minLength" }),
  bgColor: z.string(),
  blur: z.number().min(0).max(20),
  color: z.string(),
  description: z.string(),
  isShowPhotoWithGoods: z.boolean(),
})
