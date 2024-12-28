import { observer } from "mobx-react-lite"
import { altCtrlKey, useKeyboard } from "shared/lib/keyboard-manager"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Mark } from "shared/ui/mark"
import { Text } from "shared/ui/text"
import { useToggle } from "shared/hooks/use-toggle"
import { useCategoryHistory } from "../use-category-history"
import { EventList } from "../../ui/history/event-list"
import { DrawerHistory } from "../../ui/history/drawer"

export const ModalHistory = observer(() => {
  const [open, onToggle] = useToggle()

  const categoryHistory = useCategoryHistory()

  useKeyboard({
    key: "h",
    disabled: categoryHistory.noOneEvent,
    callback: altCtrlKey(onToggle),
  })

  return (
    <>
      <IconButton
        disabled={categoryHistory.noOneEvent}
        name="history"
        onClick={onToggle}
        help={{
          title: (
            <Text
              name="history"
              value="Ctrl+Alt+H"
              translateOptions={{
                components: { strong: <Mark /> },
              }}
            />
          ),
        }}
      />
      <DrawerHistory
        open={open}
        onToggle={onToggle}
        eventList={(
          <EventList
            cursor={categoryHistory.cursor}
            events={categoryHistory.events}
            moveToVersion={categoryHistory.onMoveToEvent}
          />
        )}
        actions={(
          <>
            <IconButton
              name="undo"
              onClick={categoryHistory.onUndo}
              disabled={!categoryHistory.canUndo}
            />
            <IconButton
              name="redo"
              onClick={categoryHistory.onRedo}
              disabled={!categoryHistory.canRedo}
            />
          </>
        )}
      />
    </>
  )
})
