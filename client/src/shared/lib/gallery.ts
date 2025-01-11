import { createStrictContext, useStrictContext } from "./react"

export type GalleryParams = {
  index: number
  photos: Array<{
    id: string
    path: string
    originalName: string
  } | {
    id: string
    caption: string
    data: File
  }>
}

export type GalleryContext = {
  getGallery: (params: GalleryParams) => void
  closeGallery: () => void
}

export const galleryContext = createStrictContext<GalleryContext>()

export const useGetGallery = () => {
  const { getGallery } = useStrictContext(galleryContext)

  return getGallery
}
