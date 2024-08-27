import { Box, BoxProps } from "shared/ui/box"
import styled from "styled-components"
import { useTheme } from "@mui/material"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import React from "react"

interface TagProps extends BoxProps {
  color: string
  caption: string
  icon: string | null
}

const TagCustom = styled((props: BoxProps & { color: string }) => <Box {...props} />)`
  padding-left: 14px;
  padding-right: 14px;
  min-height: 24px;
  background: ${({ color }) => color};
  position: relative;
  clip-path: polygon(calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 0% 100%, 8px 50%, 0% 0%);
  display: inline-flex;
  flex-flow: row;
  gap: 4px;
  align-items: center;
`

export const Tag = (props: TagProps) => {
  const {
    color, caption, icon, ...other
  } = props

  const theme = useTheme()
  const contrastColor = theme.palette.getContrastText(color)

  return (
    <TagCustom
      color={color}
      sx={{ backgroundColor: color }}
      {...other}
    >
      {icon && (
        <Icon
          sx={{ color: contrastColor }}
          fontSize="small"
        >
          {icon}
        </Icon>
      )}
      <Text
        sx={{ color: contrastColor }}
        caption={caption}
      />
    </TagCustom>
  )
}
