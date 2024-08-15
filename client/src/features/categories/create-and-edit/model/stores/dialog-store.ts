import { PhotosStore } from "features/categories/create-and-edit/model/stores/photos-store"
import { makeAutoObservable } from "mobx"
import { PhotoPositionStore } from "./photo-position-store"

export class RootStore {
  photoPosition: PhotoPositionStore
  photos: PhotosStore

  constructor() {
    this.photoPosition = new PhotoPositionStore(this)
    this.photos = new PhotosStore(this)

    makeAutoObservable(this, {}, { autoBind: true })
  }

  private stores = ["photoPosition", "photos"]

  destroy() {
    this.photos = new PhotosStore(this)
    this.photoPosition = new PhotoPositionStore(this)
  }

  setData(data: any) {
    if (!data) return

    this.photos.setMedia(data?.media)
    this.photoPosition.setPhotoPosition(data?.custom)

    // this.stores.forEach((store) => {
    //   Object.keys(this[store]).forEach((key) => {
    //     if (key in data) this[key] = data[key]
    //   })
    // })
  }

  getData() {
    return this.stores.reduce((parentPrev, parentCurrent) => {
      const result = Object.keys(this[parentCurrent]).reduce((prev, current) => {
        if (this[parentCurrent][current] instanceof RootStore) return prev

        if (typeof this[parentCurrent]?.getData === "function") {
          const data = this[parentCurrent].getData()

          if (data?.rootStore && data?.rootStore instanceof RootStore) delete data.rootStore

          return data
        }

        prev[current] = this[parentCurrent][current]
        return prev
      }, {})

      return { ...parentPrev, ...result }
    }, {})
  }
}

export const rootStore = new RootStore()
