import { observer } from "mobx-react-lite"
import { useCallback } from "react"
import { galleryStore } from "widgets/galerry/model/gallery-store"
import { IconButtonBase } from "shared/ui/buttons/icon-button-base"

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
