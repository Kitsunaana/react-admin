import React from "react"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Text } from "shared/ui/text"
import { useCreateDialogStore } from "shared/ui/dialog/context/dialog-create-context"

export const CreateButton = () => {
  const { openDialog } = useCreateDialogStore()

  return (
    <IconButton
      help={{ title: <Text onlyText name="add" /> }}
      name="add"
      color="success"
      fontSize={20}
      onClick={() => openDialog(null)}
    />
  )
}
