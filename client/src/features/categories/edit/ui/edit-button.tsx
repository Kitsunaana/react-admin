import { ContextMenuItem } from "shared/ui/menu/context-menu-item"
import React from "react"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"

interface EditButtonProps {
  id: number
  close: () => void
}

export const EditButton = (props: EditButtonProps) => {
  const { id, close } = props

  const { openDialog } = useEditDialogStore()

  return (
    <ContextMenuItem
      caption="Редактировать"
      icon="edit"
      variantIcon="primary"
      onClick={() => {
        close()
        openDialog(id)
      }}
    />
  )
}
