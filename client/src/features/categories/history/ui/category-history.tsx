import { observer } from "mobx-react-lite"
import { useState } from "react"
import { useCategoryStores } from "features/categories/@dialog/ui/context"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Drawer } from "@mui/material"
import { Box } from "shared/ui/box"
import { ShowEvents } from "features/categories/@history/ui/show-events"

interface CategoryHistoryProps {
  moveToVersion: (index: number) => void
  onUndo: () => void
  onRedo: () => void
}

export const CategoryHistory = observer((props: CategoryHistoryProps) => {
  const { moveToVersion, onUndo, onRedo } = props

  const [open, setOpen] = useState(false)
  const categoryStores = useCategoryStores()

  const toggleDrawer = () => setOpen((prevState) => !prevState)

  return (
    <div>
      <IconButton
        disabled={categoryStores.categoryWithEvents.length === 0}
        name="history"
        onClick={toggleDrawer}
      />
      <Drawer
        sx={{ zIndex: 10000 }}
        anchor="right"
        open={open}
        onClose={toggleDrawer}
      >

        <Box sx={{ overflow: "auto" }}>
          <ShowEvents
            events={categoryStores.categoryWithEvents}
            moveToVersion={moveToVersion}
          />
        </Box>

        <Box flex ai row gap sx={{ mb: 0, mt: "auto", mx: 1 }}>
          <IconButton
            name="undo"
            onClick={onUndo}
          />
          <IconButton
            name="redo"
            onClick={onRedo}
          />
        </Box>

      </Drawer>
    </div>
  )
})
