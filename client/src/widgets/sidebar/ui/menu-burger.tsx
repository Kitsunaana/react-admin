import { styled } from "@mui/material/styles"
import { Box, BoxProps } from "shared/ui/box"

const BurgerContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 40,
  width: 40,
}))

interface FirstLastLineProps extends BoxProps {
  open: boolean
}

const FirstLastLine = styled(
  ({ open, ...other }: FirstLastLineProps) => <Box {...other} />,
)(({ open, theme }) => ({
  height: 15,
  width: 20,
  transition: ".3s",
  position: "relative",
  "&::after": {
    transition: ".3s",
    content: "''",
    position: "absolute",
    width: "100%",
    height: "1px",
    backgroundColor: theme.palette.grey["600"],
    top: 0,
    right: 0,
    transform: open ? null : "rotate(45deg) translate(5px, 5px)",
  },
  "&::before": {
    transition: ".3s",
    content: "''",
    position: "absolute",
    width: "100%",
    height: "1px",
    backgroundColor: theme.palette.grey["600"],
    bottom: 0,
    right: 0,
    transform: open ? null : "rotate(-45deg) translate(5px, -5px)",
  },
}))

interface MiddleLineProps extends BoxProps {
  open: boolean
}

const MiddleLine = styled(
  ({ open, ...other }: MiddleLineProps) => <Box {...other} />,
)(({ open, theme }) => ({
  transition: ".3s",
  width: "100%",
  height: "1px",
  position: "relative",
  backgroundColor: theme.palette.grey["600"],
  top: "50%",
  transform: "translate(0, -50%)",
  opacity: open ? 1 : 0,
}))

interface MenuButtonProps {
  onClick: () => void
  open: boolean
}

export const MenuBurger = (props: MenuButtonProps) => {
  const { onClick, open } = props

  return (
    <BurgerContainer>
      <FirstLastLine open={open} onClick={onClick}>
        <MiddleLine open={open} />
      </FirstLastLine>
    </BurgerContainer>
  )
}
