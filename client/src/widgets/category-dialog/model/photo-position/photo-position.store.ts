import { makeAutoObservable } from "mobx"
import { CaptionPosition, Image, Media } from "shared/types/new_types/types"

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

  constructor() {
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
  ) {
    if (actions.activeImageId) this.activeImageId = data.activeImageId
    if (actions.captionPosition) this.captionPosition = data.captionPosition
  }

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

  changeActiveImageId(photos: Photo[]) {
    const findImage = photos[this.indexActiveImage]

    this.activeImageId = findImage
      ? findImage.id
      : photos.length > 0
        ? photos[0].id
        : null
  }

  setNextImage(photos: Photo[], change?: (photoId: string | null) => void) {
    const indexActiveImage = this.getIndexActiveImage(photos)

    this.indexActiveImage = photos[indexActiveImage + 1]
      ? indexActiveImage + 1
      : 0

    this.changeActiveImageId(photos)
    change?.(this.activeImageId)
  }

  setPrevImage(photos: Photo[], change?: (photoId: string | null) => void) {
    const indexActiveImage = this.getIndexActiveImage(photos)

    this.indexActiveImage = photos[indexActiveImage - 1]
      ? indexActiveImage - 1
      : photos.length - 1

    this.changeActiveImageId(photos)
    change?.(this.activeImageId)
  }

  changeCaptionPosition(captionPosition: CaptionPosition) {
    this.captionPosition = captionPosition
  }

  getData() {
    return {
      captionPosition: this.captionPosition,
      activeImageId: this.activeImageId,
    }
  }
}
