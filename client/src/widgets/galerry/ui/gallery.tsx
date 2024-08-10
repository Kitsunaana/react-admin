import { Dialog } from "@mui/material"
import { useEffect } from "react"
import { addEvent } from "shared/lib/event"
import { TransitionImage } from "widgets/galerry/ui/transition-image/transition-image"
import { Navigation } from "widgets/galerry/ui/navigation"
import { PreviewGallery } from "widgets/galerry/ui/preview-gallery/preview-gallery"
import { GalleryActions } from "widgets/galerry/ui/gallery-actions/gallery-actions"
import { galleryStore } from "widgets/galerry/model/gallery-store"
import { observer } from "mobx-react-lite"

export const Gallery = observer(() => {
  const { open, images } = galleryStore

  useEffect(() => addEvent("gallery", (data) => {
    galleryStore.openGallery(data)
  }), [])

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
