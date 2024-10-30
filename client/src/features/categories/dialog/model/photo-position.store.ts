import { makeAutoObservable, reaction } from "mobx"
import { CategoryDto } from "shared/types/category"
import { PhotoPositionStoreImpl } from "../domain/interface-photo-position.store"
import { PhotosStore } from "./photos.store"

export class PhotoPositionStore implements PhotoPositionStoreImpl {
  captionPosition: CategoryDto.CategoryDto["captionPosition"] = "center-center"
  activeImageId: null | string = null

  _indexActiveImage = 0

  photosStore: Pick<PhotosStore, "mergedImages">

  constructor(photosStore: Pick<PhotosStore, "mergedImages">) {
    this.photosStore = photosStore
    const { mergedImages } = this.photosStore

    makeAutoObservable(this, {}, { autoBind: true })

    reaction(() => this._indexActiveImage, () => this.changeActiveImageId())

    reaction(
      () => (!!mergedImages && !!mergedImages[this._indexActiveImage]),
      () => this.changeActiveImageId(),
    )
  }

  get activeImage() {
    return this.photosStore.mergedImages[this.indexActiveImage]
  }

  get indexActiveImage() {
    const { mergedImages } = this.photosStore

    return mergedImages[this._indexActiveImage] ? this._indexActiveImage : 0
  }

  get isShowButton() { return this.photosStore.mergedImages.length > 1 }

  setCopiedPhotoPosition = (
    actions: {
      activeImageId: boolean,
      captionPosition: boolean
    },
    data: Pick<CategoryDto.CategoryDto, "activeImageId" | "captionPosition">,
  ) => {
    if (actions.activeImageId) this.activeImageId = data.activeImageId
    if (actions.captionPosition) this.captionPosition = data.captionPosition
  }

  setPhotoPosition = (data: Pick<CategoryDto.CategoryDto, "activeImageId" | "captionPosition">) => {
    Object.assign(this, data)
    if (!data.activeImageId) return

    this._indexActiveImage = this.photosStore.mergedImages
      .findIndex((image) => image.id === data.activeImageId)
  }

  setActiveImageId = (id: string | null) => {
    if (id === null) return
    const findIndex = this.photosStore.mergedImages
      .findIndex((image) => image.id === id)

    if (findIndex !== -1) this._indexActiveImage = findIndex
  }

  changeActiveImageId = () => {
    const { mergedImages } = this.photosStore

    const findImage = mergedImages[this._indexActiveImage]
    this.activeImageId = findImage
      ? findImage.id
      : mergedImages.length > 0
        ? mergedImages[0].id
        : null
  }

  setNextImage = () => {
    const { mergedImages } = this.photosStore
    const { indexActiveImage } = this

    this._indexActiveImage = mergedImages[indexActiveImage + 1]
      ? indexActiveImage + 1
      : 0
  }

  setPrevImage = () => {
    const { mergedImages } = this.photosStore
    const { indexActiveImage } = this

    this._indexActiveImage = mergedImages[indexActiveImage - 1]
      ? indexActiveImage - 1
      : mergedImages.length - 1
  }

  changeCaptionPosition = (newCaptionPosition: CategoryDto.CategoryDto["captionPosition"]) => {
    this.captionPosition = newCaptionPosition
  }

  getData = () => ({
    captionPosition: this.captionPosition,
    activeImageId: this.activeImageId,
  })
}
