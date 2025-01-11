import { useLayoutEffect, useRef, useState } from "react"
import { actionsPhoto, getPhotoByRef } from "./transition-photo-core"
import { galleryStore } from "../../model/gallery-store"

export const useTransitionPhoto = (indexActiveImage: number) => {
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

  return {
    containerRef,
    prevActiveIndexImage,
  }
}
