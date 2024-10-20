import { AltNamesStore } from "entities/alt-name"
import { CharacteristicsStore } from "entities/characteristic/model/characteristics-store"
import { TagsStore } from "entities/tag"
import { makeAutoObservable } from "mobx"
import { getDefaultValue } from "shared/lib/local-storage"
import { CategoryDto } from "shared/types/category"
import { initialSettingsFields, initialSettingsRows } from "../const"
import { settingFieldsSchema, settingsRowsSchema } from "../schemas"
import { Action, KeysSettingsFields, KeysSettingsRows } from "../types"
import { PhotoPositionStore } from "./photo-position-store"
import { PhotosStore } from "./photos-store"

export class RootStore {
  tags!: TagsStore
  photos!: PhotosStore
  altNames!: AltNamesStore
  photoPosition!: PhotoPositionStore
  characteristics!: CharacteristicsStore

  settingsFields = initialSettingsFields
  settingsRows = initialSettingsRows

  constructor() {
    this.createStores()

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

  destroy = () => { this.createStores() }

  createStores = () => {
    this.photos = new PhotosStore(() => this.photoPosition, () => this.settingsRows.images)
    this.photoPosition = new PhotoPositionStore(this.photos)
    this.characteristics = new CharacteristicsStore(() => this.settingsRows.characteristics)
    this.altNames = new AltNamesStore()
    this.tags = new TagsStore(() => this.settingsRows.tags)
  }

  setCopiedData = (payload: CategoryDto.CategoryRows) => {
    this.tags.setCopiedTags(payload.tags)

    this.photoPosition.setPhotoPosition({
      activeImageId: payload.activeImageId,
      captionPosition: payload.captionPosition,
    })

    this.photos.setCopiedMedia({
      images: payload.images,
      media: payload.media,
    })

    this.characteristics.setCopiedCharacteristics(payload.characteristics)
  }

  setData = (payload: CategoryDto.CategoryRows | undefined) => {
    if (payload === undefined) return

    this.photos.setMedia(payload.media)
    this.characteristics.setCharacteristics(payload.characteristics)
    this.altNames.setAltNames(payload.altNames)
    this.tags.setTags(payload.tags)

    this.photoPosition.setPhotoPosition({
      activeImageId: payload.activeImageId,
      captionPosition: payload.captionPosition,
    })
  }

  getData = (): CategoryDto.CategoryRows => ({
    ...this.photoPosition.getData(),
    ...this.photos.getData(),
    ...this.characteristics.getData(),
    ...this.altNames.getData(),
    ...this.tags.getData(),
  })

  handleChangeSettingsFields = (name: KeysSettingsFields, value: boolean) => {
    this.settingsFields[name] = value
    localStorage.setItem("settingsFields", JSON.stringify(this.settingsFields))
  }

  handleChangeSettingsRows = (name: KeysSettingsRows, value: Action) => {
    this.settingsRows[name] = value
    localStorage.setItem("settingsRows", JSON.stringify(this.settingsRows))
  }
}

export const createRootStore = () => new RootStore()
