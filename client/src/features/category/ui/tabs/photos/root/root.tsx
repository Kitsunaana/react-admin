import { observer } from "mobx-react-lite"
import { useModalStore } from "shared/hooks/use-modal-store"
import { InputFile } from "shared/ui/form/input-file"
import { useGetGallery } from "shared/lib/gallery"
import { useCallback } from "react"
import { usePhotosStore } from "../../../../model/photo/use-photos-store"
import { Photo } from "../photo"
import { Container, GridImage, GridImageContainer } from "./styles"

export const Root = observer(() => {
  const getGallery = useGetGallery()

  const fullscreen = useModalStore((store) => store.fullscreen)

  const filesUpload = usePhotosStore((store) => store.uploadFiles)
  const clearImage = usePhotosStore((store) => store.clearImage)
  const openGallery = usePhotosStore((store) => store.openGallery)
  const updateOrder = usePhotosStore((store) => store.changeMediaOrder)

  const images = usePhotosStore((store) => store.images)
  const media = usePhotosStore((store) => store.media)

  const handleOpenGallery = useCallback((id: string) => openGallery(id, getGallery), [])

  return (
    <Container>
      <InputFile
        multiple
        accept="image/!*"
        onFilesUpload={filesUpload}
      />
      <GridImageContainer fullscreen={fullscreen}>
        <GridImage>
          {images.map((image) => (
            <Photo
              key={image.id}
              id={image.id}
              name={image.caption}
              file={image.data}
              onClear={clearImage}
              onOpenGallery={handleOpenGallery}
            />
          ))}

          {media.map((image) => (
            <Photo
              key={image.id}
              id={image.id}
              name={image.originalName}
              path={image.path}
              order={image.order}
              onClear={clearImage}
              onOpenGallery={handleOpenGallery}
              onChangeOrder={updateOrder}
            />
          ))}
        </GridImage>
      </GridImageContainer>
    </Container>
  )
})
