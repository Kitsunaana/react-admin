import { makeAutoObservable } from "mobx"
import { getDefaultValue } from "shared/lib/local-storage"
import { CategoryDto } from "shared/types/category"
import { CategoryStoreProviderProps } from "features/categories/dialog/ui/context"
import { initialSettingsFields, initialSettingsRows } from "../domain/const"
import { settingFieldsSchema, settingsRowsSchema } from "../domain/schemas"
import { Action, KeysSettingsFields, KeysSettingsRows } from "../domain/types"

/* export interface CategoryWithEvents {
  newData: Category
  lastData: Category
  event: CategoryEvents
} */

export class RootCategoryStores {
  tagsStore!: CategoryStoreProviderProps["TagsStore"]
  photosStore!: CategoryStoreProviderProps["PhotosStore"]
  altNamesStore!: CategoryStoreProviderProps["AltNameStore"]
  photoPositionStore!: CategoryStoreProviderProps["PhotoPositionStore"]
  characteristicsStore!: CategoryStoreProviderProps["CharacteristicsStore"]
  historyStore!: CategoryStoreProviderProps["HistoryStore"]

  settingsFields = initialSettingsFields
  settingsRows = initialSettingsRows

  constructor(stores: CategoryStoreProviderProps) {
    this.createStores(stores)

    makeAutoObservable(this, {}, { autoBind: true })

    getDefaultValue<typeof this.settingsRows>({
      key: "settingsRows",
      schema: settingsRowsSchema,
      parse: true,
      onSuccess: (settings) => { this.settingsRows = settings },
    })

    getDefaultValue<typeof this.settingsFields>({
      key: "settingsFields",
      schema: settingFieldsSchema,
      parse: true,
      onSuccess: (settings) => { this.settingsFields = settings },
    })
  }

  destroy = () => { }

  createStores = (stores: CategoryStoreProviderProps) => {
    this.photosStore = new stores.PhotosStore(() => this.settingsRows.images)
    this.photoPositionStore = new stores.PhotoPositionStore(this.photosStore)
    this.characteristicsStore = new stores.CharacteristicsStore(() => this.settingsRows.characteristics)
    this.altNamesStore = new stores.AltNameStore()
    this.tagsStore = new stores.TagsStore(() => this.settingsRows.tags)
    this.historyStore = new stores.HistoryStore()
  }

  setCopiedData = (payload: CategoryDto.CategoryRows) => {
    this.tagsStore.setCopiedTags(payload.tags)

    this.photoPositionStore.setPhotoPosition({
      activeImageId: payload.activeImageId,
      captionPosition: payload.captionPosition,
    })

    this.photosStore.setCopiedMedia({
      images: payload.images,
      media: payload.media,
    })

    this.characteristicsStore.setCopiedCharacteristics(payload.characteristics)
  }

  setData = (payload: CategoryDto.CategoryRows | undefined) => {
    if (payload === undefined) return

    if (payload.images) this.photosStore.setImages(payload.images)

    this.photosStore.setMedia(payload.media)
    this.characteristicsStore.setCharacteristics(payload.characteristics)
    this.altNamesStore.setAltNames(payload.altNames)
    this.tagsStore.setTags(payload.tags)

    this.photoPositionStore.setPhotoPosition({
      activeImageId: payload.activeImageId,
      captionPosition: payload.captionPosition,
    })
  }

  getData = (): CategoryDto.CategoryRows => ({
    ...this.photoPositionStore.getData(),
    ...this.photosStore.getData(),
    ...this.characteristicsStore.getData(),
    ...this.altNamesStore.getData(),
    ...this.tagsStore.getData(),
  })

  get category() {
    /* if (this.historyStore.events.length === 0) return toJS(this.historyStore._category)

    return this.historyStore.events
      .reduce(categoryProducer, toJS(this.historyStore._category) as Category) */
  }

  get categoryWithEvents(): CategoryWithEvents[] {
    /* const result: CategoryWithEvents[] = []

    let lastData = this.historyStore._category
    if (lastData === undefined) return result

    // eslint-disable-next-line no-restricted-syntax
    for (const event of this.historyStore.allEvents) {
      const newData = categoryProducer(toJS(lastData), event)
      result.push({ newData, lastData, event })
      lastData = newData
    }

    return result */
  }

  handleChangeSettingsFields = (name: KeysSettingsFields, value: boolean) => {
    this.settingsFields[name] = value
    localStorage.setItem("settingsFields", JSON.stringify(this.settingsFields))
  }

  handleChangeSettingsRows = (name: KeysSettingsRows, value: Action) => {
    this.settingsRows[name] = value
    localStorage.setItem("settingsRows", JSON.stringify(this.settingsRows))
  }
}
