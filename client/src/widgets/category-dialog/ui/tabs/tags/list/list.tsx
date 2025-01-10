import { TagRow } from "entities/tag"
import { observer } from "mobx-react-lite"
import { altCtrlKey, useKeyboard } from "shared/lib/keyboard-manager"
import { EmptyList } from "shared/ui/empty-list"
import { useSelectionItem } from "../../../../view-model/selection-item/use-selection-item"
import { TagContainer } from "./styles"
import { useTagStore } from "../../../../model/tag/use-tag-store"
import { startCreateTag, startEditTag, startRemoveTag } from "../../../../model/tag/tag-events"

export const List = observer(() => {
  const isEmpty = useTagStore((store) => store.list.isEmpty)
  const count = useTagStore((store) => store.list.count)
  const tags = useTagStore((store) => store.list.array)

  const getState = useTagStore((store) => store.getState)

  const selection = useSelectionItem(count)

  useKeyboard({
    key: "a",
    callback: altCtrlKey(startCreateTag),
  })

  if (isEmpty) return <EmptyList />

  return (
    <TagContainer>
      {tags.map((tag, index) => (
        <TagRow
          key={tag.id}
          tag={tag}
          onRemove={startRemoveTag}
          onEdit={startEditTag}
          state={getState(tag)}
          active={selection.isSelection(index)}
        />
      ))}
    </TagContainer>
  )
})
