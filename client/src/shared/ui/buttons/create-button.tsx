import { IconButtonBase } from "shared/ui/buttons/icon-button-base"
import React from "react"
import { useDialogStore } from "shared/ui/dialog/model/dialog-context"

export const CreateButton = () => {
  const { openDialog } = useDialogStore()

  return (
    <IconButtonBase
      name="add"
      color="success"
      fontSize={20}
      onClick={() => openDialog(null)}
    />
  )
}
