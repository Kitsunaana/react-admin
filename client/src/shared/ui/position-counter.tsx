import { memo, useState } from "react"
import { Box, BoxProps } from "shared/ui/box"
import { IconButtonBase } from "shared/ui/buttons/icon-button-base"
import { SxProps, Theme } from "@mui/material"
import styled from "styled-components"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import { useLang } from "shared/context/lang"
import { Text } from "shared/ui/text"

interface ContainerProps extends BoxProps {
  width: number
  open: boolean
}

const Count = styled(Box)<BoxProps>`
  position: relative;
  z-index: 0;
  cursor: pointer;
`

const ArrowUpButton = styled(Box)<Omit<ContainerProps, "width">>`
  transition: .3s;
  transform: rotate(180deg);
  position: absolute;
  z-index: 2;
    
  ${({ open }) => ({
    left: open ? "-5px" : "0px",
    opacity: open ? 1 : 0,
    visibility: open ? "visible" : "hidden",
  })}
`

const ArrowDownButton = styled(Box)<Omit<ContainerProps, "width">>`
  transition: .3s;
  position: absolute;
  z-index: 2;

  ${({ open }) => ({
    right: open ? "-5px" : "0px",
    opacity: open ? 1 : 0,
    visibility: open ? "visible" : "hidden",
  })}
`

const Container = styled((props: ContainerProps) => <Box flex ai row gap jc {...props} />)`
  transition: .3s;
  margin: 0 4px;
  position: relative;
  min-width: ${({ open, width }) => (open ? `${width * 10 + 60}px` : "24px")};
`

interface PositionProps {
  order: number | null
  sx?: SxProps<Theme>
  id: number
  updatePositionOptions: (id: number) => UseMutationOptions<any, any, number, any>
}

export const Position = memo((props: PositionProps) => {
  const {
    id,
    sx,
    updatePositionOptions,
    order: orderProps,
  } = props

  const [open, setOpen] = useState(false)
  const [order, setOrder] = useState(orderProps ?? 0)
  const [direction, setDirection] = useState(1)
  const langBase = useLang()

  const onToggle = () => setOpen((prevState) => !prevState)

  const { isPending, mutate } = useMutation({
    ...updatePositionOptions(id),
    onSuccess: () => {
      setOrder((prevState) => prevState + direction)
    },
  })

  const width = String(order).split("").length

  const renderIconButton = (direction: number) => (
    <IconButtonBase
      disabled={isPending}
      name="expand"
      color="primary"
      fontSize={20}
      onClick={() => {
        setDirection(direction)
        mutate(order + direction)
      }}
    />
  )

  return (
    <Container width={width} open={open} sx={sx}>
      <ArrowUpButton
        open={open}
        help={{
          title: (
            <Text
              langBase={langBase}
              name="moveUp"
            />
          ),
        }}
      >
        {renderIconButton(1)}
      </ArrowUpButton>
      <Count onClick={onToggle}>{order}</Count>
      <ArrowDownButton
        open={open}
        help={{
          title: (
            <Text
              langBase={langBase}
              name="moveDown"
            />
          ),
        }}
      >
        {renderIconButton(-1)}
      </ArrowDownButton>
    </Container>
  )
})
