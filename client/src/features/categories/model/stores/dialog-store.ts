import { makeAutoObservable } from "mobx"
import { CharacteristicsStore } from "entities/characteristic/model/store"
import { TagsStore } from "entities/tag"
import { AltNamesStore } from "entities/alt-name"
import { PhotosStore } from "features/categories/model/stores/photos-store"
import { z, ZodSchema } from "zod"
import { CategorySchemas, CategoryDto } from "shared/types/category"
import { validation } from "shared/lib/validation"
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

const categoryStoreSchema = CategorySchemas.getCategoryResponse.pick({
  activeImageId: true,
  altNames: true,
  captionPosition: true,
  media: true,
  characteristics: true,
})

type SetCategoryStore = Pick<
  CategoryDto.CategoryDto,
  "activeImageId" |
  "altNames" |
  "captionPosition" |
  "media" |
  "characteristics"
>

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

  setCopiedData(data: SetCategoryStore | undefined) {
    if (data === undefined) return

    console.log(data)
    const validatedData = validation(categoryStoreSchema, data) as SetCategoryStore

    // this.photos.setCopiedData({
    // })
  }

  setData(data: SetCategoryStore | undefined) {
    if (data === undefined) return

    const validatedData = validation(categoryStoreSchema, data) as SetCategoryStore

    this.photos.setMedia(validatedData.media)
    this.characteristics.setCharacteristics(validatedData.characteristics)
    this.altNames.setAltNames(validatedData.altNames)

    this.photoPosition.setPhotoPosition({
      activeImageId: validatedData.activeImageId,
      captionPosition: validatedData.captionPosition,
    })
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

  settingsFields = initialSettingInputs
  handleChangeSettingsFields(name: string, value: boolean) {
    this.settingsFields[name] = value
    localStorage.setItem("settingInputs", JSON.stringify(this.settingsFields))
  }

  settingsRows = initialSettings
  handleChangeSettingsRows(name: string, value: string) {
    this.settingsRows[name] = value
    localStorage.setItem("settings", JSON.stringify(this.settingsRows))
  }
}

export const createRootStore = () => new RootStore()
