import { makeAutoObservable } from "mobx"
import { CharacteristicsStore } from "entities/characteristic/model/store"
import { TagsStore } from "entities/tag"
import { validation } from "shared/lib/validation"
import { AltNamesStore } from "entities/alt-name"
import { PhotosStore } from "features/categories/model/stores/photos-store"
import { categorySchema, CustomCategory } from "features/categories/model/schemas"
import { PhotoPositionStore } from "./photo-position-store"

type Actions = "add" | "replace" | "none"
type Tabs = "altNames" | "characteristics" | "images" | "tags"

const initialSettings: Record<Tabs, Actions> = {
  altNames: "add",
  characteristics: "add",
  images: "add",
  tags: "add",
}

type Setting = keyof typeof initialSettings

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
    let validatedData = data
    if (!data?.copied) validatedData = validation(categorySchema, data)

    this.photos.setMedia(validatedData.media)
    this.photos.setImages(validatedData?.images)
    this.photoPosition.setPhotoPosition(validatedData?.custom)
    this.characteristics.setCharacteristics(validatedData?.characteristics)
    this.altNames.setAltNames(validatedData?.altNames)
    this.tags.setTags(validatedData?.tags)
  }

  getData(all: boolean = false) {
    return this.stores.reduce((parentPrev, parentCurrent) => {
      const result = Object.keys(this[parentCurrent]).reduce((prev, current) => {
        if (this[parentCurrent][current] instanceof RootStore) return prev

        if (typeof this[parentCurrent]?.getData === "function") {
          const data = this[parentCurrent].getData(all)

          if (data?.rootStore && data?.rootStore instanceof RootStore) delete data.rootStore

          return data
        }

        // prev[current] = this[parentCurrent][current]
        return prev
      }, {})

      return { ...parentPrev, ...result }
    }, {})
  }

  getCopyData = () => {
    const data = this.getData(true)
    const { custom, ...otherProperties } = data as { custom: CustomCategory }
    const { id, ...otherCustomProperties } = custom

    return { custom: otherCustomProperties, ...otherProperties }
  }

  settings = initialSettings
  onChangePasteSettings<
    Name extends Setting | string,
    Value extends Actions | string
  >(name: Name, value: Value) {
    const isValidName = (name: string): name is Setting => name in this.settings
    const isValidValue = (value: string): value is Actions => ["add", "replace", "none"].includes(value)

    if (!isValidName(name)) return
    if (!isValidValue(value)) return

    this.settings[name] = value
  }
}

export const createRootStore = () => new RootStore()