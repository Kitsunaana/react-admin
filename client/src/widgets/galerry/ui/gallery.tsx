import { Dialog, DialogTitle } from "@mui/material"
import { useEffect, useState } from "react"
import { addEvent } from "shared/lib/event"
import { Box } from "shared/ui/box"
import { TransitionImage } from "widgets/galerry/ui/transition-image"
import { Navigation } from "widgets/galerry/ui/navigation"
import { PreviewGallery } from "widgets/galerry/ui/preview-gallery"

interface IData {
  images: {
    id: number | string
    data: File
    caption: string
  }[]
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
          // maxWidth: "calc(100% - 64px)",
          maxWidth: 750,
          width: 1,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          mb: 1,
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
      </Box>
      <PreviewGallery
        images={data.images}
        activeImageIndex={indexActiveImage}
        setNextPhoto={setIndexActiveImage}
      />
    </Dialog>
  )
}
