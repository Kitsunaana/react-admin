import { Box } from "shared/ui/box"
import {
  alpha, Badge,
} from "@mui/material"
import { Text } from "shared/ui/text"
import { TooltipImageView } from "shared/ui/tooltip-image-view"
import { MIKU } from "shared/config/constants"
import { Divider, Vertical } from "shared/ui/divider"
import { IconButton } from "shared/ui/icon-button"
import { Position } from "shared/ui/position-counter"
import React, {
  memo,
} from "react"
import { useContextMenu } from "shared/hooks/use-context-menu"
import { EditButton } from "features/categories/edit/ui/edit-button"
import { GoodsCategoryLink } from "features/categories/goods-category-link"
import { AdditionalCategoryLink } from "features/categories/additional-category-link"
import { StopListButton } from "features/categories/add-stop-list"
import { DeleteButton } from "features/categories/delete"
import { ContextMenu } from "shared/ui/context-menu"

interface CategoryItemProps {
  caption: string
  id: number
}

export const CategoryItem = memo((props: CategoryItemProps) => {
  const {
    caption,
    id,
  } = props

  const menu = useContextMenu()

  return (
    <Box
      onContextMenu={menu.open}
      flex
      ai
      row
      jc_sp
      sx={{
        px: 1,
        height: 48,
        border: ({ palette }) => `1px solid ${alpha(palette.grey["600"], 0.75)}`,
        ...(menu.isOpen ? {
          backgroundImage: ({ background }) => background.hatch.primary,
          backgroundSize: "8px 8px",
        } : {}),
        "&:last-child": {
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
        },
        "&:first-of-type": {
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        },
      }}
    >
      {menu.isOpen && (
      <ContextMenu
        ref={menu.ref}
        id={id}
        actionsList={(
          <>
            <EditButton id={id} />
            <Divider />
            <GoodsCategoryLink id={id} />
            <AdditionalCategoryLink id={id} />
            <StopListButton id={id} />
            <Divider />
            <DeleteButton id={id} />
            <Divider />
          </>
        )}
      />
      )}
      <Text caption={caption} />
      <Box row flex ai>
        <TooltipImageView images={MIKU} />
        <Vertical />
        <Badge
          badgeContent={9}
          color="warning"
          sx={{
            "& .MuiBadge-badge": {
              px: 0.25,
              top: 3,
              right: 3,
              zIndex: 0,
            },
          }}
        >
          <IconButton name="goods" fontSize={20} />
        </Badge>
        <Vertical />
        <Position count={17345} />
        <Vertical />
        <IconButton name="stopList" fontSize={20} onContextMenu={(event) => event.stopPropagation()} />
        <Vertical />
        <IconButton
          sx={{ p: 0.25, borderRadius: 1 }}
          color="primary"
          name="actions"
          onClick={menu.open}
        />
      </Box>
    </Box>
  )
})
