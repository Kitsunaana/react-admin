import { Dialog } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useEvent } from "shared/hooks/use-event"
import { openGallery } from "shared/events/open-gallery"
import { galleryStore } from "../model/gallery-store"
import { GalleryActions } from "./gallery-actions/gallery-actions"
import { Navigation } from "./navigation"
import { PreviewGallery } from "./preview-gallery/preview-gallery"
import { TransitionImage } from "./transition-image/transition-image"

export const Gallery = observer(() => {
  const { open, images } = galleryStore

  useEvent(openGallery, ({ payload }) => galleryStore.openGallery(payload))

  if (!images.length) return null

  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "transparent",
          backgroundImage: "unset",
          boxShadow: "unset",
          maxWidth: "calc(100% - 64px)",
          maxHeight: "calc(100% - 64px)",
          width: 1,
          height: 1,
          overflow: "hidden",
        },
      }}
    >
      <TransitionImage />
      <Navigation />
      <PreviewGallery />
      <GalleryActions />
    </Dialog>
  )
})
