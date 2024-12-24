import { TagRow } from "entities/tag"
import { observer } from "mobx-react-lite"
import { useListKeyboardEvents } from "shared/hooks/use-tab-keyboard-events"
import { useTags } from "../../../../facade/use-tags"
import { TagContainer } from "./styles"

export const List = observer(() => {
  const tags = useTags()
  const selected = useListKeyboardEvents()

  return (
    <TagContainer ref={selected.refBox}>
      {tags.map((item, index) => (
        <TagRow
          key={item.data.id}
          tag={item.data}
          onEdit={item.edit}
          onRemove={item.remove}
          isCreatedOrUpdated={item.isCreatedOrUpdated}
          active={(selected.index === index) && selected.show}
        />
      ))}
    </TagContainer>
  )
})
