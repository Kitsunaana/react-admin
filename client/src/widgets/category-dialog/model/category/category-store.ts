import { makeAutoObservable } from "mobx"
import { CategoryOtherFields, CategoryRows } from "shared/types/new_types/types"
import { SettingsRecord } from "widgets/category-dialog/domain/settings"
import { RecordEvent } from "widgets/category-dialog/model/history/events"
import { CharacteristicStore } from "widgets/category-dialog/model/characteristic/characteristic-store"
import { TagStore } from "widgets/category-dialog/model/tag/tag-store"
import { HistoryStore } from "../history/history-store"
import { PhotosStore } from "../photos/photos.store"
import { getCategoryDefaultRows } from "../../domain/const"
import { PhotoPositionStore } from "../photo-position/photo-position.store"
import { AltNameStore } from "../alt-names/alt-name.store"

export class CategoryStore {
  history!: HistoryStore
  photos!: PhotosStore
  photoPosition!: PhotoPositionStore
  characteristic!: CharacteristicStore
  altNames!: AltNameStore
  tags!: TagStore

  defaultCategory: CategoryRows & CategoryOtherFields = getCategoryDefaultRows()

  constructor(stores: {
    getHistory: (parent: CategoryStore) => HistoryStore
    getPhotos: (recordEvent: RecordEvent) => PhotosStore
    getPhotoPosition: (recordEvent: RecordEvent) => PhotoPositionStore
    getCharacteristics: (recordEvent: RecordEvent) => CharacteristicStore
    getAltNames: (parent: CategoryStore) => AltNameStore
    getTags: (recordEvent: RecordEvent) => TagStore
  }) {
    this.history = stores.getHistory(this)
    const { recordEvent } = this.history

    this.photos = stores.getPhotos(recordEvent)
    this.photoPosition = stores.getPhotoPosition(recordEvent)
    this.characteristic = stores.getCharacteristics(recordEvent)
    this.altNames = stores.getAltNames(this)
    this.tags = stores.getTags(recordEvent)

    makeAutoObservable(this, {}, { autoBind: true })
  }

  clear() {
    this.set()
  }

  get(): CategoryRows & CategoryOtherFields {
    return {
      characteristics: this.characteristic.list.get(),
      tags: this.tags.get(),
      ...this.photoPosition.get(),
      ...this.photos.get(),
      ...this.altNames.getData(),
    }
  }

  set(payload: CategoryRows & CategoryOtherFields = this.defaultCategory) {
    this.characteristic.list.set(payload.characteristics)

    this.photos.setImages(payload.images)
    this.photos.setMedia(payload.media)
    this.photoPosition.setPhotoPosition(this.photos.photos, {
      activeImageId: payload.activeImageId,
      captionPosition: payload.captionPosition,
    })
    this.altNames.setAltNames(payload.altNames)
    this.tags.set(payload.tags)
  }

  setCopied(payload: CategoryRows & CategoryOtherFields, settings: SettingsRecord) {
    this.characteristic.setCopiedCharacteristics(settings.characteristics, payload.characteristics)

    this.photos.setCopiedMedia(settings.images, payload.media)
    this.photos.setCopiedImages(settings.images, payload.images)
    this.tags.setCopiedTags(settings.tags, payload.tags)
    this.photoPosition.setCopiedPhotoPosition(settings, {
      activeImageId: payload.activeImageId,
      captionPosition: payload.captionPosition,
    }, this.photos.photos)
  }
}
