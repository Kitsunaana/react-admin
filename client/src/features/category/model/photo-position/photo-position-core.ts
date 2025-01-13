import { nanoid } from "nanoid"
import { RecordEvent } from "../../view-model/history/events"
import { CaptionPosition } from "../../domain/category/types"
import { Photo } from "../../domain/photo"

export const getNextImage = (photos: Photo[], index: number) => (
  photos[index + 1] ? index + 1 : 0
)

export const getPrevImage = (photos: Photo[], index: number) => (
  photos[index - 1]
    ? index - 1
    : photos.length - 1
)

export const getActiveImage = (photo: Photo, photos: Photo[]) => (
  photo
    ? photo.id
    : photos.length > 0
      ? photos[0].id
      : null
)

export const findIndexPhoto = (photoId: string, photos: Photo[]) => (
  photos.findIndex((photo) => photo.id === photoId)
)

export const recordChangeCaptionPosition = (captionPosition: CaptionPosition, recordEvent: RecordEvent) => {
  recordEvent({
    id: nanoid(),
    type: "changeCaptionPosition",
    value: captionPosition,
    tab: 2,
  })
}

export const recordChangeActiveImage = (photoId: string | null, recordEvent: RecordEvent) => {
  recordEvent({
    id: nanoid(),
    type: "changeActiveImageId",
    value: photoId,
    tab: 2,
  })
}
