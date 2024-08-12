import {
  useLayoutEffect, useMemo, useRef, useState,
} from "react"
import { Box } from "shared/ui/box"
import { observer } from "mobx-react-lite"
import { galleryStore } from "widgets/galerry/model/gallery-store"
import { actionsPhoto, getPhotoByRef } from "widgets/galerry/ui/transition-image/utils"
import { Image } from "widgets/galerry/ui/transition-image/image"

export const TransitionImage = observer(() => {
  const { indexActiveImage } = galleryStore

  const [prevActiveIndexImage, setPrevActiveIndexImage] = useState(indexActiveImage)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!containerRef.current) return

    const activePhoto = getPhotoByRef(containerRef, prevActiveIndexImage)
    const nextActivePhoto = getPhotoByRef(containerRef, indexActiveImage)

    if (prevActiveIndexImage !== indexActiveImage) {
      actionsPhoto("hide", activePhoto)
      actionsPhoto("show", nextActivePhoto)
    } else {
      actionsPhoto("show", activePhoto)
    }

    setPrevActiveIndexImage(galleryStore.indexActiveImage)
  }, [indexActiveImage])

  return useMemo(() => (
    <Box ref={containerRef}>
      {galleryStore.images.map((image) => {
        if (image.originalName) {
          return (
            <Image
              caption={image.originalName}
              key={image.id}
              path={image.path}
              data-active={image.id === prevActiveIndexImage}
            />
          )
        }

        if (image.caption) {
          return (
            <Image
              caption={image.caption}
              key={image.id}
              data-active={image.id === String(prevActiveIndexImage)}
              file={image.data}
            />
          )
        }

        return null
      })}
    </Box>
  ), [])
})
