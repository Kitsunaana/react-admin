import { CaptionPosition } from "../../domain/category/types"

export type CopiedPhotoPositionActions = {
  activeImageId: boolean
  captionPosition: boolean
}

export type PhotoPositionData = {
  activeImageId: string | null
  captionPosition: CaptionPosition
}

export type CopiedPhotoPositionData = PhotoPositionData
