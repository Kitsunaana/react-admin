import { IconButton } from "shared/ui/icon-button"
import React from "react"
import { useDialogStore } from "shared/ui/dialog/model/dialog-context"

export const CreateButton = () => {
  const { openDialog } = useDialogStore()

  return (
    <IconButton
      name="add"
      color="success"
      fontSize={20}
      onClick={() => openDialog(null)}
    />
  )
}
