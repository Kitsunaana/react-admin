import { observer } from "mobx-react-lite"
import { useCallback } from "react"
import { IconButtonBase } from "shared/ui/buttons/icon-button-base"
import { galleryStore } from "../../model/gallery-store"

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
