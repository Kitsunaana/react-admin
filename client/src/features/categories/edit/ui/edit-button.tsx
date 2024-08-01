import { ContextMenuItem } from "shared/ui/context-menu-item"
import React from "react"
import { dispatch } from "shared/lib/event"

export const EditButton = ({ id }: { id: number }) => (
  <ContextMenuItem
    caption="Редактировать"
    icon="edit"
    variantIcon="primary"
    onClick={() => dispatch("dialog.catalog.edit" as any, { id })}
  />
)
