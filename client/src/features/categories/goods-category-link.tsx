import { ContextMenuItem } from "shared/ui/context-menu-item"
import React from "react"
import { useNavigateGoods } from "shared/hooks/use-navigate-goods"

interface GoodsCategoryLinkProps {
  caption: string
}

export const GoodsCategoryLink = (props: GoodsCategoryLinkProps) => {
  const { caption } = props

  const navigate = useNavigateGoods(caption)

  return (
    <ContextMenuItem
      caption="Товары категории"
      icon="goods"
      onClick={navigate}
    />
  )
}
