import * as React from "react"
import { Box } from "shared/ui/box"

interface MenuButtonProps {
  onClick: (open: boolean) => void
  open: boolean
}

export const MenuBurger = (props: MenuButtonProps) => {
  const { open, onClick } = props

  return (

    <Box
      flex
      center
      sx={{
        height: 40,
        width: 40,
      }}
    >
      <Box
        onClick={() => onClick(!open)}
        sx={{
          height: 15,
          width: 20,
          transition: ".3s",
          position: "relative",
          "&::after": {
            transition: ".3s",
            content: "''",
            position: "absolute",
            width: 1,
            height: "1px",
            backgroundColor: ({ palette }) => palette.grey["600"],
            top: 0,
            right: 0,
            transform: !open ? "rotate(45deg) translate(5px, 5px)" : null,
          },
          "&::before": {
            transition: ".3s",
            content: "''",
            position: "absolute",
            width: 1,
            height: "1px",
            backgroundColor: ({ palette }) => palette.grey["600"],
            bottom: 0,
            right: 0,
            transform: !open ? "rotate(-45deg) translate(5px, -5px)" : null,
          },
        }}
      >
        <Box sx={{
          transition: ".3s",
          width: 1,
          height: "1px",
          position: "relative",
          backgroundColor: ({ palette }) => palette.grey["600"],
          top: "50%",
          transform: "translate(0, -50%)",
          opacity: !open ? 0 : 1,
        }}
        />
      </Box>
    </Box>
  )
}
