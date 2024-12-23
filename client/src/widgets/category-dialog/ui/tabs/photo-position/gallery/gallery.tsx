import { observer } from "mobx-react-lite"
import { IconButton } from "shared/ui/buttons/icon-button"
import { CheckboxGrid } from "../checkbox-grid"
import { ActivePhotoContainer, CheckboxContainer, Container } from "./styles"
import { Photo } from "../photo"
import { usePhotoPositionStore } from "../../../../model/photo-position/use-photo-position-store"
import { usePhotosStore } from "../../../../model/photos/use-photos-store"
import { convertMediaToImage } from "../../../../domain/photo"
import { usePhotoPositionForm } from "../../../../view-model/form/use-photo-position-form"

export const Gallery = observer(() => {
  const isShowButton = usePhotosStore((store) => store.photos.length > 1)
  const photos = usePhotosStore((store) => store.photos)

  const activeImage = usePhotoPositionStore((store) => store.getActiveImage(photos))
  const photoPositionForm = usePhotoPositionForm()

  const nextImage = usePhotoPositionStore((store) => () => (
    store.setNextImage(photos, photoPositionForm.handlePhotoChange)
  ))
  const prevImage = usePhotoPositionStore((store) => () => (
    store.setPrevImage(photos, photoPositionForm.handlePhotoChange)
  ))

  return (
    <Container>
      {isShowButton && (
        <IconButton
          name="prev"
          onClick={prevImage}
        />
      )}
      <ActivePhotoContainer>
        <CheckboxContainer>
          <CheckboxGrid />
        </CheckboxContainer>
        {activeImage && <Photo {...convertMediaToImage(activeImage)} />}
      </ActivePhotoContainer>
      {isShowButton && (
        <IconButton
          name="next"
          onClick={nextImage}
        />
      )}
    </Container>
  )
})
