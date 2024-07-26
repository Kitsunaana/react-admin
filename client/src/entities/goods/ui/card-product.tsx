import { Accordion } from "shared/ui/accordion"
import { Text } from "shared/ui/text"
import { Vertical } from "shared/ui/divider"
import { Box } from "shared/ui/box"
import React from "react"
import { ActionButton } from "pages/Goods/goods-page"
import { Mark } from "shared/ui/mark"
import { Tag } from "shared/ui/tag"
import { TooltipImageView } from "shared/ui/tooltip-image-view"
import { StopListButton } from "./stop-list-button"
import { AdditionalButton } from "./additional-button"
import { CardProductDetails } from "./card-product-details"

export const CardProduct = () => (
  <Accordion
    caption={<Text caption="Ананас" />}
    description={(
      <Text
        sx={{ fontSize: 12 }}
        langBase="goods.table.row"
        name="category"
        value="Экзотические фрукты"
        translateOptions={{
          components: {
            strong: <Mark />,
          },
        }}
      />
      )}
    tags={(
      <>
        <Tag caption="-18 шт." variant="warning" />
        <Tag caption="new" />
        <Tag caption="hot" />
      </>
      )}
    actions={(
      <>
        <TooltipImageView />
        <Vertical />
        <StopListButton />
        <AdditionalButton />
        <Vertical />
        <Box sx={{ mx: 0.25 }}>
          26
        </Box>
        <Vertical />
        <ActionButton />
      </>
      )}
    contentTitle="Прайс-лист"
    details={<CardProductDetails />}
  />
)
