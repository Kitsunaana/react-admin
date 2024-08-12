import { ITab } from "./types"

export const tabs: ITab[] = [
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
