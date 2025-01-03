import { observer } from "mobx-react-lite"
import { IconButton } from "shared/ui/buttons/icon-button"
import { usePhotosStore } from "widgets/category-dialog/model/photo/use-photos-store"
import { convertMediaToImage } from "../../../../domain/photo"
import { usePhotoPositionStore } from "../../../../model/photo-position/use-photo-position-store"
import { CheckboxGrid } from "../checkbox-grid"
import { Photo } from "../photo"
import { ActivePhotoContainer, CheckboxContainer, Container } from "./styles"

export const Gallery = observer(() => {
  const isShowButton = usePhotosStore((store) => store.photos.length > 1)
  const photos = usePhotosStore((store) => store.photos)

  const activeImage = usePhotoPositionStore((store) => store.getActiveImage(photos))

  const nextImage = usePhotoPositionStore((store) => store.setNextImage)
  const prevImage = usePhotoPositionStore((store) => store.setPrevImage)

  return (
    <Container>
      {isShowButton && (
        <IconButton
          name="prev"
          onClick={() => prevImage(photos)}
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
          onClick={() => nextImage(photos)}
        />
      )}
    </Container>
  )
})
