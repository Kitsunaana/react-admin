import React, {
  memo, useEffect, useState,
} from "react"
import { Box, BoxProps } from "shared/ui/box"
import { IconButton } from "shared/ui/icon-button"
import { SxProps, Theme } from "@mui/material"
import styled from "styled-components"
import { Icon } from "shared/ui/icon"

interface ContainerProps extends BoxProps {
  width: number
  open: boolean
  fullWidth: boolean
}

const Count = styled(Box)<BoxProps>`
  position: relative;
  z-index: 0;
  cursor: pointer;
`

const ArrowUpButton = styled(Box)<Omit<ContainerProps, "width" | "fullWidth">>`
  transition: .3s;
  transform: rotate(180deg);
  position: absolute;
  z-index: 2;
  left: ${({ open }) => (open ? "-5px" : "0px")};
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
`

const ArrowDownButton = styled(Box)<Omit<ContainerProps, "width" | "fullWidth">>`
  transition: .3s;
  position: absolute;
  z-index: 2;
  right: ${({ open }) => (open ? "-5px" : "0px")};
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
`

const Container = styled((props: ContainerProps) => {
  const { fullWidth, ...other } = props
  return <Box flex ai row gap jc {...other} />
})`
  transition: .3s;
  margin: 0 4px;
  position: relative;
  min-width: ${({ open, width, fullWidth }) => (open ? `${width * 10 + (fullWidth ? 60 : 45)}px` : "24px")};
  width: unset;
`

interface UpdateOrderProps {
  order: number | null
  sx?: SxProps<Theme>
  id: number
  onClick: (order: number, id: number) => void
}

export const UpdateOrder = memo((props: UpdateOrderProps) => {
  const {
    order: orderProps, sx, id, onClick,
  } = props

  const [open, setOpen] = useState(false)
  const [order, setOrder] = useState(orderProps ?? 0)

  useEffect(() => { setOrder(orderProps ?? 0) }, [orderProps])

  const onToggle = () => {
    setOpen((prevState) => !prevState)
  }

  const width = String(order).split("").length

  const renderIconButton = (direction: number) => (
    <IconButton
      name="expand"
      color="primary"
      fontSize={20}
      onClick={() => {
        setOrder((prevState) => (prevState ?? 0) + direction)

        onClick((order ?? 0) + direction, id)
      }}
    />
  )

  const renderContent = () => {
    if (order === 0) return <Icon name="infinity" onClick={onToggle} sx={{ cursor: "pointer" }} />

    return <Count onClick={onToggle}>{order}</Count>
  }

  return (
    <Container width={width} open={open} sx={sx} fullWidth={order === 0}>
      <ArrowUpButton open={open}>
        {renderIconButton(1)}
      </ArrowUpButton>
      {renderContent()}
      <ArrowDownButton open={open}>
        {renderIconButton(-1)}
      </ArrowDownButton>
    </Container>
  )
})