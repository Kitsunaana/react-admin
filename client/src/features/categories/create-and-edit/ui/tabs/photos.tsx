import * as React from "react"
import { Box, BoxProps } from "shared/ui/box"
import { Image } from "features/categories/create-and-edit/ui/image"
import { observer } from "mobx-react-lite"
import { useActionsImage } from "shared/hooks/use-actions-image"
import { InputFile } from "shared/ui/input-file"
import { dialogStore } from "shared/ui/dialog/dialog-edit"
import styled from "styled-components"

const GridImage = styled(Box)<BoxProps & { fullScreen: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 170px;
  gap: 8px;
  overflow: auto;
  height: ${({ fullScreen }) => (fullScreen ? "100%" : "380px")};
`

const GridImageContainer = styled(Box)`
  height: 100%;
  overflow: auto;
  max-height: calc(100vh - 200px);
`

export const PhotosTab = observer(() => {
  const { fullScreen } = dialogStore

  const {
    onClear,
    onClearLocal,
    onUpdateOrder,
    onOpenGallery,
    images,
    media,
  } = useActionsImage()

  return (
    <>
      <Box sx={{ pb: 1 }}>
        <InputFile
          caption=""
          name="images"
          multiple
          accept="image/!*"
        />
      </Box>
      <GridImageContainer>
        <GridImage fullScreen={fullScreen}>
          {media && media.filter((media) => !media.deleted).map((item) => (
            <Image
              key={item.id}
              id={item.id}
              url={item.path}
              name={item.originalName}
              order={item.order}
              onClear={onClear}
              onUpdateOrder={onUpdateOrder}
              onClick={() => onOpenGallery(item.id)}
            />
          ))}
          {images && images.map((item) => (
            <Image
              local
              key={item.id}
              id={item.id}
              file={item.data}
              name={item.caption}
              onClearLocal={onClearLocal}
              onClick={() => onOpenGallery(item.id)}
            />
          ))}
        </GridImage>
      </GridImageContainer>
    </>
  )
})
