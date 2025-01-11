import { memo } from "react"
import { galleryStore } from "../../../model/gallery-store"
import { useGallery } from "../../../view-model/use-gallery-store"
import { PhotoButton, PhotosWrapper, PreviewPhoto } from "./styles"
import { getPhotoData } from "../../../model/types"

export const PhotoList = memo(() => {
  const gallery = useGallery()

  return (
    <PhotosWrapper ref={gallery.previewContainerRef}>
      {galleryStore.photos.map((photo, index) => (
        <PhotoButton
          key={photo.id}
          onClick={() => gallery.handleMovingPhoto(index)}
        >
          <PreviewPhoto data={getPhotoData(photo)} />
        </PhotoButton>
      ))}
    </PhotosWrapper>
  )
})
