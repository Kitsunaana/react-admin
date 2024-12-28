import { observer } from "mobx-react-lite"
import { useModalStore } from "shared/hooks/use-modal-store"
import { InputFile } from "shared/ui/form/input-file"
import { usePhotosStore } from "../../../../model/photos/use-photos-store"
import { Photo } from "../photo"
import { Container, GridImage, GridImageContainer } from "./styles"

export const Root = observer(() => {
  const fullscreen = useModalStore((store) => store.fullscreen)

  const filesUpload = usePhotosStore((store) => store.setUploadedFiles)
  const clearImage = usePhotosStore((store) => store.clearImage)

  const openGallery = usePhotosStore((store) => store.openGallery)
  const updateOrder = usePhotosStore((store) => store.updateOrder)

  const images = usePhotosStore((store) => store.images)
  const media = usePhotosStore((store) => store.media)

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
              onOpenGallery={openGallery}
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
              onOpenGallery={openGallery}
              onChangeOrder={updateOrder}
            />
          ))}
        </GridImage>
      </GridImageContainer>
    </Container>
  )
})
