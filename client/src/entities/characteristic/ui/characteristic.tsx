import { observer } from "mobx-react-lite"
import { useStores } from "features/categories/create-and-edit/ui/dialog"
import { useTheme } from "@mui/material"
import { Box } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import { Vertical } from "shared/ui/divider"
import React from "react"
import { RowItem } from "shared/ui/row-item"
import { ICharacteristic } from "entities/characteristic/model/types"
import { Caption } from "entities/characteristic/ui/caption"
import { HiddenIndicator } from "entities/characteristic/ui/hidden-indicator"
import { IconButtonEdit } from "shared/ui/buttons/icon-button-edit"
import { IconButtonDelete } from "shared/ui/buttons/icon-button-delete"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { useDeleteDialogStore } from "shared/ui/dialog/context/dialog-delete-context"

export interface CharacteristicItemProps extends ICharacteristic {
  local?: boolean
}

export const Characteristic = observer((props: CharacteristicItemProps) => {
  const {
    unit, hideClient, value, caption, id, local,
  } = props

  const { characteristics } = useStores()
  const { openDialog } = useEditDialogStore()
  const { openDialog: openDeleteDialog } = useDeleteDialogStore()
  const theme = useTheme()

  const onOpenEditDialog = () => openDialog(id, {
    unit, hideClient, value, caption,
  })

  const onOpenDeleteDialog = () => openDeleteDialog(id, { caption })

  const hasConflict = characteristics.getConflict({ id, caption })

  return (
    <RowItem
      onDoubleClick={onOpenEditDialog}
      theme={theme}
      errorBg={hasConflict}
      error={hasConflict}
      warning={local}
    >
      <Box flex row ai>
        <HiddenIndicator hidden={hideClient} />
        <Caption caption={caption} unit={unit} value={value} />
      </Box>
      <Box flex ai row>
        <Icon
          name="allowCategory"
          fontSize="small"
          color="success"
          help={{ title: "Для категории", arrow: true }}
        />
        <Vertical />
        <IconButtonEdit onClick={onOpenEditDialog} />
        <IconButtonDelete onClick={onOpenDeleteDialog} />
      </Box>
    </RowItem>
  )
})