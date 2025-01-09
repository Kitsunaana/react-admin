import { z } from "zod"

export const localeSchema = z.object({
  id: z.string(),
  altName: z.string(),
  caption: z.string(),
  code: z.string(),
})

export const getAllLocalesResponseSchema = z.array(localeSchema)

export const altNameFieldsSchema = z.object({
  caption: z
    .string()
    .nonempty({ message: "required" })
    .min(3, { message: "minLength" }),
  description: z.string(),
  locale: localeSchema
    .nullable()
    .refine((locale) => locale !== null, {
      message: "requiredSelect",
    }),
})

export const altNameSchema = altNameFieldsSchema.extend({
  id: z.string(),
  status: z.enum(["update", "create", "remove", "none"]),
})
