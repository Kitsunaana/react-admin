import { makeAutoObservable } from "mobx"
import { HistoryStore } from "../../view-model/history/history-store"
import { RecordEvent } from "../../view-model/history/events"
import { SettingsRecord } from "../../view-model/setting/settings-types"
import { CharacteristicStore } from "../../model/characteristic/characteristic-store"
import { TagStore } from "../../model/tag/tag-store"
import { PhotosStore } from "../../model/photo/photos.store"
import { AltNameStore } from "../../model/alt-name/alt-name.store"
import { getCategoryDefaultRows } from "../../view-model/const"
import { PhotoPositionStore } from "../photo-position/photo-position.store"
import { CategoryOtherFields, CategoryRows } from "../../domain/category/types"

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
    getAltNames: (recordEvent: RecordEvent) => AltNameStore
    getTags: (recordEvent: RecordEvent) => TagStore
  }) {
    this.history = stores.getHistory(this)
    const { recordEvent } = this.history

    this.photos = stores.getPhotos(recordEvent)
    this.photoPosition = stores.getPhotoPosition(recordEvent)
    this.characteristic = stores.getCharacteristics(recordEvent)
    this.altNames = stores.getAltNames(recordEvent)
    this.tags = stores.getTags(recordEvent)

    makeAutoObservable(this, {}, { autoBind: true })
  }

  clear() {
    this.set()
  }

  get(): CategoryRows & CategoryOtherFields {
    return {
      characteristics: this.characteristic.list.get(),
      altNames: this.altNames.list.get(),
      tags: this.tags.list.get(),
      ...this.photoPosition.get(),
      ...this.photos.get(),
    }
  }

  set(payload: CategoryRows & CategoryOtherFields = this.defaultCategory) {
    this.characteristic.list.set(payload.characteristics)
    this.altNames.list.set(payload.altNames)

    this.photos.setImages(payload.images)
    this.photos.setMedia(payload.media)
    this.photoPosition.setPhotoPosition(this.photos.photos, {
      activeImageId: payload.activeImageId,
      captionPosition: payload.captionPosition,
    })
    this.tags.list.set(payload.tags)
  }

  setCopied(payload: CategoryRows & CategoryOtherFields, settings: SettingsRecord) {
    this.characteristic.setCopiedCharacteristics(settings.characteristics, payload.characteristics)

    this.tags.setCopiedTags(settings.tags, payload.tags)

    this.photos.setCopiedMedia(settings.images, payload.media)
    this.photos.setCopiedImages(settings.images, payload.images)

    this.photoPosition.setCopiedPhotoPosition(settings, {
      activeImageId: payload.activeImageId,
      captionPosition: payload.captionPosition,
    }, this.photos.photos)
  }
}
