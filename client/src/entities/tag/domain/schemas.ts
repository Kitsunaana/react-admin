import { z } from "zod"

export const tagSchema = z.string()
export const tagsSchema = z.array(tagSchema)
