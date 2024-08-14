import { TPosition } from "features/categories/create-and-edit/model/types"
import { makeAutoObservable, reaction } from "mobx"
import { RootStore } from "features/categories/create-and-edit/model/stores/dialog-store"

export class PhotoPositionStore {
  color = "red"
  bgColor = "blue"
  blur = 5
  captionPosition: TPosition = "center-center"
  activeImageId: null | string = null
  _indexActiveImage = 0

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true })

    reaction(() => this._indexActiveImage, () => this.changeActiveImageId())
  }

  changeActiveImageId() {
    const findImage = this.rootStore.photos.mergedImages[this._indexActiveImage]
    this.activeImageId = findImage.id
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

  getData() {
    return {
      ...this,
      indexActiveImage: this.indexActiveImage,
    }
  }
}
