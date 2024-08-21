import { ContextMenuItem } from "shared/ui/menu/context-menu-item"
import React from "react"

export const AdditionalCategoryLink = ({ id }: { id: number }) => (
  <ContextMenuItem
    caption="Дополнения"
    icon="additional"
  />
)
