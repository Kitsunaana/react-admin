import * as React from "react"
import { Box, BoxProps } from "shared/ui/box"
import { Image } from "features/categories/create-and-edit/ui/image"
import { observer } from "mobx-react-lite"
import { InputFile } from "shared/ui/form/input-file"
import styled from "styled-components"
import { useStores } from "features/categories/create-and-edit/ui/dialog"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"

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
  const { fullScreen } = useEditDialogStore()
  const { photos } = useStores()

  return (
    <Box sx={{ mt: 1 }}>
      <Box sx={{ pb: 1 }}>
        <InputFile
          caption=""
          name="images"
          multiple
          accept="image/!*"
          onFilesUpload={photos.setUploadedFiles}
        />
      </Box>
      <GridImageContainer>
        <GridImage fullScreen={fullScreen}>
          {photos.filteredMedia && photos.filteredMedia.map((item) => (
            <Image
              key={item.id}
              id={item.id}
              url={item.path}
              name={item.originalName}
              order={item.order}
              onClear={photos.clearMedia}
              onUpdateOrder={photos.updateOrder}
              onOpenGallery={photos.openGallery}
            />
          ))}
          {photos.images && photos.images.map((item) => (
            <Image
              local
              key={item.id}
              id={item.id}
              file={item.data}
              name={item.caption}
              onClearLocal={photos.clearImage}
              onOpenGallery={photos.openGallery}
            />
          ))}
        </GridImage>
      </GridImageContainer>
    </Box>
  )
})
