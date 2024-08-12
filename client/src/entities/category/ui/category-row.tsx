import { Box } from "shared/ui/box"
import {
  alpha,
} from "@mui/material"
import { Text } from "shared/ui/text"
import { Vertical } from "shared/ui/divider"
import { IconButton } from "shared/ui/icon-button"
import React, {
  memo, ReactNode, useMemo,
} from "react"
import { useContextMenu } from "shared/hooks/use-context-menu"
import { ContextMenu } from "shared/ui/context-menu"

interface CategoryItemProps {
  caption: string
  id: number
  renderMenuActions: (id: number, close: () => void) => ReactNode
  renderAdditionalActions: ReactNode
}

export const CategoryItem = memo((props: CategoryItemProps) => {
  const {
    caption, id, renderAdditionalActions, renderMenuActions,
  } = props

  const menu = useContextMenu()

  const renderCaption = useMemo(() => <Text caption={caption} />, [caption])

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
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        },
        "&:first-of-type": {
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        },
      }}
    >
      {menu.isOpen && (
        <ContextMenu
          ref={menu.ref}
          id={id}
          actionsList={renderMenuActions(id, menu.close)}
        />
      )}
      {renderCaption}
      <Box row flex ai>
        {renderAdditionalActions}
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
