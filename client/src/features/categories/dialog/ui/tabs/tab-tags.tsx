import { TagItem } from "entities/tag"
import { openCreateTagDialog, openEditTagDialog } from "entities/tag/model/event"
import { useRemoveTag } from "features/tag"
import { observer } from "mobx-react-lite"
import { eventBus } from "shared/lib/event-bus"
import { Box } from "shared/ui/box"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Vertical } from "shared/ui/divider"
import { EmptyList } from "shared/ui/empty-list"
import { Text } from "shared/ui/text"
import styled from "styled-components"
import { nanoid } from "nanoid"
import { useKeyboard } from "shared/lib/keyboard-manager"
import { useCreateDialogStore } from "shared/context/dialog-create-context"
import { useEditDialogStore } from "shared/context/dialog-edit-context"
import { useCategoryStores } from "../context"

const TagsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 8px;
  overflow: auto;
`

interface TabTagsProps {
  tab: number
}

export const TabTags = observer(({ tab }: TabTagsProps) => {
  const { tagsStore, historyStore } = useCategoryStores()
  const createDialogStore = useCreateDialogStore()
  const editDialogStore = useEditDialogStore()

  const handleRemoveTag = useRemoveTag()

  const disabledDialog = createDialogStore.tab !== tab && editDialogStore.tab !== tab

  useKeyboard({
    key: "Ф",
    disabled: disabledDialog,
    callback: () => eventBus.emit(openCreateTagDialog({})),
  })

  useKeyboard({
    key: "A",
    disabled: disabledDialog,
    callback: () => eventBus.emit(openCreateTagDialog({})),
  })

  return (
    <Box flex row grow sx={{ height: 1 }}>
      {tagsStore.filteredTags.length > 0 ? (
        <TagsContainer>
          {tagsStore.filteredTags.map((tag) => (
            <TagItem
              key={tag.id}
              id={tag.id}
              icon={tag.icon}
              color={tag.color}
              caption={tag.caption}
              onRemove={async (payload) => {
                await handleRemoveTag(payload, (id) => {
                  tagsStore.remove(id)

                  historyStore.recordEvent({
                    id: nanoid(),
                    tab,
                    type: "removeTag",
                    value: payload.id,
                  })
                })
              }}
              onEdit={(payload) => eventBus.emit(openEditTagDialog(payload))}
              isCreatedOrUpdated={tagsStore.isCreatedOrUpdated(tag.id)}
            />
          ))}
        </TagsContainer>
      ) : <EmptyList />}
      <Vertical />
      <Box sx={{ pt: 1 }}>
        <IconButton
          name="add"
          onClick={() => eventBus.emit(openCreateTagDialog({}))}
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
  )
})