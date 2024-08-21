import { ContextMenuItem } from "shared/ui/context-menu-item"
import React from "react"
import { dispatchEdit } from "shared/lib/event"
import { useDialogStore } from "shared/ui/dialog/model/dialog-context"

export const EditButton = ({ id, close }: { id: number, close: () => void }) => {
  const { openDialog } = useDialogStore()

  return (
    <ContextMenuItem
      caption="Редактировать"
      icon="edit"
      variantIcon="primary"
      onClick={() => {
        close()
        // dispatchEdit("catalog", { id } as any)
        openDialog(id)
      }}
    />
  )
}
