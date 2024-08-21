import styled from "styled-components"
import { Box, BoxProps } from "shared/ui/box"
import { alpha } from "@mui/material"
import React from "react"

interface RowItemProps extends BoxProps {
  error?: boolean
  warning?: boolean
  errorBg?: boolean
}

export const RowItem = styled((props: RowItemProps) => {
  const {
    error, errorBg, warning, ...other
  } = props
  return <Box {...other} />
})`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 8px;
  margin-bottom: 4px;
  border-radius: 8px;
  transition: .3s;
  background-size: 6px 6px;
  min-height: 40px;

  border: ${({ theme: { palette } }) => `1px solid ${palette.mode === "dark"
    ? alpha(palette.grey["600"], 0.75) : alpha(palette.grey["400"], 0.45)}`};
  
  border-left: ${({ error, warning, theme: { palette } }) => (error
    ? `5px solid ${palette.error.main}`
    : warning ? `5px solid ${palette.warning.main}` : null)};
  
  background-image: ${({ errorBg, theme: { background } }) => (errorBg ? background.hatch.error : null)};
  
  &:hover {
    background-color: ${({ theme: { palette } }) => (palette.mode === "dark"
    ? palette.grey[800] : palette.grey[100])};  
  }
`
