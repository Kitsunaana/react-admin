import { Box, BoxProps } from "shared/ui/box"
import {
  alpha, Theme,
} from "@mui/material"
import { Text } from "shared/ui/text"
import { Vertical } from "shared/ui/divider"
import { IconButton } from "shared/ui/icon-button"
import React, {
  memo, ReactNode, useMemo,
} from "react"
import { useContextMenu } from "shared/hooks/use-context-menu"
import { ContextMenu } from "shared/ui/context-menu"
import styled, { css } from "styled-components"
import { dispatch } from "shared/lib/event"

interface CategoryItemProps {
  caption: string
  id: number
  renderMenuActions: (id: number, close: () => void) => ReactNode
  renderAdditionalActions: ReactNode
}

interface WrapperProps extends BoxProps {
  isOpen: boolean
  theme: Theme
}

const Wrapper = styled(Box)<WrapperProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  height: 48px;
  border: 1px solid ${({ theme }) => alpha(theme.palette.grey["600"], 0.75)};

  ${({ isOpen }) => (isOpen && css`
    background-image: ${({ theme }) => theme.background.hatch.primary};
    background-size: 8px 8px;
  `)}

  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &:first-of-type {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
`

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
