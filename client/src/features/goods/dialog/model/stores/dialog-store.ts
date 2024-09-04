import { makeAutoObservable } from "mobx"
import { PhotosStore } from "features/goods/dialog/model/stores/photos-store"
import { CharacteristicsStore } from "entities/characteristic/model/store"
import { AltNamesStore } from "entities/alt-name"

export class RootStore {
  private stores = ["photos"]

  photos!: PhotosStore
  characteristics!: CharacteristicsStore
  altNames!: AltNamesStore

  constructor() {
    this.createStores()

    makeAutoObservable(this, {}, { autoBind: true })
  }

  createStores() {
    this.photos = new PhotosStore(this)
    this.characteristics = new CharacteristicsStore()
    this.altNames = new AltNamesStore()
  }

  destroy() { this.createStores() }

  setData(data: any) {}

  getData() {
    return ["photos", "characteristics", "altNames"]
      .reduce((prev, current) => {
        if (typeof this[current]?.getData === "function") {
          prev[current] = this[current]?.getData()
        }

        return prev
      }, {})
  }
}

export const createRootStore = () => new RootStore()
