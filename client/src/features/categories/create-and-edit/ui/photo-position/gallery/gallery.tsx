import { observer } from "mobx-react-lite"
import { Box } from "shared/ui/box"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Image } from "./image"
import { CheckBoxGrid } from "./checkbox-grid"
import { useStores } from "../../../model/context"

export const Gallery = observer(() => {
  const { photoPosition } = useStores()

  const renderImage = () => {
    const image = photoPosition.activeImage
    if (!image) return null

    const props = {
      ...image,
      caption: image.originalName ?? image.caption,
    }

    return <Image {...props} />
  }

  return (
    <Box flex row ai>
      {photoPosition.isShowButton && (
        <IconButton name="prev" onClick={photoPosition.setPrevImage} />
      )}
      <Box sx={{ position: "relative", width: 1, height: 250 }}>
        <Box
          flex
          jc_sp
          sx={{
            position: "absolute", width: 1, height: 250, top: 0, right: 0, p: 1,
          }}
        >
          <CheckBoxGrid />
        </Box>
        {renderImage()}
      </Box>
      {photoPosition.isShowButton && (
        <IconButton name="next" onClick={photoPosition.setNextImage} />
      )}
    </Box>
  )
})
