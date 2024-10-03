import styled from "styled-components"
import { Box, BoxProps } from "shared/ui/box"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { EmptyList } from "shared/ui/empty-list"
import { Vertical } from "shared/ui/divider"
import { IconButton } from "shared/ui/buttons/icon-button"
import { observer } from "mobx-react-lite"
import { TagItem } from "entities/tag"
import { TagEditDialog, TagCreateDialog, useRemoveTag } from "features/tag"
import { Text } from "shared/ui/text"
import { useCreateDialogStore } from "shared/ui/dialog/context/dialog-create-context"
import { useStores } from "../../model/context"

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

  const handleRemoveTag = useRemoveTag(tags.remove)
  const createDialog = useCreateDialogStore()
  const editDialog = useEditDialogStore()

  return (
    <>
      <Box flex row grow sx={{ height: 1 }}>
        {tags.filteredTags.length > 0 ? (
          <TagsContainer fullScreen={createDialog.fullScreen || editDialog.fullScreen}>
            {tags.filteredTags.map((tag) => (
              <TagItem
                key={tag.id}
                id={tag.id}
                icon={tag.icon}
                color={tag.color}
                caption={tag.caption}
                onRemove={handleRemoveTag}
                onEdit={editDialog.openDialog}
                isRecordCreatedOrUpdated={tags.isRecordCreatedOrUpdated}
              />
            ))}
          </TagsContainer>
        ) : <EmptyList />}
        <Vertical />
        <Box sx={{ pt: 1 }}>
          <IconButton
            name="add"
            onClick={() => createDialog.openDialog(null)}
            help={{
              title: (
                <Text
                  onlyText
                  name="actions.add"
                />
              ),
            }}
          />
        </Box>
      </Box>

      <TagEditDialog onEdit={tags.edit} />
      <TagCreateDialog onCreate={tags.create} />
    </>
  )
})
