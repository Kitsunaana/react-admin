import { makeAutoObservable } from "mobx"
import { CategoryDto } from "shared/types/category"
import { CategoryStores } from "features/categories/dialog/ui/context"
import { Settings } from "features/categories/copy-paste-settings/domain/types"
import { PhotoPositionStoreImpl, PhotosStoreImpl } from "features/categories/dialog"
import { TagsStoreImpl } from "entities/tag/domain/tags.store"
import { AltNamesStoreImpl } from "entities/alt-name/domain/interface.store"
import { CharacteristicsStoreImpl } from "entities/characteristic/domain/interface.store"
import { HistoryStoreImpl } from "features/categories/history/domain/interface-history.store"

export class RootCategoryStores {
  tagsStore!: TagsStoreImpl
  photosStore!: PhotosStoreImpl
  altNamesStore!: AltNamesStoreImpl
  photoPositionStore!: PhotoPositionStoreImpl
  characteristicsStore!: CharacteristicsStoreImpl
  historyStore!: HistoryStoreImpl

  stores!: CategoryStores

  constructor(stores: CategoryStores) {
    this.stores = stores
    this.createStores(this.stores)

    makeAutoObservable(this, { stores: false }, { autoBind: true })
  }

  destroy = () => {
    if (this.stores === undefined) return
    this.createStores(this.stores)
  }

  createStores = (stores: CategoryStores) => {
    this.photosStore = new stores.PhotosStore()
    this.photoPositionStore = new stores.PhotoPositionStore(this.photosStore)
    this.characteristicsStore = new stores.CharacteristicsStore()
    this.altNamesStore = new stores.AltNamesStore()
    this.tagsStore = new stores.TagsStore()

    this.historyStore = new stores.HistoryStore()
  }

  setCopiedData = (payload: CategoryDto.CategoryRows, settings: Settings) => {
    this.tagsStore.setCopiedTags(settings.tags, payload.tags)

    this.photoPositionStore.setCopiedPhotoPosition(
      {
        activeImageId: settings.activeImageId,
        captionPosition: settings.captionPosition,
      },
      {
        activeImageId: payload.activeImageId,
        captionPosition: payload.captionPosition,
      },
    )

    this.photosStore.setCopiedMedia(settings.images, {
      images: payload.images,
      media: payload.media,
    })

    this.characteristicsStore
      .setCopiedCharacteristics(settings.characteristics, payload.characteristics)
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
}
