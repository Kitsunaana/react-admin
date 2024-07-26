import { Accordion } from "shared/ui/Accordion"
import { Text } from "shared/ui/Text"
import { Vertical } from "shared/ui/Divider"
import { Box } from "shared/ui/Box"
import React from "react"
import { ActionButton } from "pages/Goods/GoodsPage"
import { Mark } from "shared/ui/Mark"
import { Tag } from "shared/ui/Tag"
import { TooltipImageView } from "shared/ui/TooltipImageView"
import { StopListButton } from "./StopListButton"
import { AdditionalButton } from "./AdditionalButton"
import { CardProductDetails } from "./CardProductDetails"

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
