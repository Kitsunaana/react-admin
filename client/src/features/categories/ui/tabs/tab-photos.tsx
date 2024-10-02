import * as React from "react"
import { Box, BoxProps } from "shared/ui/box"
import { observer } from "mobx-react-lite"
import { InputFile } from "shared/ui/form/input-file"
import styled from "styled-components"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { Image } from "../photos/image"
import { useStores } from "../../model/context"

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

export const TabPhotos = observer(() => {
  const { fullScreen } = useEditDialogStore()
  const { photos } = useStores()

  return (
    <Box sx={{ mt: 1 }}>
      <Box sx={{ pb: 1 }}>
        <InputFile
          caption=""
          name="forms.images"
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
              order={item.order as number | null}
              onClear={photos.clearMedia}
              onOpenGallery={photos.openGallery}
              onUpdateOrder={photos.updateOrder}
            />
          ))}
          {photos.images && photos.images.map((item) => (
            <Image
              local
              key={item.id}
              id={item.id}
              file={item.data as File}
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
