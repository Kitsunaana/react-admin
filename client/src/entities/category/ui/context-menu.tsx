import React, { forwardRef } from "react"
import { ContextMenu } from "shared/ui/menu/context-menu"
import { Box } from "shared/ui/box"
import { ContextMenuItem } from "shared/ui/menu/context-menu-item"
import { Divider } from "shared/ui/divider"

interface CategoryContextMenuProps {
  id: number
  onEdit: () => void
  onDelete: () => void
  onGoodsCategory: () => void
}

export const CategoryContextMenu = forwardRef<HTMLDivElement, CategoryContextMenuProps>((props, ref) => {
  const {
    id, onEdit, onDelete, onGoodsCategory,
  } = props

  return (
    <ContextMenu
      ref={ref}
      id={id}
      actionsList={(
        <Box>
          <ContextMenuItem
            icon="edit"
            caption="edit"
            variantIcon="primary"
            onClick={onEdit}
          />
          <Divider />
          <ContextMenuItem
            caption="goodsCategory"
            icon="goods"
            onClick={onGoodsCategory}
          />
          <ContextMenuItem
            caption="additional"
            icon="additional"
          />
          <ContextMenuItem
            caption="addStopList"
            icon="stopList"
            variantText="warning"
          />
          <Divider />
          <ContextMenuItem
            caption="delete"
            icon="delete"
            variantIcon="warning"
            onClick={onDelete}
          />
          <Divider />
        </Box>
      )}
    />
  )
})
