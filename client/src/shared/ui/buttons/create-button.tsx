import { IconButtonBase } from "shared/ui/buttons/icon-button-base"
import React from "react"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"

export const CreateButton = () => {
  const { openDialog } = useEditDialogStore()

  return (
    <IconButtonBase
      name="add"
      color="success"
      fontSize={20}
      onClick={() => openDialog(null)}
    />
  )
}
