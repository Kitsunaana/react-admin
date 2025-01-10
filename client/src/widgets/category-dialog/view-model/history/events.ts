import { AltName } from "entities/alt-name"
import { Characteristic } from "entities/characteristic"
import { Tag } from "entities/tag"
import { CaptionPosition, CategoryLocal } from "../../domain/category/types"
import { Image } from "../../domain/photo"

export type ChangeIsShowPhotoWithGoodsEvent = {
  id: string
  tab: number
  type: "changeIsShowPhotoWithGoods"
  value: boolean
}

export type ChangeColorEvent = {
  id: string
  tab: number
  type: "changeColor"
  value: string
}

export type ChangeBgColorEvent = {
  id: string
  tab: number
  type: "changeBgColor"
  value: string
}

export type ChangeBlurEvent = {
  id: string
  tab: number
  type: "changeBlur"
  value: number
}

export type ChangeActiveImageIdEvent = {
  id: string
  tab: number
  type: "changeActiveImageId"
  value: string | null
}

export type ChangeCaptionPositionEvent = {
  id: string
  tab: number
  type: "changeCaptionPosition"
  value: CaptionPosition
}

export type ChangeCaptionEvent = {
  id: string
  tab: number
  type: "changeCaption"
  value: string
}

export type ChangeDescriptionEvent = {
  id: string
  tab: number
  type: "changeDescription"
  value: string
}

export type ChangeMediaOrderEvent = {
  id: string
  tab: number
  type: "changeMediaOrder"
  value: {
    id: string
    order: number
  }
}

export type AddImagesEvent = {
  id: string
  tab: number
  type: "addImages"
  images: Image[]
}

export type RemoveImageEvent = {
  id: string
  tab: number
  type: "removeImage"
  imageId: string
}

export type RemoveMediaEvent = {
  id: string
  tab: number
  type: "removeMedia"
  mediaId: string
}

export type AddCharacteristicEvent = {
  id: string
  tab: number
  type: "addCharacteristic"
  value: Characteristic
}

export type UpdateCharacteristicEvent = {
  id: string
  tab: number
  type: "updateCharacteristic"
  value: Characteristic
}

export type RemoveCharacteristicEvent = {
  id: string
  tab: number
  type: "removeCharacteristic"
  value: string
}

export type AddAltNameEvent = {
  id: string
  tab: number
  type: "addAltName"
  value: AltName
}

export type UpdateAltNameEvent = {
  id: string
  tab: number
  type: "updateAltName"
  value: AltName
}

export type RemoveAltNameEvent = {
  id: string
  tab: number
  type: "removeAltName"
  value: string
}

export type AddTagEvent = {
  id: string
  tab: number
  type: "addTag"
  value: Tag
}

export type UpdateTagEvent = {
  id: string
  tab: number
  type: "updateTag"
  value: Tag
}

export type RemoveTagEvent = {
  id: string
  tab: number
  type: "removeTag"
  value: string
}

export type PasteCategoryData = {
  id: string
  tab: undefined
  type: "pasteCategoryData"
  value: CategoryLocal
}

export type CategoryEvent =
  | ChangeIsShowPhotoWithGoodsEvent
  | ChangeColorEvent
  | ChangeBgColorEvent
  | ChangeBlurEvent
  | ChangeActiveImageIdEvent
  | ChangeCaptionPositionEvent
  | ChangeCaptionEvent
  | ChangeDescriptionEvent
  | ChangeMediaOrderEvent
  | AddImagesEvent
  | RemoveImageEvent
  | RemoveMediaEvent
  | AddCharacteristicEvent
  | UpdateCharacteristicEvent
  | RemoveCharacteristicEvent
  | AddAltNameEvent
  | UpdateAltNameEvent
  | RemoveAltNameEvent
  | AddTagEvent
  | UpdateTagEvent
  | RemoveTagEvent
  | PasteCategoryData

export type RecordEvent = (event: CategoryEvent) => void
