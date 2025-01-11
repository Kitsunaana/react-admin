import { observer } from "mobx-react-lite"
import { IconButtonBase } from "shared/ui/buttons/icon-button-base"
import { galleryStore } from "../../model/gallery-store"
import { Container } from "./styles"

export const Actions = observer(() => (
  <Container>
    <IconButtonBase
      fontSize={35}
      disabled={galleryStore.canZoomInScale}
      onClick={galleryStore.zoomInScale}
      name="imageScaleUp"
    />
    <IconButtonBase
      fontSize={35}
      disabled={galleryStore.canZoomOutScale}
      onClick={galleryStore.zoomOutScale}
      name="imageScaleDown"
    />
    <IconButtonBase
      fontSize={35}
      onClick={() => galleryStore.updateRotate("right")}
      name="rotateRight"
    />
    <IconButtonBase
      fontSize={35}
      onClick={() => galleryStore.updateRotate("left")}
      name="rotateLeft"
    />
    <IconButtonBase
      fontSize={35}
      name="setDefaultParameters"
      onClick={galleryStore.setDefaultParameters}
    />
    <IconButtonBase
      fontSize={35}
      name="clear"
      onClick={() => {
        galleryStore.setDefaultParameters()
        galleryStore.closeGallery()
      }}
    />
  </Container>
))
