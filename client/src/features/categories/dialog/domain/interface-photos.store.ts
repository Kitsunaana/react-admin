import { Common } from "shared/types/common"

type Action = "add" | "none" | "replace"

export interface PhotosStoreImpl {
  images: Common.Image[]
  media: (Common.Media & { deleted?: boolean })[]

  get mergedImages(): (Common.Image | (Common.Media & { deleted?: boolean | undefined }))[]
  get filteredMedia(): (Common.Media & { deleted?: boolean | undefined })[]

  openGallery: (id: number | string) => void
  updateOrder: (order: number, id: string) => void
  clearMedia: (id: string) => void
  clearImage: (id: string) => void
  createMedia: (payload: Common.Media[]) => void
  setUploadedFiles: (files: Common.Image[]) => void
  getFilteredData: <T extends Common.Media | Common.Image>(data: Array<T>) => T[]
  setMedia: (media: Common.Media[]) => void
  setImages: (images: Common.Image[]) => void
  addImages: (images: Common.Image[]) => void
  setCopiedMedia: (
    action: Action,
    payload: {
      media: Common.Media[],
      images: Common.Image[]
    },
  ) => void
  imagesActions: (images: Common.Image[]) => {
    add: () => void,
    replace: () => void,
    none: () => void
  }
  mediaActions: (media: Common.Media[]) => {
    add: () => void,
    replace: () => void,
    none: () => void
  }
  applyActions: (action: Action) => {
    images: (payload: Common.Image[]) => () => void,
    media: (payload: Common.Media[]) => () => void
  }
  getData: () => {
    images: Common.Image[],
    media: (Common.Media & {deleted?: boolean})[]
  }
}
