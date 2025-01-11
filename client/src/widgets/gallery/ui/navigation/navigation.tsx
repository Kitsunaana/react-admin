import { observer } from "mobx-react-lite"
import { Icon } from "shared/ui/icon"
import { useGallery } from "../../view-model/use-gallery-store"
import { galleryStore } from "../../model/gallery-store"
import { Container, NavigationButton } from "./styles"

export const Navigation = observer(() => {
  const gallery = useGallery()

  return (
    <Container>
      <NavigationButton
        variant="contained"
        color="primary"
        disabled={galleryStore.disabledPrev}
        onClick={() => (
          gallery.handleMovingPhoto(
            galleryStore.setPrevIndexActiveImage(),
          )
        )}
      >
        <Icon
          name="next"
          sx={{ transform: "rotate(180deg)" }}
        />
      </NavigationButton>
      <NavigationButton
        variant="contained"
        color="primary"
        disabled={galleryStore.disabledNext}
        onClick={() => (
          gallery.handleMovingPhoto(
            galleryStore.setNextIndexActiveImage(),
          )
        )}
      >
        <Icon name="next" />
      </NavigationButton>
    </Container>
  )
})
