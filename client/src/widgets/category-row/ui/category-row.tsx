import { CategoryItem } from "entities/category/ui/category-row"
import { Divider, Vertical } from "shared/ui/divider"
import { GoodsCategoryLink } from "features/categories/goods-category-link"
import { AdditionalCategoryLink } from "features/categories/additional-category-link"
import { StopListButton } from "features/categories/add-stop-list"
import { TooltipImageView } from "shared/ui/tooltip-image-view"
import { Badge as MUIBadge } from "@mui/material"
import { IconButton } from "shared/ui/icon-button"
import { Position } from "shared/ui/position-counter"
import React, { memo, useMemo } from "react"
import styled from "styled-components"
import { z } from "zod"
import { DeleteButton } from "features/categories/delete/delete"
import { EditButton } from "features/categories/create-and-edit/ui/edit-button"
import { imageSchema } from "features/categories/create-and-edit/model/schemas"

interface CategoryRowProps {
  id: number
  caption: string
  images: z.infer<typeof imageSchema>[]
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
  const { caption, id, images } = props

  const renderVertical = useMemo(() => <Vertical />, [])

  return (
    <CategoryItem
      id={id}
      caption={caption}
      renderMenuActions={(id, close) => (
        <>
          <EditButton id={id} close={close} />
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
          {images && images.length !== 0 && <TooltipImageView images={images} />}
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
