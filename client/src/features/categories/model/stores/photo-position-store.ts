import { makeAutoObservable, reaction } from "mobx"
import { TPosition } from "features/categories/model/types"
import { RootStore } from "features/categories/model/stores/dialog-store"
import { CustomCategory } from "features/categories/model/schemas"

export class PhotoPositionStore {
  captionPosition: TPosition = "center-center"
  activeImageId: null | string = null

  _indexActiveImage = 0

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true })

    reaction(() => this._indexActiveImage, () => this.changeActiveImageId())

    const { photos } = this.rootStore

    reaction(
      () => (
        !!photos
        && !!photos.mergedImages
        && !!photos.mergedImages[this._indexActiveImage]
      ),
      () => this.changeActiveImageId(),
    )
  }

  setPhotoPosition(data?: Partial<CustomCategory>) {
    if (!data) return

    const filteredData = Object
      .entries(data)
      .filter(([key, value]) => (value === undefined ? null : [key, value]))
    const cleanedObject = Object.fromEntries(filteredData)
    const mergedObject = { ...this, ...cleanedObject }

    Object.assign(this, mergedObject)
    if (!data.activeImageId) return

    this._indexActiveImage = this.rootStore.photos.mergedImages
      .findIndex((image) => image.id === data.activeImageId)
  }

  changeActiveImageId() {
    if (!this.rootStore.photos) return
    const { mergedImages } = this.rootStore.photos

    const findImage = mergedImages[this._indexActiveImage]
    this.activeImageId = findImage
      ? findImage.id
      : mergedImages.length > 0
        ? mergedImages[0].id
        : null
  }

  get activeImage() {
    return this.rootStore.photos.mergedImages[this.indexActiveImage]
  }

  get indexActiveImage() {
    const { mergedImages } = this.rootStore.photos

    return mergedImages[this._indexActiveImage] ? this._indexActiveImage : 0
  }

  setNextImage() {
    const { mergedImages } = this.rootStore.photos
    const { indexActiveImage } = this

    this._indexActiveImage = mergedImages[indexActiveImage + 1]
      ? indexActiveImage + 1
      : 0
  }

  setPrevImage() {
    const { mergedImages } = this.rootStore.photos
    const { indexActiveImage } = this

    this._indexActiveImage = mergedImages[indexActiveImage - 1]
      ? indexActiveImage - 1
      : mergedImages.length - 1
  }

  changeCaptionPosition(newCaptionPosition: TPosition) {
    this.captionPosition = newCaptionPosition
  }

  get isShowButton() {
    return this.rootStore.photos.mergedImages.length > 1
  }

  getData() {
    return {
      captionPosition: this.captionPosition,
      activeImageId: this.activeImageId,
    }
  }
}
