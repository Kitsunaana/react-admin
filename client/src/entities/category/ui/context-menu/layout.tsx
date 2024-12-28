import { forwardRef } from "react"
import { BoxProps } from "shared/ui/box"
import { Divider } from "shared/ui/divider"
import { ContextMenu } from "shared/ui/menu/context-menu"
import { ContextMenuItem } from "shared/ui/menu/context-menu-item"

interface LayoutProps extends Omit<BoxProps, "id"> {
  id: string
  onEdit: () => void
  onDelete: () => void
  onGoodsCategory: () => void
}

export const Layout = forwardRef<HTMLDivElement, LayoutProps>((props, ref) => {
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
        <div>
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
        </div>
      )}
    />
  )
})
