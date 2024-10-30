import { Common } from "shared/types/common"
import { Category } from "../domain/types"

export const getOriginalName = (category: Category): string | null => {
  if (category.activeImageId === null) return null

  const findImage = [...category.images, ...category.media]
    .find((image) => image.id === category.activeImageId)

  return findImage
    ? (
      "caption" in findImage
        ? findImage.caption
        : "originalName" in findImage
          ? findImage.originalName
          : "")
    : null
}

export const findImage = (images: Common.Image[], imageId: string) => (
  images.find((image) => image.id === imageId) ?? null
)

export const findMedia = (media: Common.Media[], mediaId: string) => (
  media.find((media) => media.id === mediaId)
)
