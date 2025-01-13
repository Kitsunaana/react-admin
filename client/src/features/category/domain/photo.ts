export type Image = {
  id: string
  caption: string
  data: File
  type: string
}

export type Media = {
  filename: string;
  id: string;
  mimetype: string;
  originalName: string;
  path: string;
  size: number;
  order: number | null
  delete?: boolean
}

export type Photo = Image | Media

export const convertMediaToImage = (photo: Photo) => {
  if ("caption" in photo) return photo

  return {
    caption: photo.originalName,
    data: photo.path,
    type: photo.mimetype,
    id: photo.id,
  }
}

export const getOriginalName = (activeImageId: null | string, photos: Photo[]): string | null => {
  if (activeImageId === null) return null

  const findImage = photos.find((image) => image.id === activeImageId)

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
