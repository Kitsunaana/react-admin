import { makeAutoObservable, reaction } from "mobx"
import { TPosition } from "features/categories/model/types"
import { RootStore } from "features/categories/model/stores/dialog-store"
import { CustomCategory } from "features/categories/model/schemas"

export class PhotoPositionStore {
  color = "red"
  bgColor = "blue"
  blur = 5
  captionPosition: TPosition = "center-center"
  isShowPhotoWithGoods = true
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

  changeShowPhoto() {
    this.isShowPhotoWithGoods = !this.isShowPhotoWithGoods
  }

  setPhotoPosition(data?: CustomCategory) {
    if (!data) return
    Object.assign(this, data)
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

  changeColor(newColor: string) {
    this.color = newColor
  }

  changeBgColor(newBgColor: string) {
    this.bgColor = newBgColor
  }

  changeBlur(newBlur: number) {
    this.blur = newBlur
  }

  changeCaptionPosition(newCaptionPosition: TPosition) {
    this.captionPosition = newCaptionPosition
  }

  get isShowButton() {
    return this.rootStore.photos.mergedImages.length > 1
  }

  getData(all: boolean = false) {
    const { rootStore, ...otherProperties } = this

    return {
      custom: {
        ...otherProperties,
      },
    }
  }
}