import { makeAutoObservable } from "mobx"
import { CharacteristicsStore } from "entities/characteristic/model/store"
import { TagsStore } from "entities/tag"
import { validation } from "shared/lib/validation"
import { AltNamesStore } from "entities/alt-name"
import { PhotosStore } from "features/categories/model/stores/photos-store"
import { categorySchema, CustomCategory } from "features/categories/model/schemas"
import { z, ZodSchema } from "zod"
import { PhotoPositionStore } from "./photo-position-store"

type Actions = "add" | "replace" | "none"
type Tabs = "altNames" | "characteristics" | "images" | "tags"

const initialSettings: Record<Tabs, Actions> = {
  altNames: "add",
  characteristics: "add",
  images: "add",
  tags: "add",
}

const enumActions = z.enum(["add", "replace", "none"])

const settingsSchema = z.object({
  altNames: enumActions,
  characteristics: enumActions,
  images: enumActions,
  tags: enumActions,
})

const settingInputsSchema = z.object({
  activeImageId: z.boolean(),
  bgColor: z.boolean(),
  blur: z.boolean(),
  caption: z.boolean(),
  captionPosition: z.boolean(),
  color: z.boolean(),
  description: z.boolean(),
  isShowPhotoWithGoods: z.boolean(),
})

const initialSettingInputs = {
  caption: true,
  description: false,
  blur: false,
  bgColor: true,
  color: false,
  isShowPhotoWithGoods: false,
  activeImageId: true,
  captionPosition: true,
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
    this.characteristics = new CharacteristicsStore(() => this.settings.characteristics)
  }

  constructor() {
    this.createStores()

    makeAutoObservable(this, {}, { autoBind: true })

    // const settings = localStorage.getItem("settings")
    // const parsedSettings = settingsSchema.safeParse(JSON.parse(settings ?? "{}"))
    // if (parsedSettings.data) this.settings = parsedSettings.data

    // const settingInputs = localStorage.getItem("settingInputs")
    // const parsedSettingInputs = settingInputsSchema.safeParse(JSON.parse(settingInputs ?? "{}"))
    // if (parsedSettingInputs.data) this.settingInputs = parsedSettingInputs.data

    const getLocalStorageData = (name: string, schema: ZodSchema) => {
      const data = localStorage.getItem(name)
      const parsedData = schema.safeParse(JSON.parse(data ?? "{}"))
      if (parsedData.data) this[name] = parsedData.data
    }

    getLocalStorageData("settings", settingsSchema)
    getLocalStorageData("settingInputs", settingInputsSchema)
  }

  private stores = ["photoPosition", "photos", "characteristics", "altNames", "tags"]

  destroy() { this.createStores() }

  setData(data: any) {
    const validatedData = data
    // if (!data?.copied) validatedData = validation(categorySchema, data)

    if (data?.copied) {
      this.photos.setCopiedMedia(validatedData.media)
      this.photos.setCopiedImages(validatedData?.images)
    } else {
      this.photos.setMedia(validatedData.media)
    }

    this.photoPosition.setPhotoPosition({
      activeImageId: validatedData.activeImageId,
      captionPosition: validatedData.captionPosition,
    })

    if (data?.copied) {
      this.characteristics.setCopiedCharacteristics(validatedData?.characteristics)
    } else {
      this.characteristics.setCharacteristics(validatedData?.characteristics)
    }
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

    return { custom, ...otherProperties }
  }

  settingInputs = initialSettingInputs
  onChangeSettingInput(name: string, value: boolean) {
    this.settingInputs[name] = value
    localStorage.setItem("settingInputs", JSON.stringify(this.settingInputs))
  }

  settings = initialSettings
  onChangePasteSettings(name: string, value: string) {
    this.settings[name] = value
    localStorage.setItem("settings", JSON.stringify(this.settings))
  }
}

export const createRootStore = () => new RootStore()
