import { CategoryItem } from "entities/category/ui/category-row"
import { Divider, Vertical } from "shared/ui/divider"
import { GoodsCategoryLink } from "features/categories/goods-category-link"
import { AdditionalCategoryLink } from "features/categories/additional-category-link"
import { StopListButton } from "features/categories/add-stop-list"
import { TooltipImageView } from "shared/ui/tooltip-image-view"
import { Badge as MUIBadge } from "@mui/material"
import { IconButtonBase } from "shared/ui/buttons/icon-button-base"
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
import { useDeleteDialogStore } from "shared/ui/dialog/context/dialog-delete-context"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"

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
      <IconButtonBase
        name="goods"
        fontSize={20}
        onClick={navigate}
      />
    </Badge>
  )
})

export const updatePositionOptions = (id: number): UseMutationOptions<any, any, number> => ({
  mutationKey: ["categories", id],
  mutationFn: (order: number) => $axios.patch("/categories/order", { order, id }),
})

export const CategoryRow = (props: CategoryRowProps) => {
  const {
    caption, id, images, order,
  } = props

  const renderVertical = useMemo(() => <Vertical />, [])

  const { openDialog } = useDeleteDialogStore()

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
            onClick={() => openDialog(id, { caption })}
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
          <IconButtonBase
            name="stopList"
            fontSize={20}
          />
        </>
      )}
    />
  )
}
