import { CategoryDto } from "shared/types/category"
import {
  ITab, Tabs, TPositionCheckbox, Action,
} from "./types"

export const TABS: ITab[] = [
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

export const GRID_CHECKBOX: Array<{ id: number, data: Array<TPositionCheckbox> }> = [
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

export const CATEGORY_FIELDS = [
  "bgColor",
  "blur",
  "caption",
  "color",
  "description",
  "isShowPhotoWithGoods",
] as const

export const CATEGORY_DEFAULT_VALUES: CategoryDto.CategoryFields = {
  caption: "",
  description: "",
  bgColor: "",
  color: "",
  blur: 8,
  isShowPhotoWithGoods: false,
}

export const initialSettingsRows: Record<Tabs, Action> = {
  characteristics: "add",
  images: "add",
  tags: "add",
}

export const initialSettingsFields = {
  caption: true,
  description: false,
  blur: false,
  bgColor: true,
  color: false,
  isShowPhotoWithGoods: false,
  activeImageId: true,
  captionPosition: true,
}
