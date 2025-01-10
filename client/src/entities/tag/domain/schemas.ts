import { z } from "zod"

export const tagResponseItem = z.string()

export const getAllTagsResponse = z.array(tagResponseItem)

export const tagFieldsSchema = z.object({
  caption: z
    .string({ message: "requiredSelect" })
    .min(3, { message: "minLength" }),
  color: z.string(),
  icon: z.string().nullable(),
})

export const tagSchema = tagFieldsSchema.extend({
  id: z.string(),
  status: z.enum(["create", "update", "remove", "none"]),
})
