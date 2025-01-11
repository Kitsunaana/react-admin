import { createRoute, eventBus } from "shared/lib/event-bus"

export type Media = {
  id: string
  originalName: string
  path: string
}

export type Image = {
  id: string
  caption: string
  data: File
}

export type Photo = Media | Image

export type OpenGalleryData = {
  index: number
  photos: Photo[]
}

export const openGallery = createRoute("openGallery")
  .withParams<OpenGalleryData>()

export const subscribeOpenGallery = (callback: (data: OpenGalleryData) => void) => {
  eventBus.on(openGallery, ({ payload }) => callback(payload))
}

export const getPhotoData = (photo: Photo) => {
  if ("path" in photo) return photo.path
  return photo.data
}
