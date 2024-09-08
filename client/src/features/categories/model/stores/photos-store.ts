import { makeAutoObservable } from "mobx"
import { dispatch } from "shared/lib/event"
import { RootStore } from "features/categories/model/stores/dialog-store"
import { TImage, TMedia, TMediaForm } from "features/categories/model/types"

export class PhotosStore {
  images: TImage[] = []
  media: TMediaForm[] = []

  constructor(public rootStore: RootStore) {
    makeAutoObservable(this, { applyActions: false }, { autoBind: true })
  }

  get mergedImages() {
    return [...this.filteredMedia, ...this.images]
  }

  openGallery(id: number | string) {
    const findIndex = this.mergedImages.findIndex((image) => image.id === id)

    dispatch("gallery", { images: this.mergedImages, index: findIndex })
  }

  updateOrder(order: number, id: string) {
    this.media = this.media
      .map((media) => (media.id === id ? { ...media, order } : media))
  }

  clearMedia(id: string) {
    this.media = this.media
      .map((media) => (media.id === id ? { ...media, deleted: true } : media))
  }

  clearImage(id: string) {
    this.images = this.images.filter((image) => image.id !== id)
  }

  get filteredMedia() {
    return this.media.filter((media) => !media.deleted)
  }

  setUploadedFiles(files: TImage[]) {
    this.images = [...this.images, ...files]
  }

  getFilteredData<T extends TMedia | TImage>(data: Array<T>): Array<T> {
    const captionImage = this.mergedImages
      .map((image) => image?.caption || image?.originalName)

    return data.filter((image) => (
      !captionImage.includes(image?.caption || image?.originalName)
    ))
  }

  setMedia(media?: TMedia[]) {
    if (!media) return
    this.media = media
  }

  setCopiedImages = (images?: TImage[]) => this.applyActions(images)("images")
  setCopiedMedia = (media?: TMedia[]) => this.applyActions(media)("media")

  applyActions<T extends TImage | TMedia>(data?: Array<T>) {
    if (!data) return () => {}

    const filteredData = this.getFilteredData(data)
    const action = this.rootStore.settings.images

    const actions = {
      add: (name: string) => this[name] = [...this[name], ...filteredData],
      replace: (name: string) => this[name] = data,
      none: () => {},
    }

    return actions[action]
  }

  getData() {
    return {
      media: this.media,
      images: this.images,
    }
  }
}
