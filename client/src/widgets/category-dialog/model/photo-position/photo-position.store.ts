import { makeAutoObservable } from "mobx"
import { CaptionPosition, Image, Media } from "shared/types/new_types/types"
import { nanoid } from "nanoid"
import { RecordEvent } from "../../model/history/events"

type Photo = Media | Image

type CopiedPhotoPositionActions = {
  activeImageId: boolean
  captionPosition: boolean
}

type CopiedPhotoPositionData = {
  activeImageId: string | null
  captionPosition: CaptionPosition
}

export class PhotoPositionStore {
  captionPosition: CaptionPosition = "center-center"
  activeImageId: null | string = null

  indexActiveImage = 0

  constructor(private recordEvent: RecordEvent) {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  getActiveImage(photos: Photo[]) {
    return photos[this.getIndexActiveImage(photos)]
  }

  getIndexActiveImage(photos: Photo[]) {
    return photos[this.indexActiveImage] ? this.indexActiveImage : 0
  }

  setCopiedPhotoPosition(
    actions: CopiedPhotoPositionActions,
    data: CopiedPhotoPositionData,
    photos: Photo[],
  ) {
    if (actions.activeImageId) this.setActiveImageId(data.activeImageId, photos)
    if (actions.captionPosition) this.changeCaptionPosition(data.captionPosition)
  }

  // TODO
  setPhotoPosition(photos: Photo[], data: {
    activeImageId: string | null
    captionPosition: CaptionPosition
  }) {
    this.activeImageId = data.activeImageId
    this.captionPosition = data.captionPosition

    if (!data.activeImageId) return

    this.indexActiveImage = photos
      .findIndex((photo) => photo.id === data.activeImageId)
  }

  setActiveImageId(id: string | null, photos: Photo[]) {
    if (id === null) return

    const findIndex = photos.findIndex((photo) => photo.id === id)

    if (findIndex !== -1) this.indexActiveImage = findIndex
  }

  changeCaptionPosition(captionPosition: CaptionPosition) {
    this.captionPosition = captionPosition

    this.recordEvent({
      id: nanoid(),
      type: "changeCaptionPosition",
      value: this.captionPosition,
      tab: 2,
    })
  }

  changeActiveImageId(photos: Photo[]) {
    const findImage = photos[this.indexActiveImage]

    this.activeImageId = findImage
      ? findImage.id
      : photos.length > 0
        ? photos[0].id
        : null

    this.recordEvent({
      id: nanoid(),
      type: "changeActiveImageId",
      value: this.activeImageId,
      tab: 2,
    })
  }

  setNextImage(photos: Photo[]) {
    const indexActiveImage = this.getIndexActiveImage(photos)

    this.indexActiveImage = photos[indexActiveImage + 1]
      ? indexActiveImage + 1
      : 0

    this.changeActiveImageId(photos)
  }

  setPrevImage(photos: Photo[]) {
    const indexActiveImage = this.getIndexActiveImage(photos)

    this.indexActiveImage = photos[indexActiveImage - 1]
      ? indexActiveImage - 1
      : photos.length - 1

    this.changeActiveImageId(photos)
  }

  get() {
    return {
      captionPosition: this.captionPosition,
      activeImageId: this.activeImageId,
    }
  }
}
