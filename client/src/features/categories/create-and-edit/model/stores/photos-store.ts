import { TImage, TMediaForm } from "features/categories/create-and-edit/model/types"
import { makeAutoObservable } from "mobx"
import { dispatch } from "shared/lib/event"
import { RootStore } from "features/categories/create-and-edit/model/stores/dialog-store"

export class PhotosStore {
  images: TImage[] = []
  media: TMediaForm[] = []

  constructor(public rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true })
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

  setMedia(media: TMediaForm[]) {
    this.media = media
  }
}
