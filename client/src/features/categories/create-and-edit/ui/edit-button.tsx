import { ContextMenuItem } from "shared/ui/context-menu-item"
import React from "react"
import { dispatchEdit } from "shared/lib/event"

export const EditButton = ({ id, close }: { id: number, close: () => void }) => (
  <ContextMenuItem
    caption="Редактировать"
    icon="edit"
    variantIcon="primary"
    onClick={() => {
      close()
      dispatchEdit("catalog", { id } as any)
    }}
  />
)
