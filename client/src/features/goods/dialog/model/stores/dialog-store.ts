import { makeAutoObservable } from "mobx"
import { PhotosStore } from "features/goods/dialog/model/stores/photos-store"
import { CharacteristicsStore } from "entities/characteristic/model/characteristics-store"
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
    this.characteristics = new CharacteristicsStore(() => "none")
    this.altNames = new AltNamesStore()
  }

  destroy() { this.createStores() }

  setData(data: any) {}

  getData(all: boolean = false) {
    return this.stores.reduce((parentPrev, parentCurrent) => {
      const result = Object.keys(this[parentCurrent]).reduce(() => {
        if (typeof this[parentCurrent]?.getData !== "function") return

        return this[parentCurrent].getData(all)
      }, {})

      return { ...parentPrev, ...result }
    }, {})
  }
}

export const createRootStore = () => new RootStore()
