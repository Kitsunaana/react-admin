import { observer } from "mobx-react-lite"
import { createRoute, eventBus } from "shared/lib/event-bus"
import { altCtrlKey, useKeyboard } from "shared/lib/keyboard-manager"
import { IconButton } from "shared/ui/buttons/icon-button"
import { EmptyList } from "shared/ui/empty-list"
import { Text } from "shared/ui/text"
import { useTagsStore } from "../../../../model/tags/use-tags-store"
import { Layout } from "../layout"
import { List } from "../list"

const openModalEvent = createRoute("tag.create.open")

export const Root = observer(() => {
  const isEmpty = useTagsStore((store) => store.isEmpty)

  const startCreate = () => eventBus.emit(openModalEvent())

  useKeyboard({
    key: "a",
    callback: altCtrlKey(startCreate),
  })

  return (
    <Layout
      list={isEmpty ? <EmptyList /> : <List />}
      actions={(
        <IconButton
          name="add"
          onClick={startCreate}
          help={{
            title: (
              <Text
                onlyText
                name="actions.add"
              />
            ),
          }}
        />
      )}
    />
  )
})
