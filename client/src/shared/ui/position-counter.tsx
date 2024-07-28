import React, { FC, useState } from "react"
import { Box, BoxProps } from "shared/ui/box"
import { IconButton } from "shared/ui/icon-button"
import { SxProps, Theme } from "@mui/material"
import styled from "styled-components"

interface PositionProps {
  count: number
  sx?: SxProps<Theme>
}

export const Position = (props: PositionProps) => {
  const { count, sx } = props

  const [open, setOpen] = useState(false)

  const onToggle = () => {
    setOpen((prevState) => !prevState)
  }

  const width = String(count).split("").length

  return (
    <Container width={width} open={open} sx={sx}>
      <ArrowUpButton open={open}>
        <IconButton
          name="expand"
          color="primary"
          fontSize={20}
        />
      </ArrowUpButton>
      <Count onClick={onToggle}>{count}</Count>
      <ArrowDownButton open={open}>
        <IconButton
          name="expand"
          color="primary"
          fontSize={20}
        />
      </ArrowDownButton>

    </Container>
  )
}

interface ContainerProps extends BoxProps {
  width: number
  open: boolean
}

const Count = styled(Box)<BoxProps>`
    position: relative;
    z-index: 3;
    cursor: pointer;
`

const ArrowUpButton = styled(Box)<Omit<ContainerProps, "width">>`
    transition: .3s;
    transform: rotate(180deg);
    position: absolute;
    z-index: 2;
    left: ${({ open }) => (open ? "-5px" : "0px")};
    opacity: ${({ open }) => (open ? 1 : 0)};
    visibility: ${({ open }) => (open ? "visible" : "hidden")};
`

const ArrowDownButton = styled(Box)<Omit<ContainerProps, "width">>`
    transition: .3s;
    position: absolute;
    z-index: 2;
    right: ${({ open }) => (open ? "-5px" : "0px")};
    opacity: ${({ open }) => (open ? 1 : 0)};
    visibility: ${({ open }) => (open ? "visible" : "hidden")};
`

const Container = styled((props: ContainerProps) => <Box flex ai row gap jc {...props} />)`
    transition: .3s;
    margin: 0 4px;
    position: relative;
    min-width: ${({ open, width }) => (open ? `${width * 10 + 60}px` : `${width * 10}px`)};
`
