import { makeAutoObservable, toJS } from "mobx"
import { nanoid } from "nanoid"
import { openGallery } from "shared/events/open-gallery"
import { eventBus } from "shared/lib/event-bus"
import { Image, Media } from "shared/types/new_types/types"
import { CategoryStore } from "../../model/category/category-store"

type Action = "add" | "replace" | "none"

export class PhotosStore {
  images: Image[] = []
  media: Media[] = []

  constructor(private parent: CategoryStore) {
    makeAutoObservable(this, { applyActions: false }, { autoBind: true })
  }

  reset() {
    this.images = []
    this.media = []
  }

  get photos() {
    return [...this.filteredMedia, ...this.images]
  }

  get filteredMedia() {
    return this.media.filter((media) => {
      if ("deleted" in media) return false
      return true
    })
  }

  openGallery(id: string) {
    const findIndex = this.photos.findIndex((image) => image.id === id)

    eventBus.emit(openGallery({
      index: findIndex,
      images: this.photos,
    }))
  }

  updateOrder(order: number, id: string) {
    this.media = this.media
      .map((media) => (media.id === id ? { ...media, order } : media))

    this.parent.history.recordEvent({
      id: nanoid(),
      type: "changeMediaOrder",
      value: { id, order },
      tab: 1,
    })
  }

  clearMedia(id: string) {
    this.media = this.media
      .map((media) => (media.id === id ? { ...media, deleted: true } : media))

    this.parent.history.recordEvent({
      id: nanoid(),
      type: "removeMedia",
      mediaId: id,
      tab: 1,
    })
  }

  clearImage(id: string) {
    this.images = this.images.filter((image) => image.id !== id)

    this.parent.history.recordEvent({
      id: nanoid(),
      type: "removeImage",
      imageId: id,
      tab: 1,
    })
  }

  createMedia(payload: Media[]) {
    this.media = this.media
      .concat(payload.map(({ id, ...other }) => ({
        ...other,
        id: nanoid(),
      })))
  }

  setUploadedFiles(files: Image[]) {
    this.images = [...this.images, ...files]

    this.parent.history.recordEvent({
      id: nanoid(),
      type: "addImages",
      images: files,
      tab: 1,
    })
  }

  getFilteredData<T extends Media | Image>(data: Array<T>): Array<T> {
    const captionImages = this.photos
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

  setMedia(media: Media[]) { this.media = media }
  setImages(images: Image[]) { this.images = images }

  setCopiedPhotos(
    action: Action,
    payload: {
      media: Media[],
      images: Image[]
    },
  ) {
    const actions = this.applyActions(action)

    actions.images(payload.images)()
    actions.media(payload.media)()
  }

  imagesActions(images: Image[]) {
    return {
      none: () => { },
      replace: () => { this.images = images },
      add: () => {
        const filteredImages = this.getFilteredData(images)
        this.images = [...this.images, ...filteredImages]
      },
    }
  }

  mediaActions(media: Media[]) {
    return {
      none: () => { },
      replace: () => {
        this.media.forEach(({ id }) => this.clearMedia(id))
        this.createMedia(media)
      },
      add: () => {
        const filteredMedia = this.getFilteredData(media)
        this.createMedia(filteredMedia)
      },
    }
  }

  applyActions(action: Action) {
    return {
      images: (payload: Image[]) => this.imagesActions(payload)[action],
      media: (payload: Media[]) => this.mediaActions(payload)[action],
    }
  }

  getData() {
    return {
      media: toJS(this.media),
      images: toJS(this.images),
    }
  }
}
