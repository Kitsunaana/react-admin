import { Box, BoxProps } from "shared/ui/box"
import { observer } from "mobx-react-lite"
import { InputFile } from "shared/ui/form/input-file"
import styled from "styled-components"
import { useEditDialogStore } from "shared/context/dialog-edit-context"
import { nanoid } from "nanoid"
import { Image } from "features/categories/@dialog/ui/tabs/photos/image"
import { useCategoryStores } from "../context"

const GridImage = styled((props: BoxProps & { fullScreen: boolean }) => {
  const { fullScreen, ...other } = props
  return <Box {...other} />
})`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 170px;
  gap: 8px;
  height: ${({ fullScreen }) => (fullScreen ? undefined : "380px")};
`

const GridImageContainer = styled(Box)`
  height: 100%;
  overflow: auto;
  max-height: calc(100vh - 190px);
`

interface TabPhotosProps {
  tab: number
}

export const TabPhotos = observer(({ tab }: TabPhotosProps) => {
  const { fullScreen } = useEditDialogStore()
  const { photos, historyStore } = useCategoryStores()

  return (
    <Box sx={{ mt: 1, height: 1 }}>
      <Box sx={{ pb: 1 }}>
        <InputFile
          caption=""
          name="forms.images"
          multiple
          accept="image/!*"
          onFilesUpload={(files) => {
            photos.setUploadedFiles(files)

            historyStore.recordEvent({
              id: nanoid(),
              tab,
              type: "addImages",
              images: files,
            })
          }}
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
              onOpenGallery={photos.openGallery}
              onUpdateOrder={(order, id) => {
                photos.updateOrder(order, id)

                historyStore.recordEvent({
                  id: nanoid(),
                  tab,
                  type: "changeMediaOrder",
                  value: { id, order },
                })
              }}
              onClear={(id) => {
                photos.clearMedia(id)

                historyStore.recordEvent({
                  id: nanoid(),
                  tab,
                  type: "removeMedia",
                  mediaId: id,
                })
              }}
            />
          ))}
          {photos.images && photos.images.map((item) => (
            <Image
              local
              key={item.id}
              id={item.id}
              file={item.data as File}
              name={item.caption}
              onClearLocal={(id) => {
                photos.clearImage(id)

                historyStore.recordEvent({
                  id: nanoid(),
                  tab,
                  type: "removeImage",
                  imageId: id,
                })
              }}
              onOpenGallery={photos.openGallery}
            />
          ))}
        </GridImage>
      </GridImageContainer>
    </Box>
  )
})
