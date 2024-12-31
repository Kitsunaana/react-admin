import { makeAutoObservable } from "mobx"
import { Image, Media } from "shared/types/new_types/types"

interface IData {
  index?: number
  images: (Image | Media)[]
}

class GalleryStore {
  scale = 1
  maxScale = 3
  minScale = 0.4

  rotate = 0

  open = false
  indexActiveImage = 0
  images: (Image | Media)[] = []

  constructor() {
    makeAutoObservable(this, {}, {
      autoBind: true,
    })
  }

  openGallery(data: IData) {
    this.open = true
    this.images = data.images
    this.indexActiveImage = data.index ?? 0
  }

  closeGallery() {
    this.open = false
  }

  get prevImage() {
    return this.images[this.indexActiveImage - 1]
  }

  get nextImage() {
    return this.images[this.indexActiveImage + 1]
  }

  setNextIndexActiveImage() {
    this.indexActiveImage += 1
  }

  setPrevIndexActiveImage() {
    this.indexActiveImage -= 1
  }

  setIndexActiveImage(index: number) {
    this.indexActiveImage = index
  }

  zoomInScale() {
    this.scale += 0.2
  }

  zoomOutScale() {
    this.scale += -0.2
  }

  get canZoomInScale() {
    return this.scale >= this.maxScale
  }

  get canZoomOutScale() {
    return this.scale <= this.minScale
  }

  get disabledPrev() {
    return !this.prevImage
  }

  get disabledNext() {
    return !this.nextImage
  }

  updateRotate = (direction: "right" | "left") => {
    this.rotate += direction === "right" ? 90 : -90
  }

  setDefaultParameters = () => {
    this.scale = 1
    this.rotate = 0
  }
}

export const galleryStore = new GalleryStore()
