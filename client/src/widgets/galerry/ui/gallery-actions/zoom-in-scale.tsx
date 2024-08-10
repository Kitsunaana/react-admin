import { observer } from "mobx-react-lite"
import { useCallback } from "react"
import { galleryStore } from "widgets/galerry/model/gallery-store"
import { IconButton } from "shared/ui/icon-button"

export const ZoomInScale = observer(() => {
  const onClick = useCallback(() => galleryStore.zoomInScale(), [])

  return (
    <IconButton
      fontSize={35}
      disabled={galleryStore.canZoomInScale}
      onClick={onClick}
      name="imageScaleUp"
    />
  )
})
