import { Media } from "shared/types/new_types/types"
import { OpenGalleryData } from "shared/events/open-gallery"
import React from "react"
import { TooltipImageView } from "shared/ui/tooltip-image-view"
import { Vertical } from "shared/ui/divider"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Text } from "shared/ui/text"
import { Position } from "shared/ui/position-counter"
import { useProductsNavigate } from "../../model/use-products-navigate"
import { IconActionsButton } from "./styles"

export const Actions = ({
  caption,
  order,
  images,
  isLoading,
  onOpenGallery,
  onChangeOrder,
  onOpenActions,
}: {
  caption: string
  order: number | null
  images: Media[]
  isLoading: boolean
  onOpenGallery: (data: OpenGalleryData) => void
  onChangeOrder: (order: number) => void
  onOpenActions: (event: React.MouseEvent<Element, MouseEvent>) => void
}) => {
  const productsNavigate = useProductsNavigate(caption)

  return (
    <>
      <TooltipImageView
        onOpenGallery={(data) => onOpenGallery(data)}
        images={images}
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
      <IconActionsButton
        color="primary"
        name="actions"
        onClick={onOpenActions}
        help={{
          title: (
            <Text
              onlyText
              name="actions"
            />
          ),
        }}
      />
    </>
  )
}
