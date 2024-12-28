import { CategoryLocal, Image, Media } from "shared/types/new_types/types"

export const convertMediaToImage = (photo: Media | Image) => {
  if ("caption" in photo) return photo

  return {
    caption: photo.originalName,
    data: photo.path,
    type: photo.mimetype,
    id: photo.id,
  }
}

export const getOriginalName = (category: CategoryLocal): string | null => {
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

export const findImage = (images: Image[], imageId: string) => (
  images.find((image) => image.id === imageId) ?? null
)

export const findMedia = (media: Media[], mediaId: string) => (
  media.find((media) => media.id === mediaId)
)
