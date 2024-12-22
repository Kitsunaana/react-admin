import { observer } from "mobx-react-lite"
import { IconButton } from "shared/ui/buttons/icon-button"
import { EmptyList } from "shared/ui/empty-list"
import { Text } from "shared/ui/text"
import { altCtrlKey, useKeyboard } from "shared/lib/keyboard-manager"
import { createRoute, eventBus } from "shared/lib/event-bus"
import { Layout } from "../layout"
import { List } from "../list"
import { useCharacteristicStore } from "../../../../model/use-characteristic-store"

const openCreateModal = createRoute("characteristic.create.open")

export const Root = observer(() => {
  const isEmpty = useCharacteristicStore((store) => store.isEmpty)

  const startCreate = () => eventBus.emit(openCreateModal())

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
