import { makeAutoObservable } from "mobx"
import { dispatch } from "shared/lib/event"
import { RootStore } from "features/categories/model/stores/dialog-store"
import { Common } from "shared/types/common"

export class PhotosStore {
  images: Common.Image[] = []
  media: (Common.Media & { deleted?: boolean })[] = []

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

  setUploadedFiles(files: Common.Image[]) {
    this.images = [...this.images, ...files]
  }

  getFilteredData<T extends Common.Media | Common.Image>(data: Array<T>): Array<T> {
    const captionImages = this.mergedImages
      .map((image) => {
        if ("caption" in image) return image.caption
        if ("originalName" in image) return image.originalName

        return null
      })
      .filter((image): image is string => image !== null)

    return data.filter((image) => {
      if ("caption" in image) return !captionImages.includes(image.caption)
      if ("originalName" in image) return !captionImages.includes(image.originalName)

      return null
    })
  }

  setMedia(media?: Common.Media[]) {
    if (!media) return
    this.media = media
  }

  setCopiedData(payload: { media: Common.Media[], images: Common.Image[] }) {
    this.applyActions(payload.images)("images")
    this.applyActions(payload.media)("media")
  }

  applyActions<T extends Common.Media | Common.Image>(data: Array<T>) {
    const filteredData = this.getFilteredData(data)
    const action = this.rootStore.settingsRows.images

    const actions = {
      add: (name: "images" | "media") => this[name] = [...this[name], ...filteredData] as any,
      replace: (name: "images" | "media") => this[name] = data as any,
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
