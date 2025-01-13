import { memo } from "react"
import { Box, BoxProps } from "shared/ui/box"
import { IconButtonBase } from "shared/ui/buttons/icon-button-base"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import styled from "styled-components"
import { useToggle } from "shared/hooks/use-toggle"

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

export const Position = memo(({
  order,
  isLoading, onUpdate,
}: {
  order: number
  isLoading: boolean
  onUpdate: (order: number) => void
}) => {
  const [open, onToggle] = useToggle()

  const width = order === 0 ? 1.75 : String(order).split("").length

  const handleMoveUp = () => onUpdate(order + 1)
  const handleMoveDown = () => onUpdate(order - 1)

  return (
    <Container width={width} open={open}>
      <ArrowUpButton
        open={open}
        help={{
          title: <Text name="moveUp" />,
        }}
      >
        <IconButtonBase
          disabled={isLoading}
          name="expand"
          color="primary"
          fontSize={20}
          onClick={handleMoveUp}
        />
      </ArrowUpButton>
      {
        order === 0
          ? <Icon name="infinity" onClick={onToggle} />
          : <Count onClick={onToggle}>{order}</Count>
      }
      <ArrowDownButton
        open={open}
        help={{
          title: <Text name="moveDown" />,
        }}
      >
        <IconButtonBase
          disabled={isLoading}
          name="expand"
          color="primary"
          fontSize={20}
          onClick={handleMoveDown}
        />
      </ArrowDownButton>
    </Container>
  )
})
