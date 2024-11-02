import { observer } from "mobx-react-lite"
import { useState } from "react"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Drawer } from "@mui/material"
import { Box } from "shared/ui/box"
import { Text } from "shared/ui/text"
import { useKeyboard } from "shared/lib/keyboard-manager"
import { EventList } from "./event-list"
import { HistoryStoreImpl } from "../domain/interface-history.store"
import { Mark } from "shared/ui/mark"

interface CategoryHistoryProps {
  historyStore: HistoryStoreImpl
  moveToVersion: (index: number) => void
  onUndo: () => void
  onRedo: () => void
}

export const CategoryHistory = observer((props: CategoryHistoryProps) => {
  const {
    onUndo,
    onRedo,
    moveToVersion,
    historyStore,
  } = props

  const [open, setOpen] = useState(false)

  const toggleDrawer = () => setOpen((prevState) => !prevState)

  const disabled = historyStore.categoryWithEvents.length === 0

  useKeyboard({
    key: "H",
    disabled,
    callback: ({ ctrlKey, altKey }) => {
      if (ctrlKey && altKey) toggleDrawer()
    },
  })

  useKeyboard({
    key: "h",
    disabled,
    callback: ({ ctrlKey, altKey }) => {
      if (ctrlKey && altKey) toggleDrawer()
    },
  })

  return (
    <div>
      <IconButton
        disabled={disabled}
        name="history"
        onClick={toggleDrawer}
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
      <Drawer
        sx={{ zIndex: 10000 }}
        anchor="right"
        open={open}
        onClose={toggleDrawer}
      >
        <Box sx={{ overflow: "auto" }}>
          <EventList
            cursor={historyStore._cursor}
            events={historyStore.categoryWithEvents}
            moveToVersion={moveToVersion}
          />
        </Box>

        <Box flex ai row gap sx={{ mb: 0, mt: "auto", mx: 1 }}>
          <IconButton
            name="undo"
            onClick={onUndo}
            disabled={!historyStore.canUndo}
          />
          <IconButton
            name="redo"
            onClick={onRedo}
            disabled={!historyStore.canRedo}
          />
        </Box>
      </Drawer>
    </div>
  )
})
