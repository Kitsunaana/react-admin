import { ContextMenuItem } from "shared/ui/context-menu-item"
import React from "react"

export const EditButton = ({ id }: { id: number }) => (
  <ContextMenuItem
    caption="Редактировать"
    icon="edit"
    variantIcon="primary"
  />
)
