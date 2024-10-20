import { observer } from "mobx-react-lite"
import {
  useLayoutEffect, useMemo, useRef, useState,
} from "react"
import { Box } from "shared/ui/box"
import { galleryStore } from "../../model/gallery-store"
import { Image } from "./image"
import { actionsPhoto, getPhotoByRef } from "./utils"

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
        if ("originalName" in image) {
          return (
            <Image
              caption={image.originalName}
              key={image.id}
              path={image.path}
              data-active={image.id === String(prevActiveIndexImage)}
            />
          )
        }

        if ("caption" in image) {
          return (
            <Image
              caption={image.caption}
              key={image.id}
              data-active={image.id === String(prevActiveIndexImage)}
              file={image.data as File}
            />
          )
        }

        return null
      })}
    </Box>
  ), [])
})
