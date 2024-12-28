import { createRoute } from "shared/lib/event-bus"
import { Image, Media } from "shared/types/new_types/types"

interface OpenGallery {
  index: number
  images: (Media | Image)[]
}

export const openGallery = createRoute("openGallery")
  .withParams<OpenGallery>()
