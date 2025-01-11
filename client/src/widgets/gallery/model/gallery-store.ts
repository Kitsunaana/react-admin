import { makeAutoObservable } from "mobx"
import { sleep } from "shared/lib/utils"
import { Photo, OpenGalleryData, subscribeOpenGallery } from "./types"

export class GalleryStore {
  public scale = 1
  public maxScale = 3
  public minScale = 0.4

  public rotate = 0

  public open = false
  public indexActiveImage = 0
  public photos: Photo[] = []

  public constructor() {
    makeAutoObservable(this, {}, {
      autoBind: true,
    })

    subscribeOpenGallery(this.openGallery)
  }

  public openGallery(data: OpenGalleryData, callback?: (index: number) => void) {
    this.open = true
    this.photos = data.photos
    this.indexActiveImage = data.index ?? 0

    sleep(1)
      .then(() => callback?.(this.indexActiveImage))
  }

  public closeGallery() {
    this.open = false
  }

  public get prevImage() {
    return this.photos[this.indexActiveImage - 1]
  }

  public get nextImage() {
    return this.photos[this.indexActiveImage + 1]
  }

  public setNextIndexActiveImage() {
    this.indexActiveImage += 1
    return this.indexActiveImage
  }

  public setPrevIndexActiveImage() {
    this.indexActiveImage -= 1
    return this.indexActiveImage
  }

  public setIndexActiveImage(index: number) {
    this.indexActiveImage = index
    return this.indexActiveImage
  }

  public zoomInScale() {
    this.scale += 0.2
  }

  public zoomOutScale() {
    this.scale += -0.2
  }

  public get canZoomInScale() {
    return this.scale >= this.maxScale
  }

  public get canZoomOutScale() {
    return this.scale <= this.minScale
  }

  public get disabledPrev() {
    return !this.prevImage
  }

  public get disabledNext() {
    return !this.nextImage
  }

  public updateRotate = (direction: "right" | "left") => {
    this.rotate += direction === "right" ? 90 : -90
  }

  public setDefaultParameters = () => {
    this.scale = 1
    this.rotate = 0
  }

  public get counterImage() {
    return `${this.indexActiveImage + 1}/${this.photos.length}`
  }
}

export const galleryStore = new GalleryStore()
