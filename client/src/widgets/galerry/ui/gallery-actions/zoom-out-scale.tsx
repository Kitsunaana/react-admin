import { observer } from "mobx-react-lite"
import { useCallback } from "react"
import { galleryStore } from "widgets/galerry/model/gallery-store"
import { IconButton } from "shared/ui/icon-button"

export const ZoomOutScale = observer(() => {
  const onClick = useCallback(() => galleryStore.zoomOutScale(), [])

  return (
    <IconButton
      fontSize={35}
      disabled={galleryStore.canZoomOutScale}
      onClick={onClick}
      name="imageScaleDown"
    />
  )
})
