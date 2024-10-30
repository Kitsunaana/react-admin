import { makeAutoObservable, toJS } from "mobx"
import { nanoid } from "nanoid"
import { Common } from "shared/types/common"
import { eventBus } from "shared/lib/event-bus"
import { openGallery } from "features/categories/dialog/domain/event"
import { PhotosStoreImpl } from "../domain/interface-photos.store"

type Action = "add" | "replace" | "none"

export class PhotosStore implements PhotosStoreImpl {
  images: Common.Image[] = []
  media: (Common.Media & { deleted?: boolean })[] = []

  constructor() {
    makeAutoObservable(this, { applyActions: false }, { autoBind: true })
  }

  get mergedImages() { return [...this.filteredMedia, ...this.images] }

  get filteredMedia() { return this.media.filter((media) => !media.deleted) }

  openGallery = (id: number | string) => {
    const findIndex = this.mergedImages.findIndex((image) => image.id === id)

    eventBus.emit(openGallery({ index: findIndex, images: this.mergedImages }))
  }

  updateOrder = (order: number, id: string) => {
    this.media = this.media
      .map((media) => (media.id === id ? { ...media, order } : media))
  }

  clearMedia = (id: string) => {
    this.media = this.media
      .map((media) => (media.id === id ? { ...media, deleted: true } : media))
  }

  clearImage = (id: string) => {
    this.images = this.images.filter((image) => image.id !== id)
  }

  createMedia = (payload: Common.Media[]) => {
    this.media = this.media.concat(payload.map(({ id, ...other }) => {
      const newId = nanoid()

      return {
        ...other,
        id: newId,
      }
    }))
  }

  setUploadedFiles = (files: Common.Image[]) => { this.images = [...this.images, ...files] }

  getFilteredData<T extends Common.Media | Common.Image>(data: Array<T>): Array<T> {
    const captionImages = this.mergedImages
      .map((image) => {
        if ("caption" in image) return image.caption
        if ("originalName" in image) return image.originalName

        return null
      })
      .filter((caption): caption is string => caption !== null)

    return data.filter((image) => {
      if ("caption" in image) return !captionImages.includes(image.caption)
      if ("originalName" in image) return !captionImages.includes(image.originalName)

      return null
    })
  }

  setMedia = (media: Common.Media[]) => { this.media = media }
  setImages = (images: Common.Image[]) => { this.images = images }
  addImages = (images: Common.Image[]) => {
    this.images.concat(images)
  }

  setCopiedMedia = (
    action: Action,
    payload: {
      media: Common.Media[],
      images: Common.Image[]
    },
  ) => {
    const actions = this.applyActions(action)

    actions.images(payload.images)()
    actions.media(payload.media)()
  }

  imagesActions = (images: Common.Image[]) => ({
    none: () => { },
    replace: () => { this.images = images },
    add: () => {
      const filteredImages = this.getFilteredData(images)
      this.images = [...this.images, ...filteredImages]
    },
  })

  mediaActions = (media: Common.Media[]) => ({
    none: () => { },
    replace: () => {
      this.media.forEach(({ id }) => this.clearMedia(id))
      this.createMedia(media)
    },
    add: () => {
      const filteredMedia = this.getFilteredData(media)
      this.createMedia(filteredMedia)
    },
  })

  applyActions = (action: Action) => ({
    images: (payload: Common.Image[]) => this.imagesActions(payload)[action],
    media: (payload: Common.Media[]) => this.mediaActions(payload)[action],
  })

  getData = () => ({
    media: toJS(this.media),
    images: toJS(this.images),
  })
}
