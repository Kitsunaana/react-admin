import { PhotosStore } from "features/categories/create-and-edit/model/stores/photos-store"
import { makeAutoObservable, IReactionDisposer, reaction } from "mobx"
import { CharacteristicsStore } from "features/characteristics/ui/dialog"
import { PhotoPositionStore } from "./photo-position-store"

export class RootStore {
  photoPosition: PhotoPositionStore
  photos: PhotosStore
  characteristics: CharacteristicsStore

  constructor() {
    this.photoPosition = new PhotoPositionStore(this)
    this.photos = new PhotosStore(this)
    this.characteristics = new CharacteristicsStore(this)

    makeAutoObservable(this, {}, { autoBind: true })
  }

  private stores = ["photoPosition", "photos"]

  destroy() {
    this.photos.destroy()
    this.photos = new PhotosStore(this)
    this.photoPosition = new PhotoPositionStore(this)
  }

  setData(data: any) {
    console.log(data)

    if (!data) {
      this.photos.destroy()
      this.photoPosition = new PhotoPositionStore(this)
    } else {
      this.photos.setMedia(data?.media)
      this.photoPosition.setPhotoPosition(data?.custom)
    }
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
export const createRootStore = () => new RootStore()