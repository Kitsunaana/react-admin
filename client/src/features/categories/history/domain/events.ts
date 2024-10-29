import { CategoryDto } from "shared/types/category"
import { Common } from "shared/types/common"

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
  value: CategoryDto.CategoryDto["captionPosition"]
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
  images: Common.Image[]
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
  value: Common.CharacteristicBase & { id: string }
}

export type UpdateCharacteristicEvent = {
  id: string
  tab: number
  type: "updateCharacteristic"
  value: Common.Characteristic | Common.CharacteristicCreate
}

export type RemoveCharacteristicEvent = {
  id: string
  tab: number
  type: "removeCharacteristic"
  value: number | string
}

export type AddAltNameEvent = {
  id: string
  tab: number
  type: "addAltName"
  value: Common.AltNameBase & { id: string }
}

export type UpdateAltNameEvent = {
  id: string
  tab: number
  type: "updateAltName"
  value: Common.AltName | Common.AltNameCreate
}

export type RemoveAltNameEvent = {
  id: string
  tab: number
  type: "removeAltName"
  value: number | string
}

export type AddTagEvent = {
  id: string
  tab: number
  type: "addTag"
  value: CategoryDto.TagBase & { id: string }
}

export type UpdateTagEvent = {
  id: string
  tab: number
  type: "updateTag"
  value: CategoryDto.Tag | CategoryDto.TagCreate
}

export type RemoveTagEvent = {
  id: string
  tab: number
  type: "removeTag"
  value: number | string
}

export type CategoryEvents =
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
