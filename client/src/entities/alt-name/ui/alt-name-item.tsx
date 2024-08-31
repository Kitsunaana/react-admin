import { Text } from "shared/ui/text"
import { Box } from "shared/ui/box"
import { Mark } from "shared/ui/mark"
import { Vertical } from "shared/ui/divider"
import { IconButtonEdit } from "shared/ui/buttons/icon-button-edit"
import { IconButtonDelete } from "shared/ui/buttons/icon-button-delete"
import { RowItem } from "shared/ui/row-item"
import React from "react"
import { alpha, useTheme } from "@mui/material"
import { IAltName } from "entities/alt-name/model/types"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { useDeleteDialogStore } from "shared/ui/dialog/context/dialog-delete-context"

interface AltNameItemProps extends IAltName {
  disabled?: boolean
}

export const AltNameItem = (props: AltNameItemProps) => {
  const {
    caption, id, edited, locale, description, disabled,
  } = props

  const theme = useTheme()
  const editStore = useEditDialogStore()
  const deleteStore = useDeleteDialogStore()

  const onOpenEditDialog = () => {
    editStore.openDialog(id, {
      caption, locale, description, id,
    })
  }

  const onOpenDeleteDialog = () => {
    deleteStore.openDialog(id, {
      caption,
    })
  }

  return (
    <RowItem
      theme={theme}
      success={edited}
      sx={{
        ...(!disabled ? {} : {
          position: "relative",
          "&::after": {
            position: "absolute",
            content: "''",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            borderRadius: 2,
            background: ({ palette }) => (palette.mode === "light"
              ? alpha(palette.common.black, 0.15)
              : alpha(palette.common.white, 0.15)),
          },
        }),
      }}
    >
      <Text caption={caption} />

      <Box flex row ai>
        <Mark>{locale.caption}</Mark>
        <Vertical />
        <IconButtonEdit onClick={onOpenEditDialog} />
        <IconButtonDelete onClick={onOpenDeleteDialog} />
      </Box>
    </RowItem>
  )
}
