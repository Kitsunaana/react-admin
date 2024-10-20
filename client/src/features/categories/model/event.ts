import { createRoute } from "shared/lib/event-bus"
import { Common } from "shared/types/common"

interface UpdateCaption {
  caption?: string,
  bgColor?: string,
  color?: string
  blur?: number
}

export const updateCaption = createRoute("updateCaption")
  .withParams<UpdateCaption>()

interface OpenGallery {
  index: number
  images: (Common.Media | Common.Image)[]
}

export const openGallery = createRoute("openGallery")
  .withParams<OpenGallery>()
