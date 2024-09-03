import { Accordion } from "shared/ui/accordion"
import { Text } from "shared/ui/text"
import { Vertical } from "shared/ui/divider"
import { Box } from "shared/ui/box"
import React from "react"
import { Mark } from "shared/ui/mark"
import { Tag } from "shared/ui/tag"
import { TooltipImageView } from "shared/ui/tooltip-image-view"
import { IconButton } from "shared/ui/buttons/icon-button"
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
        <Tag caption="new" />
        <Tag caption="hot" />
      </>
    )}
    actions={(
      <>
        <TooltipImageView images={[]} />
        <Vertical />
        <StopListButton />
        <AdditionalButton />
        <Vertical />
        <Box sx={{ mx: 0.25 }}>
          26
        </Box>
        <Vertical />
        <IconButton
          help={{ title: <Text onlyText name="actions" /> }}
          sx={{ p: 0.25, borderRadius: 1 }}
          color="primary"
          name="actions"
          // onClick={menu.open}
        />
      </>
    )}
    contentTitle="Прайс-лист"
    details={<CardProductDetails />}
  />
)
