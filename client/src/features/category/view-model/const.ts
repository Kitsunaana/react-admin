import { CategoryFields } from "entities/category"
import {
  CaptionPosition, CategoryLocal, CategoryOtherFields, CategoryRows,
} from "../domain/category/types"
import { KeysSettingsFields, KeysSettingsRows } from "./setting/settings-types"

export const TABS = [
  {
    id: 0,
    caption: "common",
    icon: "done",
    content: [
      "caption",
      "description",
    ],
  },
  {
    id: 1,
    caption: "photo",
    icon: "photo",
  },
  { id: 2, caption: "photoPosition", icon: "positionPhoto" },
  { id: 3, caption: "characteristics", icon: "characteristic" },
  { id: 4, caption: "alternativeNames", icon: "alternativeName" },
  { id: 5, caption: "tags", icon: "tags" },
]

type PositionCheckbox = {
  id: number
  content: string
  position: CaptionPosition
}

export const GRID_CHECKBOX: Array<{ id: number, data: Array<PositionCheckbox> }> = [
  {
    id: 0,
    data: [
      { content: "flex-start", position: "top-left", id: 1 },
      { content: "center", position: "top-center", id: 2 },
      { content: "flex-end", position: "top-right", id: 3 },
    ],
  },
  {
    id: 1,
    data: [
      { content: "flex-start", position: "center-left", id: 4 },
      { content: "center", position: "center-center", id: 5 },
      { content: "flex-end", position: "center-right", id: 6 },
    ],
  },
  {
    id: 2,
    data: [
      { content: "flex-start", position: "bottom-left", id: 7 },
      { content: "center", position: "bottom-center", id: 8 },
      { content: "flex-end", position: "bottom-right", id: 9 },
    ],
  },
]

export const initialSettingsRows: KeysSettingsRows = {
  characteristics: "add",
  images: "add",
  tags: "add",
}

export const initialSettingsFields: KeysSettingsFields = {
  caption: true,
  description: false,
  blur: false,
  bgColor: true,
  color: false,
  isShowPhotoWithGoods: false,
  activeImageId: true,
  captionPosition: true,
}

export const getCategoryDefaultFields = (): CategoryFields => ({
  caption: "",
  description: "",
  bgColor: "",
  color: "",
  blur: 8,
  isShowPhotoWithGoods: true,
})

export const getCategoryDefaultRows = (): CategoryRows & CategoryOtherFields => ({
  images: [],
  media: [],
  characteristics: [],
  altNames: [],
  tags: [],
  captionPosition: "top-center",
  activeImageId: null,
})

export const getCategoryDefault = (): CategoryLocal => ({
  ...getCategoryDefaultFields(),
  ...getCategoryDefaultRows(),
})
