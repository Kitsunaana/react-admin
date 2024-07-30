import { ContextMenuItem } from "shared/ui/context-menu-item"
import React from "react"

export const AdditionalCategoryLink = ({ id }: { id: number }) => (
  <ContextMenuItem
    caption="Дополнения"
    icon="additional"
  />
)
