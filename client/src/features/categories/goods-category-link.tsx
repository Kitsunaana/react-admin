import { ContextMenuItem } from "shared/ui/context-menu-item"
import React, { memo } from "react"

interface GoodsCategoryLinkProps {
  id: number
}

export const GoodsCategoryLink = (props: GoodsCategoryLinkProps) => {
  const { id } = props

  return (
    <ContextMenuItem
      caption="Товары категории"
      icon="goods"
    />
  )
}
