import { observer } from "mobx-react-lite"
import { createRoute, eventBus } from "shared/lib/event-bus"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Text } from "shared/ui/text"
import { EmptyList } from "shared/ui/empty-list"
import { List } from "../list"
import { useTagsStore } from "../../../../model/use-tags-store"
import { Layout } from "../layout"

const openModalEvent = createRoute("tag.create.open")

export const Root = observer(() => {
  const isEmpty = useTagsStore((store) => store.isEmpty)

  const startCreate = () => eventBus.emit(openModalEvent())

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
