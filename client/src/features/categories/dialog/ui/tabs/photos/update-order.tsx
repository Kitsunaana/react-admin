import { memo, useEffect, useState } from "react"
import { Box, BoxProps } from "shared/ui/box"
import { SxProps, Theme } from "@mui/material"
import styled from "styled-components"
import { Icon } from "shared/ui/icon"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Text } from "shared/ui/text"
import { useLang } from "shared/context/lang"

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
  id: string
  sx?: SxProps<Theme>
  order: number | null
  onClick: (order: number, id: string) => void
}

export const UpdateOrder = memo((props: UpdateOrderProps) => {
  const {
    id,
    sx,
    onClick,
    order: orderProps,
  } = props

  const [open, setOpen] = useState(false)
  const [order, setOrder] = useState(orderProps ?? 0)
  const langBase = useLang()

  useEffect(() => { setOrder(orderProps ?? 0) }, [orderProps])

  const onToggle = () => {
    setOpen((prevState) => !prevState)
  }

  const width = String(order).split("").length

  const renderIconButton = (direction: number) => (
    <IconButton
      help={{
        title: (
          <Text
            onlyText
            langBase={`${langBase}.forms`}
            name={direction === 1 ? "moveUp" : "moveDown"}
          />
        ),
      }}
      name="expand"
      sx={{
        color: ({ palette }) => palette.primary[palette.mode === "dark" ? "main" : "light"],
      }}
      fontSize={20}
      onClick={() => {
        setOrder((prevState) => (prevState ?? 0) + direction)
        onClick((order ?? 0) + direction, id)
      }}
    />
  )

  const renderContent = () => {
    if (order === 0) {
      return (
        <Icon
          name="infinity"
          onClick={onToggle}
          sx={{ cursor: "pointer" }}
          help={{
            title: (
              <Text
                onlyText
                langBase={`${langBase}.forms`}
                name="displayAccordingCreationDate"
              />
            ),
          }}
        />
      )
    }

    return <Count onClick={onToggle}>{order}</Count>
  }

  return (
    <Container
      fullWidth={order === 0}
      width={width}
      open={open}
      sx={sx}
    >
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
