import styled from "styled-components"
import { Box, BoxProps } from "shared/ui/box"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { EmptyList } from "shared/ui/empty-list"
import { Vertical } from "shared/ui/divider"
import React from "react"
import { IconButton } from "shared/ui/buttons/icon-button"
import { observer } from "mobx-react-lite"
import { TagItem } from "entities/tag"
import { TagEditDialog, TagDeleteDialog } from "features/tag"
import { useStores } from "features/categories/edit/model/context"

const TagsContainer = styled((props: BoxProps & { fullScreen: boolean }) => {
  const { fullScreen, ...other } = props
  return <Box {...other} />
})`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 8px;
  overflow: auto;
  height: ${({ fullScreen }) => (fullScreen ? "calc(100% - 60px)" : "432px")};
`

export const TabTags = observer(() => {
  const { tags } = useStores()

  const { fullScreen, openDialog } = useEditDialogStore()

  return (
    <>
      <Box flex row grow sx={{ height: 1 }}>
        {tags.filteredTags.length > 0 ? (
          <TagsContainer fullScreen={fullScreen}>
            {tags.filteredTags.map((tag) => (
              <TagItem key={tag.id} {...tag} />
            ))}
          </TagsContainer>
        ) : <EmptyList />}
        <Vertical />
        <Box sx={{ pt: 1 }}>
          <IconButton
            name="add"
            help={{ title: "Создать", arrow: true }}
            onClick={() => openDialog(null)}
          />
        </Box>
      </Box>

      <TagEditDialog />
      <TagDeleteDialog />
    </>
  )
})
