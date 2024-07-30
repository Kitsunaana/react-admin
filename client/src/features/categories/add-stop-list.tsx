import { ContextMenuItem } from "shared/ui/context-menu-item"
import React from "react"

export const StopListButton = ({ id }: { id: number }) => (
  <ContextMenuItem
    caption="Добавить в стоп лист"
    icon="stopList"
    variantText="warning"
  />
)
