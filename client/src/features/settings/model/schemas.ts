import { z } from "zod"

export const languageSchema = z.enum(["ru", "en"])

export const themeSchema = z.enum(["system", "light", "dark"])

export const iconSettingsSchema = z.object({
  weightIcon: z.number().int().min(100).max(700),
  fillIcon: z.number().int().min(0).max(1),
})
