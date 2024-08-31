import { PhotosStore } from "features/categories/edit/model/stores/photos-store"
import { makeAutoObservable } from "mobx"
import { CharacteristicsStore } from "entities/characteristic/model/store"
import { TagsStore } from "entities/tag"
import { validation } from "shared/lib/validation"
import { categorySchema } from "features/categories/edit/model/schemas"
import { AltNamesStore } from "entities/alt-name"
import { PhotoPositionStore } from "./photo-position-store"

export class RootStore {
  tags!: TagsStore
  photos!: PhotosStore
  altNames!: AltNamesStore
  photoPosition!: PhotoPositionStore
  characteristics!: CharacteristicsStore

  createStores() {
    this.tags = new TagsStore()
    this.photos = new PhotosStore(this)
    this.altNames = new AltNamesStore()
    this.photoPosition = new PhotoPositionStore(this)
    this.characteristics = new CharacteristicsStore()
  }

  constructor() {
    this.createStores()

    makeAutoObservable(this, {}, { autoBind: true })
  }

  private stores = ["photoPosition", "photos", "characteristics", "altNames", "tags"]

  destroy() { this.createStores() }

  setData(data: any) {
    const validatedData = validation(categorySchema, data)

    this.photos.setMedia(validatedData.media)
    this.photoPosition.setPhotoPosition(validatedData?.custom)
    this.characteristics.setCharacteristics(validatedData?.characteristics)
    this.altNames.setAltNames(validatedData?.altNames)
    this.tags.setTags(validatedData?.tags)
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

        // prev[current] = this[parentCurrent][current]
        return prev
      }, {})

      return { ...parentPrev, ...result }
    }, {})
  }
}

export const createRootStore = () => new RootStore()
