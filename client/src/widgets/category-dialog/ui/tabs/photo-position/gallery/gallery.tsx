import { observer } from "mobx-react-lite"
import { IconButton } from "shared/ui/buttons/icon-button"
import { convertMediaToImage } from "../../../../domain/photo"
import { usePhotoPositionStore } from "../../../../model/photo-position/use-photo-position-store"
import { usePhotosStore } from "../../../../model/photos/use-photos-store"
import { CheckboxGrid } from "../checkbox-grid"
import { Photo } from "../photo"
import { ActivePhotoContainer, CheckboxContainer, Container } from "./styles"

export const Gallery = observer(() => {
  const isShowButton = usePhotosStore((store) => store.photos.length > 1)

  const activeImage = usePhotoPositionStore((store) => store.activeImage)

  const nextImage = usePhotoPositionStore((store) => store.setNextImage)
  const prevImage = usePhotoPositionStore((store) => store.setPrevImage)

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