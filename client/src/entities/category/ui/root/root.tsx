import { useContextMenu } from "shared/hooks/context-menu/use-context-menu"
import { Text } from "shared/ui/text"
import { memo, useCallback } from "react"
import { useProductsNavigate } from "../../model/use-products-navigate"
import { ContextMenu } from "../context-menu"
import { Actions } from "../actions"
import { Layout } from "../layout"
import { Media } from "../../domain/types"
import { IconActionsButton } from "./styles"

export const Root = memo(({
  id,
  caption,
  media,
  order,
  isLoading,
  onEdit,
  onRemove,
  onChangeOrder,
  onOpenGallery,
}: {
  id: string
  caption: string
  media: Media[]
  order: number
  isLoading: boolean
  onEdit: (id: string) => void
  onRemove: (id: string, caption: string) => Promise<void>
  onChangeOrder: (id: string, order: number) => void
  onOpenGallery: (index: number, media: Media[]) => void
}) => {
  const productsNavigate = useProductsNavigate(caption)
  const menu = useContextMenu()

  const handleOnEdit = useCallback(() => {
    menu.close()
    onEdit(id)
  }, [])

  const handleOnDelete = useCallback(() => {
    menu.close()
    onRemove(id, caption)
  }, [])

  const handleChangeOrder = useCallback((order: number) => onChangeOrder(id, order), [id])

  const handleOpenGallery = useCallback((index: number) => onOpenGallery(index, media), [])

  return (
    <Layout
      isOpen={menu.isOpen}
      open={menu.open}
      caption={<Text caption={caption} />}
      actions={(
        <Actions
          caption={caption}
          order={order}
          media={media}
          isLoading={isLoading}
          onOpenGallery={handleOpenGallery}
          onChangeOrder={handleChangeOrder}
        />
      )}
      contextButton={(
        <IconActionsButton
          color="primary"
          name="actions"
          onClick={menu.open}
          help={{
            title: (
              <Text
                onlyText
                name="actions"
              />
            ),
          }}
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
