import { Box, BoxProps } from "shared/ui/box"
import styled from "styled-components"

interface ContainerProps extends BoxProps {
  width: number
  open: boolean
  fullWidth: boolean
}

export const Count = styled(Box)<BoxProps>`
  && {
    position: relative;
    z-index: 0;
    cursor: pointer;
  }
`

export const ArrowUpButton = styled(Box)<Omit<ContainerProps, "width" | "fullWidth">>`
 && {
   transition: .3s;
   transform: rotate(180deg);
   position: absolute;
   z-index: 2;
   left: ${({ open }) => (open ? "-5px" : "0px")};
   opacity: ${({ open }) => (open ? 1 : 0)};
   visibility: ${({ open }) => (open ? "visible" : "hidden")};
 }
`

export const ArrowDownButton = styled(Box)<Omit<ContainerProps, "width" | "fullWidth">>`
  transition: .3s;
  position: absolute;
  z-index: 2;
  right: ${({ open }) => (open ? "-5px" : "0px")};
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
`

export const Container = styled((props: ContainerProps) => {
  const { fullWidth, ...other } = props
  return <Box flex ai row gap jc {...other} />
})`
  && {
    transition: .3s;
    margin: 0 4px;
    position: relative;
    min-width: ${({ open, width, fullWidth }) => (open ? `${width * 10 + (fullWidth ? 60 : 45)}px` : "24px")};
    width: unset;
  }
`
