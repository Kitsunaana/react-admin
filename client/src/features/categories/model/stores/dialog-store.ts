import { makeAutoObservable } from "mobx"
import { CharacteristicsStore } from "entities/characteristic/model/store"
import { TagsStore } from "entities/tag"
import { AltNamesStore } from "entities/alt-name"
import { PhotosStore } from "features/categories/model/stores/photos-store"
import { CustomCategory } from "features/categories/model/schemas"
import { z, ZodSchema } from "zod"
import { PhotoPositionStore } from "./photo-position-store"

type Actions = "add" | "replace" | "none"
type Tabs = "characteristics" | "images" | "tags"

const initialSettings: Record<Tabs, Actions> = {
  characteristics: "add",
  images: "add",
  tags: "add",
}

const enumActions = z.enum(["add", "replace", "none"])

const settingsSchema = z.object({
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
    this.tags = new TagsStore(this)
    this.photos = new PhotosStore(this)
    this.altNames = new AltNamesStore()
    this.photoPosition = new PhotoPositionStore(this)
    this.characteristics = new CharacteristicsStore(() => this.settings.characteristics)
  }

  constructor() {
    this.createStores()

    makeAutoObservable(this, {}, { autoBind: true })
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

    console.log(data)
    if (data?.copied) {
      this.photos.setCopiedMedia(validatedData.media)
      this.photos.setCopiedImages(validatedData?.images)
      this.characteristics.setCopiedCharacteristics(validatedData?.characteristics)
      this.tags.setCopiedTags(validatedData?.tags)
    } else {
      this.photos.setMedia(validatedData.media)
      this.characteristics.setCharacteristics(validatedData?.characteristics)
      this.tags.setTags(validatedData?.tags)
    }

    this.photoPosition.setPhotoPosition({
      activeImageId: validatedData.activeImageId,
      captionPosition: validatedData.captionPosition,
    })

    this.altNames.setAltNames(validatedData?.altNames)

    /* if (data?.copied) {
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

    if (data?.copied) {
      this.tags.setCopiedTags(validatedData?.tags)
    } else {
      this.tags.setTags(validatedData?.tags)
    } */
  }

  getData(all: boolean = false) {
    return this.stores.reduce((parentPrev, parentCurrent) => {
      const result = Object.keys(this[parentCurrent]).reduce(() => {
        if (typeof this[parentCurrent]?.getData !== "function") return

        return this[parentCurrent].getData(all)
      }, {})

      return { ...parentPrev, ...result }
    }, {})
  }

  getCopyData = () => {
    const data = this.getData(true)
    const { custom, order, ...otherProperties } = data as { custom: CustomCategory, order: number }

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
