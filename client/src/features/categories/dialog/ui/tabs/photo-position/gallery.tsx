import { observer } from "mobx-react-lite"
import { Box } from "shared/ui/box"
import { IconButton } from "shared/ui/buttons/icon-button"
import styled from "styled-components"
import { nanoid } from "nanoid"
import { Image } from "./image"
import { CheckBoxGrid } from "./checkbox-grid"
import { useCategoryStores } from "../../context"

const ActiveImageContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 250px;
  top: 0;
  right: 0;
  padding: 8px;
`

export const Gallery = observer(() => {
  const { photoPositionStore, historyStore } = useCategoryStores()

  const renderImage = () => {
    const image = photoPositionStore.activeImage
    if (!image) return null

    if ("originalName" in image) {
      return <Image caption={image.originalName} path={image.path} />
    }

    if ("caption" in image) {
      return <Image caption={image.caption} data={image.data as File} />
    }

    return null
  }

  return (
    <Box flex row ai>
      {photoPositionStore.isShowButton && (
        <IconButton
          name="prev"
          onClick={() => {
            photoPositionStore.setPrevImage()

            historyStore.recordEvent({
              id: nanoid(),
              tab: 2,
              type: "changeActiveImageId",
              value: photoPositionStore.activeImageId,
            })
          }}
        />
      )}
      <Box sx={{ position: "relative", width: 1, height: 250 }}>
        <ActiveImageContainer>
          <CheckBoxGrid />
        </ActiveImageContainer>
        {renderImage()}
      </Box>
      {photoPositionStore.isShowButton && (
        <IconButton
          onClick={() => {
            photoPositionStore.setNextImage()

            historyStore.recordEvent({
              id: nanoid(),
              tab: 2,
              type: "changeActiveImageId",
              value: photoPositionStore.activeImageId,
            })
          }}
          name="next"
        />
      )}
    </Box>
  )
})