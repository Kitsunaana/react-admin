import { observer } from "mobx-react-lite"
import { useModalStore } from "shared/hooks/use-modal-store"
import { InputFile } from "shared/ui/form/input-file"
import { usePhotos } from "../../../../facade/use-photos"
import { Photo } from "../photo"
import { Container, GridImage, GridImageContainer } from "./styles"

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
          {photos.images.map((image) => (<Photo key={image.id} {...image} />))}
        </GridImage>
      </GridImageContainer>
    </Container>
  )
})
