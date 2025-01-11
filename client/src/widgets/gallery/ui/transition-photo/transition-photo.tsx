import { observer } from "mobx-react-lite"
import { useMemo } from "react"
import { Box } from "shared/ui/box"
import { getPhotoData } from "../../model/types"
import { galleryStore } from "../../model/gallery-store"
import { ViewPhoto } from "./styles"
import { useTransitionPhoto } from "../../view-model/transition-photo/use-transition-photo"

export const TransitionPhoto = observer(() => {
  const transitionPhoto = useTransitionPhoto(galleryStore.indexActiveImage)

  return useMemo(() => (
    <Box ref={transitionPhoto.containerRef}>
      {galleryStore.photos.map((image, index) => (
        <ViewPhoto
          key={image.id}
          data={getPhotoData(image)}
          scale={galleryStore.scale}
          rotate={galleryStore.rotate}
          data-active={index === transitionPhoto.prevActiveIndexImage}
        />
      ))}
    </Box>
  ), [galleryStore.scale, galleryStore.rotate])
})
