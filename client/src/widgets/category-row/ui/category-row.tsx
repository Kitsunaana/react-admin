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
import { useNavigateGoods } from "shared/hooks/use-navigate-goods"
import { dispatchDelete } from "shared/lib/event"
import { mediaSchema } from "features/categories/create-and-edit/model/schemas"
import { UseMutationOptions } from "@tanstack/react-query"
import { $axios } from "shared/config/axios"

interface CategoryRowProps {
  id: number
  caption: string
  images: z.infer<typeof mediaSchema>[]
  order: number | null
}

const Badge = styled(MUIBadge)`
  & .MuiBadge-badge {
    padding-left: 2px;
    padding-right: 2px;
    top: 3px;
    z-index: 0;
  }
`

export const CategoryGoodsAdditional = memo((props: {caption: string }) => {
  const { caption } = props

  const navigate = useNavigateGoods(caption)

  return (
    <Badge badgeContent={9} color="warning">
      <IconButton
        name="goods"
        fontSize={20}
        onClick={navigate}
      />
    </Badge>
  )
})

/* const { isPending, mutate } = useMutation({
    mutationKey: ["categories"],
    mutationFn: (order: number) => $axios.patch("/categories/order", { order, id }),
    onSuccess: (data) => {
      setOrder((prevState) => prevState + direction)
    },
  }) */

export const updatePositionOptions = (id: number): UseMutationOptions<any, any, number> => ({
  mutationKey: ["categories", id],
  mutationFn: (order: number) => $axios.patch("/categories/order", { order, id }),
})

export const CategoryRow = (props: CategoryRowProps) => {
  const {
    caption, id, images, order,
  } = props

  const renderVertical = useMemo(() => <Vertical />, [])

  return (
    <CategoryItem
      id={id}
      caption={caption}
      renderMenuActions={(id, close) => (
        <>
          <EditButton id={id} close={close} />
          <Divider />
          <GoodsCategoryLink caption={caption} />
          <AdditionalCategoryLink id={id} />
          <StopListButton id={id} />
          <Divider />
          <DeleteButton
            close={close}
            onClick={() => dispatchDelete("catalog", { id, caption } as any)}
          />
          <Divider />
        </>
      )}
      renderAdditionalActions={(
        <>
          {images && images.length !== 0 && <TooltipImageView images={images} />}
          {renderVertical}
          <CategoryGoodsAdditional caption={caption} />
          {renderVertical}
          <Position updatePositionOptions={updatePositionOptions} order={order} id={id} />
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
