import { PhotosStore } from "features/categories/edit/model/stores/photos-store"
import { makeAutoObservable, IReactionDisposer, reaction } from "mobx"
import { CharacteristicsStore } from "entities/characteristic/model/store"
import { TagsStore } from "entities/tag"
import { AltNames } from "entities/alt-name/model/alt-name-store"
import { validation } from "shared/lib/validation"
import { categorySchema } from "features/categories/edit/model/schemas"
import { PhotoPositionStore } from "./photo-position-store"

export class RootStore {
  photoPosition: PhotoPositionStore
  photos: PhotosStore
  characteristics: CharacteristicsStore
  altNames: AltNames
  tags: TagsStore

  constructor() {
    this.photoPosition = new PhotoPositionStore(this)
    this.photos = new PhotosStore(this)
    this.characteristics = new CharacteristicsStore()
    this.altNames = new AltNames()
    this.tags = new TagsStore()

    makeAutoObservable(this, {}, { autoBind: true })
  }

  private stores = ["photoPosition", "photos", "characteristics", "altNames", "tags"]

  destroy() {
    this.photos = new PhotosStore(this)
    this.photoPosition = new PhotoPositionStore(this)
    this.characteristics = new CharacteristicsStore()
    this.altNames = new AltNames()
    this.tags = new TagsStore()
  }

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

export const rootStore = new RootStore()
export const createRootStore = () => new RootStore()
