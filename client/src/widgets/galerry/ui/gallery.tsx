import { alpha, Dialog } from "@mui/material"
import { useEffect, useState } from "react"
import { addEvent } from "shared/lib/event"
import { Box } from "shared/ui/box"
import { TransitionImage } from "widgets/galerry/ui/transition-image"
import { Navigation } from "widgets/galerry/ui/navigation"
import { PreviewGallery } from "widgets/galerry/ui/preview-gallery"
import { Image, Media } from "widgets/galerry/types"
import { IconButton } from "shared/ui/icon-button"
import { galleryStore } from "widgets/galerry/model/gallery-store"
import { observer } from "mobx-react-lite"

interface GalleryActionsProps {
  onClose: () => void
}

export const GalleryActions = observer((props: GalleryActionsProps) => {
  const { onClose } = props

  return (
    <Box
      flex
      ai
      gap
      sx={{
        backgroundColor: ({ palette }) => palette.common.black,
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))",
        position: "absolute",
        p: 0.5,
        borderRadius: 2,
        bottom: 0,
        right: 0,
        zIndex: 35,
      }}
    >
      <IconButton
        sxIcon={{ fontSize: 35 }}
        disabled={galleryStore.canScale("up")}
        onClick={() => galleryStore.updateScale("up")}
        name="imageScaleUp"
      />
      <IconButton
        sxIcon={{ fontSize: 35 }}
        disabled={galleryStore.canScale("down")}
        onClick={() => galleryStore.updateScale("down")}
        name="imageScaleDown"
      />
      <IconButton
        sxIcon={{ fontSize: 35 }}
        onClick={() => galleryStore.updateRotate("right")}
        name="rotateRight"
      />
      <IconButton
        sxIcon={{ fontSize: 35 }}
        onClick={() => galleryStore.updateRotate("left")}
        name="rotateLeft"
      />
      <IconButton
        sxIcon={{ fontSize: 35 }}
        name="setDefaultParameters"
        onClick={galleryStore.setDefaultParameters}
      />
      <IconButton
        sxIcon={{ fontSize: 35 }}
        name="clear"
        onClick={() => {
          galleryStore.setDefaultParameters()
          onClose()
        }}
      />
    </Box>
  )
})

interface IData {
  index?: number
  images: (Media | Image)[]
}

export const Gallery = () => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<null | IData>(null)
  const [indexActiveImage, setIndexActiveImage] = useState(0)

  useEffect(() => addEvent("gallery", (data) => {
    setOpen(true)
    setData(data)
    setIndexActiveImage(data.index ?? 0)
  }), [])

  const handleClose = () => {
    setOpen(false)
    setData(null)
  }

  if (!data?.images) return

  const prevImage = data.images[indexActiveImage - 1]
  const nextImage = data.images[indexActiveImage + 1]

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
      <TransitionImage
        images={data.images}
        indexActiveImage={indexActiveImage}
      />
      <Navigation
        disabledPrev={!prevImage}
        disabledNext={!nextImage}
        onPrevClick={() => setIndexActiveImage(indexActiveImage - 1)}
        onNextClick={() => setIndexActiveImage(indexActiveImage + 1)}
      />
      <PreviewGallery
        images={data.images}
        activeImageIndex={indexActiveImage}
        setNextPhoto={setIndexActiveImage}
      />
      <GalleryActions onClose={handleClose} />
    </Dialog>
  )
}
