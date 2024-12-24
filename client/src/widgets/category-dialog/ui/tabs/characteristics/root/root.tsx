import { observer } from "mobx-react-lite"
import { createRoute, eventBus } from "shared/lib/event-bus"
import { altCtrlKey, useKeyboard } from "shared/lib/keyboard-manager"
import { IconButton } from "shared/ui/buttons/icon-button"
import { EmptyList } from "shared/ui/empty-list"
import { Text } from "shared/ui/text"
import { useCharacteristicStore } from "../../../../model/characteristics/use-characteristic-store"
import { Layout } from "../layout"
import { List } from "../list"

const openCreateModal = createRoute("characteristic.create.open")

export const Root = observer(() => {
  const isEmpty = useCharacteristicStore((store) => store.list.isEmpty)

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
