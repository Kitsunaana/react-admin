import { TagRow } from "entities/tag"
import { observer } from "mobx-react-lite"
import { useListKeyboardEvents } from "shared/hooks/use-tab-keyboard-events"
import { altCtrlKey, useKeyboard } from "shared/lib/keyboard-manager"
import { EmptyList } from "shared/ui/empty-list"
import { TagContainer } from "./styles"
import { useTagStore } from "../../../../model/tag/use-tag-store"
import { startCreateTag, startEditTag } from "../../../../model/tag/tag"

export const List = observer(() => {
  const isEmpty = useTagStore((store) => store.isEmpty)

  const isCreatedOrUpdated = useTagStore((store) => store.isCreatedOrUpdated)
  const remove = useTagStore((store) => store.remove)
  const tags = useTagStore((store) => store.array)

  const selected = useListKeyboardEvents()

  useKeyboard({
    key: "a",
    callback: altCtrlKey(startCreateTag),
  })

  if (isEmpty) return <EmptyList />

  return (
    <TagContainer ref={selected.refBox}>
      {tags.map((item, index) => (
        <TagRow
          key={item.id}
          tag={item}
          onRemove={remove}
          onEdit={startEditTag}
          isCreatedOrUpdated={isCreatedOrUpdated(item)}
          active={(selected.index === index) && selected.show}
        />
      ))}
    </TagContainer>
  )
})
