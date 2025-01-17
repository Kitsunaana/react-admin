import { CaptionPosition } from "features/category/domain/category/types"
import { z } from "zod"

export type PostCategoryInput = {
  caption: string
  description: string

  isShowPhotoWithGoods: boolean
  bgColor: string
  color: string
  blur: number
  activeImageId: null | string
  captionPosition: CaptionPosition

  media: Array<{
    id: string
    caption: string
    mimetype: string
    originalName: string
    path: string
    size: number
    order: number
    delete?: boolean
  }>;
  characteristics: Array<{
    id: string
    caption: string
    hideClient: boolean
    unit: string | null
    value: string
    status: "update" | "create" | "remove" | "none"
  }>
  altNames: Array<{
    id: string
    caption: string
    description: string
    status: "update" | "create" | "remove" | "none"
    locale: {
      id: string
      altName: string
      caption: string
      code: string
    }
  }>
  tags: Array<{
    id: string
    caption: string
    color: string
    icon: string | null
    status: "update" | "create" | "remove" | "none"
  }>
}

export const postCategoryInput = z.object({
  caption: z.string(),
  description: z.string(),
  isShowPhotoWithGoods: z.boolean(),
  bgColor: z.string(),
  color: z.string(),
  blur: z.number().int().min(0).max(20),
  activeImageId: z.string().nullable(),
  captionPosition: z.enum([
    "top-left",
    "top-center",
    "top-right",
    "center-left",
    "center-center",
    "center-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ]),
  media: z.array(
    z.object({
      id: z.string(),
      filename: z.string(),
      mimetype: z.string(),
      originalName: z.string(),
      path: z.string(),
      size: z.number().int().positive(),
      order: z.number().nullable(),
      delete: z.boolean().optional(),
    }),
  ),
  altNames: z.array(
    z.object({
      id: z.string(),
      caption: z.string(),
      description: z.string(),
      locale: z.object({
        id: z.string(),
        altName: z.string(),
        caption: z.string(),
        code: z.string(),
      }),
      status: z.enum(["update", "create", "remove", "none"]),
    }),
  ),
  characteristics: z.array(
    z.object({
      id: z.string(),
      caption: z.string(),
      hideClient: z.boolean(),
      unit: z.string().nullable(),
      value: z.string(),
      status: z.enum(["update", "create", "remove", "none"]),
    }),
  ),
  tags: z.array(
    z.object({
      id: z.string(),
      caption: z.string(),
      color: z.string(),
      icon: z.string().nullable(),
      status: z.enum(["update", "create", "remove", "none"]),
    }),
  ),
})
