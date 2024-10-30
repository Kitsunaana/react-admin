import { CategoryDto } from "shared/types/category"
import { Common } from "shared/types/common"
import { PhotosStore } from "../model/photos.store"

export interface PhotoPositionStoreImpl {
  captionPosition: CategoryDto.CategoryDto["captionPosition"]
  activeImageId: null | string
  photosStore: Pick<PhotosStore, "mergedImages">
  _indexActiveImage: number

  get activeImage(): (Common.Media & { deleted?: boolean | undefined }) | Common.Image
  get indexActiveImage(): number
  get isShowButton(): boolean

  setCopiedPhotoPosition: (
    actions: {
      activeImageId: boolean,
      captionPosition: boolean
    },
    data: Pick<CategoryDto.CategoryDto, "activeImageId" | "captionPosition">
  ) => void
  setPhotoPosition: (data: Pick<CategoryDto.CategoryDto, "activeImageId" | "captionPosition">) => void
  setActiveImageId: (id: string | null) => void
  changeActiveImageId: () => void
  setNextImage: () => void
  setPrevImage: () => void
  changeCaptionPosition: (newCaptionPosition: CategoryDto.CategoryDto["captionPosition"]) => void
  getData: () => {
    captionPosition: CategoryDto.CategoryDto["captionPosition"]
    activeImageId: null | string
  }
}
