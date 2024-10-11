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
import { useCategoryStores } from "../../model/context"

const TagsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 8px;
  overflow: auto;
`

export const TabTags = observer(() => {
  const { tags } = useCategoryStores()

  const handleRemoveTag = useRemoveTag(tags.remove)

  return (
    <Box flex row grow sx={{ height: 1 }}>
      {tags.filteredTags.length > 0 ? (
        <TagsContainer>
          {tags.filteredTags.map((tag) => (
            <TagItem
              key={tag.id}
              id={tag.id}
              icon={tag.icon}
              color={tag.color}
              caption={tag.caption}
              onRemove={handleRemoveTag}
              onEdit={(payload) => eventBus.emit(openEditTagDialog(payload))}
              isCreatedOrUpdated={tags.isCreatedOrUpdated(tag.id)}
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
