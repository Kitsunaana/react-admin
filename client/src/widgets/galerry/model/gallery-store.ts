import { makeAutoObservable } from "mobx"

class GalleryStore {
  scale = 1
  maxScale = 3
  minScale = 0.4

  rotate = 0

  constructor() {
    makeAutoObservable(this)
  }

  updateScale = (direction: "up" | "down") => {
    this.scale += direction === "up" ? 0.2 : -0.2
  }

  canScale = (direction: "up" | "down") => {
    const { scale, maxScale, minScale } = this

    return direction === "up"
      ? scale >= maxScale
      : scale <= minScale
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
