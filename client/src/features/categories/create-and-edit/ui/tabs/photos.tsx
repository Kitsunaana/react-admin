import * as React from "react"
import { Box, BoxProps } from "shared/ui/box"
import { Image } from "features/categories/create-and-edit/ui/image"
import { observer } from "mobx-react-lite"
import { InputFile } from "shared/ui/input-file"
import { dialogStore as baseDialogStore } from "shared/ui/dialog/dialog-edit"
import styled from "styled-components"
import { rootStore } from "features/categories/create-and-edit/model/stores/dialog-store"

const GridImage = styled((props: BoxProps & { fullScreen: boolean }) => {
  const { fullScreen, ...other } = props
  return <Box {...other} />
})`
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
  const { fullScreen } = baseDialogStore
  const { photos: photosStore } = rootStore

  return (
    <>
      <Box sx={{ pb: 1 }}>
        <InputFile
          caption=""
          name="images"
          multiple
          accept="image/!*"
          onFilesUpload={photosStore.setUploadedFiles}
        />
      </Box>
      <GridImageContainer>
        <GridImage fullScreen={fullScreen}>
          {photosStore.filteredMedia && photosStore.filteredMedia.map((item) => (
            <Image
              key={item.id}
              id={item.id}
              url={item.path}
              name={item.originalName}
              order={item.order}
              onClear={photosStore.clearMedia}
              onUpdateOrder={photosStore.updateOrder}
              onOpenGallery={photosStore.openGallery}
            />
          ))}
          {photosStore.images && photosStore.images.map((item) => (
            <Image
              local
              key={item.id}
              id={item.id}
              file={item.data}
              name={item.caption}
              onClearLocal={photosStore.clearImage}
              onOpenGallery={photosStore.openGallery}
            />
          ))}
        </GridImage>
      </GridImageContainer>
    </>
  )
})
