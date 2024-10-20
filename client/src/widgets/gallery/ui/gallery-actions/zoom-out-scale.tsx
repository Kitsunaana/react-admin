import { observer } from "mobx-react-lite"
import { useCallback } from "react"
import { IconButtonBase } from "shared/ui/buttons/icon-button-base"
import { galleryStore } from "widgets/gallery/model/gallery-store"

export const ZoomOutScale = observer(() => {
  const onClick = useCallback(() => galleryStore.zoomOutScale(), [])

  return (
    <IconButtonBase
      fontSize={35}
      disabled={galleryStore.canZoomOutScale}
      onClick={onClick}
      name="imageScaleDown"
    />
  )
})
