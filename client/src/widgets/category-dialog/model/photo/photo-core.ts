import { nanoid } from "nanoid"
import { RecordEvent } from "../../view-model/history/events"
import { Media, Image, Photo } from "../../domain/photo"

export const getCaptions = <T, K extends keyof T>(photos: T[], key: K) => photos.map((i) => i[key])

export const filterPhotos = <T>(images: T[], filter: (image: T) => boolean) => images.filter(filter)

export const filterByUnusedPhoto = <T, K extends keyof T>(image: T, key: K, captions: unknown[]) => (
  !captions.includes(image[key])
)

export const filterByDelete = (media: Media) => !media.delete

export const getMergePhotos = (media: Media[], images: Image[]) => [...media, ...images]

export const findIndexPhoto = (photoId: string, photos: Photo[]) => (
  photos.findIndex((image) => image.id === photoId)
)

export const changeMediaOrder = (id: string, order: number, media: Media[]) => (
  media.map((media) => (media.id === id ? { ...media, order } : media))
)

export const getMediaWithRemoved = (id: string, media: Media[]) => (
  media.map((media) => (media.id === id ? { ...media, deleted: true } : media))
)

export const getImagesWithoutRemoved = (id: string, images: Image[]) => (
  images.filter((image) => image.id !== id)
)

// record events
export const recordChangeOrderEvent = (data: { id: string, order: number }, recordEvent: RecordEvent) => {
  recordEvent({
    id: nanoid(),
    type: "changeMediaOrder",
    value: data,
    tab: 1,
  })
}

export const recordClearMediaEvent = (id: string, recordEvent: RecordEvent) => {
  recordEvent({
    id: nanoid(),
    type: "removeMedia",
    mediaId: id,
    tab: 1,
  })
}

export const recordClearImageEvent = (id: string, recordEvent: RecordEvent) => {
  recordEvent({
    id: nanoid(),
    type: "removeImage",
    imageId: id,
    tab: 1,
  })
}

export const recordUploadFiles = (files: Image[], recordEvent: RecordEvent) => {
  recordEvent({
    id: nanoid(),
    type: "addImages",
    images: files,
    tab: 1,
  })
}
