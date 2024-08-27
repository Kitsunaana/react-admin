import { PhotosStore } from "features/categories/create-and-edit/model/stores/photos-store"
import { makeAutoObservable, IReactionDisposer, reaction } from "mobx"
import { CharacteristicsStore } from "entities/characteristic/model/store"
import { TagsStore } from "entities/tag"
import { AltNames } from "entities/alt-name/model/alt-name-store"
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
    this.photos.setMedia(data?.media)
    this.photoPosition.setPhotoPosition(data?.custom)
    this.characteristics.setCharacteristics(data?.characteristics)
    this.altNames.setAltNames(data?.altNames)
    this.tags.setTags(data?.tags)
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
