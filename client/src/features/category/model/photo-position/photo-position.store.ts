import { makeAutoObservable } from "mobx"
import { RecordEvent } from "../../view-model/history/events"
import {
  CopiedPhotoPositionData,
  CopiedPhotoPositionActions,
  PhotoPositionData,
} from "./photo-position-types"
import {
  findIndexPhoto,
  recordChangeCaptionPosition,
  recordChangeActiveImage,
  getPrevImage,
  getNextImage,
  getActiveImage,
} from "./photo-position-core"
import { CaptionPosition } from "../../domain/category/types"
import { Photo } from "../../domain/photo"

export class PhotoPositionStore {
  public captionPosition: CaptionPosition = "center-center"

  private activeImageId: null | string = null
  private indexActiveImage = 0

  public constructor(private recordEvent: RecordEvent) {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  public setCopiedPhotoPosition(
    actions: CopiedPhotoPositionActions,
    data: CopiedPhotoPositionData,
    photos: Photo[],
  ) {
    if (actions.activeImageId) this.setActiveImageId(data.activeImageId, photos)
    if (actions.captionPosition) this.changeCaptionPosition(data.captionPosition)
  }

  public get() {
    return {
      captionPosition: this.captionPosition,
      activeImageId: this.activeImageId,
    }
  }

  public getActiveImage(photos: Photo[]) {
    return photos[this.getIndexActiveImage(photos)]
  }

  public setPhotoPosition(photos: Photo[], data: PhotoPositionData) {
    this.activeImageId = data.activeImageId
    this.captionPosition = data.captionPosition

    if (!data.activeImageId) return

    this.indexActiveImage = findIndexPhoto(data.activeImageId, photos)
  }

  public setNextImage(photos: Photo[]) {
    this.indexActiveImage = getNextImage(photos, this.getIndexActiveImage(photos))

    this.changeActiveImageId(photos)
  }

  public setPrevImage(photos: Photo[]) {
    this.indexActiveImage = getPrevImage(photos, this.getIndexActiveImage(photos))

    this.changeActiveImageId(photos)
  }

  public changeCaptionPosition(captionPosition: CaptionPosition) {
    this.captionPosition = captionPosition

    recordChangeCaptionPosition(this.captionPosition, this.recordEvent)
  }

  private setActiveImageId(id: string | null, photos: Photo[]) {
    if (id === null) return

    const findIndex = findIndexPhoto(id, photos)

    if (findIndex !== -1) this.indexActiveImage = findIndex
  }

  private getIndexActiveImage(photos: Photo[]) {
    return photos[this.indexActiveImage] ? this.indexActiveImage : 0
  }

  private changeActiveImageId(photos: Photo[]) {
    const findPhoto = photos[this.indexActiveImage]

    this.activeImageId = getActiveImage(findPhoto, photos)

    recordChangeActiveImage(this.activeImageId, this.recordEvent)
  }
}
