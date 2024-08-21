import { observer } from "mobx-react-lite"
import { useCallback } from "react"
import { galleryStore } from "widgets/galerry/model/gallery-store"
import { IconButtonBase } from "shared/ui/buttons/icon-button-base"

export const ZoomInScale = observer(() => {
  const onClick = useCallback(() => galleryStore.zoomInScale(), [])

  return (
    <IconButtonBase
      fontSize={35}
      disabled={galleryStore.canZoomInScale}
      onClick={onClick}
      name="imageScaleUp"
    />
  )
})
