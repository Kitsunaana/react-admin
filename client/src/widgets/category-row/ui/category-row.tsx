import { CategoryItem } from "entities/category/ui/category-row"
import { EditButton } from "features/categories/edit"
import { Divider, Vertical } from "shared/ui/divider"
import { GoodsCategoryLink } from "features/categories/goods-category-link"
import { AdditionalCategoryLink } from "features/categories/additional-category-link"
import { StopListButton } from "features/categories/add-stop-list"
import { DeleteButton } from "features/categories/delete"
import { TooltipImageView } from "shared/ui/tooltip-image-view"
import { MIKU } from "shared/config/constants"
import { Badge as MUIBadge } from "@mui/material"
import { IconButton } from "shared/ui/icon-button"
import { Position } from "shared/ui/position-counter"
import React, { memo, useMemo } from "react"
import styled from "styled-components"

interface CategoryRowProps {
  id: number
  caption: string
}

const Badge = styled(MUIBadge)`
  & .MuiBadge-badge {
    padding-left: 2px;
    padding-right: 2px;
    top: 3px;
    z-index: 0;
  }
`

export const CategoryGoodsLinkAdditional = memo(() => (
  <Badge badgeContent={9} color="warning">
    <IconButton name="goods" fontSize={20} />
  </Badge>
))

export const CategoryRow = (props: CategoryRowProps) => {
  const { caption, id } = props

  const images = useMemo(() => MIKU, [])

  const renderVertical = useMemo(() => <Vertical />, [])

  return (
    <CategoryItem
      id={id}
      caption={caption}
      renderMenuActions={(id) => (
        <>
          <EditButton id={id} />
          <Divider />
          <GoodsCategoryLink id={id} />
          <AdditionalCategoryLink id={id} />
          <StopListButton id={id} />
          <Divider />
          <DeleteButton id={id} />
          <Divider />
        </>
      )}
      renderAdditionalActions={(
        <>
          <TooltipImageView images={images} />
          {renderVertical}
          <CategoryGoodsLinkAdditional />
          {renderVertical}
          <Position count={12} />
          {renderVertical}
          <IconButton
            name="stopList"
            fontSize={20}
          />
        </>
      )}
    />
  )
}
