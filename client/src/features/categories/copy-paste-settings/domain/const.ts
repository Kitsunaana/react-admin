import { Tabs, Action } from "./types"

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
