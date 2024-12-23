import { observer } from "mobx-react-lite"
import { InputFile } from "shared/ui/form/input-file"
import { useModalStore } from "shared/hooks/use-modal-store"
import { GridImage, GridImageContainer, Container } from "./styles"
import { Photo } from "../photo"
import { usePhotos } from "../../../../facade/use-photos"

export const Root = observer(() => {
  const fullscreen = useModalStore((store) => store.fullscreen)

  const [photos, actions] = usePhotos()

  return (
    <Container>
      <InputFile
        multiple
        accept="image/!*"
        onFilesUpload={actions.filesUpload}
      />
      <GridImageContainer fullscreen={fullscreen}>
        <GridImage>
          {photos.media.map((media) => <Photo key={media.id} {...media} />)}
          {photos.images.map((image) => <Photo key={image.id} {...image} />)}
        </GridImage>
      </GridImageContainer>
    </Container>
  )
})
