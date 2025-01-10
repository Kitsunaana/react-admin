import { memo } from "react"
import { TooltipImageView } from "shared/ui/tooltip-image-view"
import { Vertical } from "shared/ui/divider"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Text } from "shared/ui/text"
import { Position } from "shared/ui/position-counter"
import { useProductsNavigate } from "../../model/use-products-navigate"
import { Media } from "../../domain/types"

export const Actions = memo(({
  caption,
  order,
  media,
  isLoading,
  onOpenGallery,
  onChangeOrder,
}: {
  caption: string
  order: number | null
  media: Media[]
  isLoading: boolean
  onOpenGallery: (index: number) => void
  onChangeOrder: (order: number) => void
}) => {
  const productsNavigate = useProductsNavigate(caption)

  return (
    <>
      <TooltipImageView
        onOpenGallery={onOpenGallery}
        media={media}
      />
      <Vertical />
      <IconButton
        name="goods"
        fontSize={20}
        onClick={productsNavigate}
        help={{
          title: (
            <Text
              onlyText
              name="goodsCategoryCount"
            />
          ),
        }}
        badge={{
          badgeContent: 9,
          color: "warning",
        }}
      />
      <Vertical />
      <Position
        order={order}
        onUpdate={onChangeOrder}
        isLoading={isLoading}
      />
      <Vertical />
      <IconButton
        name="stopList"
        fontSize={20}
        help={{
          title: (
            <Text
              onlyText
              name="addStopList"
            />
          ),
        }}
      />
      <Vertical />
    </>
  )
})
