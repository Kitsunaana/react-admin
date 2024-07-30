import { ContextMenuItem } from "shared/ui/context-menu-item"
import React from "react"

export const GoodsCategoryLink = ({ id }: { id: number }) => (
  <ContextMenuItem
    caption="Товары категории"
    icon="goods"
  />
)
