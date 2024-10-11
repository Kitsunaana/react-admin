import { forwardRef } from "react"
import { Box, BoxProps } from "shared/ui/box"
import { Divider } from "shared/ui/divider"
import { ContextMenu } from "shared/ui/menu/context-menu"
import { ContextMenuItem } from "shared/ui/menu/context-menu-item"

interface CategoryContextMenuProps extends Omit<BoxProps, "id"> {
  id: number
  onEdit: () => void
  onDelete: () => void
  onGoodsCategory: () => void
}

export const CategoryContextMenu = forwardRef<HTMLDivElement, CategoryContextMenuProps>((props, ref) => {
  const {
    id,
    onEdit,
    onDelete,
    onGoodsCategory,
    ...other
  } = props

  return (
    <ContextMenu
      {...other}
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
