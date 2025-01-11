import {
  createContext, MutableRefObject, ReactNode, useCallback, useMemo, useRef,
} from "react"
import { galleryStore } from "widgets/gallery/model/gallery-store"
import { useStrictContext } from "shared/lib/react"

export type UseGalleryStore = {
  previewContainerRef: MutableRefObject<HTMLDivElement | null>
  handleMovingPhoto: (index: number) => void
}

export const GalleryContext = createContext<UseGalleryStore | null>(null)

export const GalleryContextProvider = ({ children }: { children: ReactNode }) => {
  const previewContainerRef = useRef<HTMLDivElement | null>(null)

  const handleMovingPhoto = useCallback((index: number) => {
    const newIndex = galleryStore.setIndexActiveImage(index)

    if (!previewContainerRef.current) return

    previewContainerRef.current.style.transform = `translate(-${newIndex * 164}px, 0)`
  }, [galleryStore])

  const galleryContextProvider = useMemo(() => ({
    previewContainerRef,
    handleMovingPhoto,
  }), [handleMovingPhoto, previewContainerRef])

  return (
    <GalleryContext.Provider value={galleryContextProvider}>
      {children}
    </GalleryContext.Provider>
  )
}

export const useGallery = () => useStrictContext(GalleryContext)
