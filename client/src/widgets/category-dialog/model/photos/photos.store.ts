import { makeAutoObservable, toJS } from "mobx"
import { nanoid } from "nanoid"
import { openGallery } from "shared/events/open-gallery"
import { eventBus } from "shared/lib/event-bus"
import { Image, Media } from "shared/types/new_types/types"
import { PasteAction } from "../../domain/settings"
import { RecordEvent } from "../../model/history/events"

export class PhotosStore {
  images: Image[] = []
  media: Media[] = []

  constructor(private recordEvent: RecordEvent) {
    makeAutoObservable(this, { }, { autoBind: true })
  }

  get photos() {
    return [...this.filteredMedia, ...this.images]
  }

  get filteredMedia() {
    return this.media.filter((media) => !media.delete)
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

    this.recordEvent({
      id: nanoid(),
      type: "changeMediaOrder",
      value: { id, order },
      tab: 1,
    })
  }

  clearMedia(id: string) {
    this.media = this.media
      .map((media) => (media.id === id ? { ...media, deleted: true } : media))

    this.recordEvent({
      id: nanoid(),
      type: "removeMedia",
      mediaId: id,
      tab: 1,
    })
  }

  clearImage(id: string) {
    this.images = this.images.filter((image) => image.id !== id)

    this.recordEvent({
      id: nanoid(),
      type: "removeImage",
      imageId: id,
      tab: 1,
    })
  }

  setUploadedFiles(files: Image[]) {
    this.images = [...this.images, ...files]

    this.recordEvent({
      id: nanoid(),
      type: "addImages",
      images: files,
      tab: 1,
    })
  }

  getFilteredMedia(media: Media[]) {
    const captionMedia = this.media.map((m) => m.originalName)
    return media.filter((m) => !captionMedia.includes(m.originalName))
  }

  getFilteredImages(images: Image[]) {
    const captionImages = this.images.map((m) => m.caption)
    return images.filter((m) => !captionImages.includes(m.caption))
  }

  get() {
    return {
      media: toJS(this.media),
      images: toJS(this.images),
    }
  }

  setMedia(media: Media[]) {
    this.media = media
  }

  setImages(images: Image[]) {
    this.images = images
  }

  setCopiedImages(action: PasteAction, images: Image[]) {
    if (action === "replace") {
      this.images = images
      return
    }

    if (action === "add") {
      this.images = this.images.concat(this.getFilteredImages(images))
    }
  }

  setCopiedMedia(action: PasteAction, media: Media[]) {
    if (action === "replace") {
      this.media.forEach((m) => this.clearMedia(m.id))
      this.media = media
      return
    }

    if (action === "add") {
      this.media = this.media.concat(this.getFilteredMedia(media))
    }
  }
}
