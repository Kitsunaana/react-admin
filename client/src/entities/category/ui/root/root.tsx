import { useContextMenu } from "shared/hooks/context-menu/use-context-menu"
import { CategoryView, Media } from "shared/types/new_types/types"
import { Text } from "shared/ui/text"
import { memo, useCallback } from "react"
import { OpenGalleryData } from "shared/events/open-gallery"
import { useProductsNavigate } from "../../model/use-products-navigate"
import { ContextMenu } from "../context-menu"
import { Actions } from "../actions"
import { Layout } from "../layout"

export const Root = memo(({
  id,
  caption,
  images,
  order,
  isLoading,
  category,
  onOpenGallery,
  onChangeOrder,
  onRemoveCategory,
  onOpenEditDialog,
}: {
  id: string
  caption: string
  images: Media[]
  order: number | null
  isLoading: boolean
  onOpenGallery: (data: OpenGalleryData) => void
  onRemoveCategory: (payload: CategoryView) => Promise<void>
  onChangeOrder: (payload: { id: string, order: number }) => void
  onOpenEditDialog: (id: string) => void
  category: CategoryView
}) => {
  const productsNavigate = useProductsNavigate(caption)
  const menu = useContextMenu()

  const handleOnEdit = () => {
    menu.close()
    onOpenEditDialog(id)
  }

  const handleOnDelete = () => {
    menu.close()
    onRemoveCategory(category)
  }

  const handleChangeOrder = useCallback(
    (order: number) => onChangeOrder({ id, order }),
    [id],
  )

  return (
    <Layout
      isOpen={menu.isOpen}
      open={menu.open}
      caption={<Text caption={caption} />}
      actions={(
        <Actions
          caption={caption}
          order={order}
          images={images}
          isLoading={isLoading}
          onOpenGallery={onOpenGallery}
          onChangeOrder={handleChangeOrder}
          onOpenActions={menu.open}
        />
      )}
      contextMenu={(
        <ContextMenu
          id={id}
          ref={menu.ref}
          onEdit={handleOnEdit}
          onDelete={handleOnDelete}
          onGoodsCategory={productsNavigate}
        />
      )}
    />
  )
})
