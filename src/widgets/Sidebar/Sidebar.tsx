import { Divider } from "@mui/material"
import * as React from "react"
import { useState } from "react"
import { List } from "./ui/List"
import { MenuBurger } from "./ui/MenuBurger"
import { MenuList } from "./types"
import { Box } from "../../shared/ui/Box"

interface SidebarProps {
  open?: boolean

  menu: MenuList[],
  menuBottom: MenuList[]
}

export const Sidebar = (props: SidebarProps) => {
  const { open: openProps, menuBottom, menu } = props

  const [open, setOpen] = useState(openProps ?? true)

  const handleOnToggle = () => {
    setOpen((prevState) => !prevState)
  }

  return (
    <Box flex sx={{
      width: 1,
      height: 1,
      maxWidth: open ? 240 : 47,
      boxShadow: "0px 0px 5px 0px rgba(66,68,90,.37)",
      background: ({ background }) => background.sectionBackground,
      borderRadius: 2,
      transition: ".3s",
      overflow: "hidden",
    }}
    >
      <Box flex center sx={{ maxWidth: 47 }}>
        <MenuBurger open={open} onClick={handleOnToggle} />
      </Box>
      <Divider />
      <Box grow sx={{
        overflowY: "auto",
        overflowX: "hidden",
      }}
      >
        {menu.map((list) => (
          <List
            key={list.id}
            list={list}
            open={open}
          />
        ))}
      </Box>
      <Divider />
      {menuBottom.map((list) => (
        <List
          key={list.id}
          list={list}
          open={open}
        />
      ))}
    </Box>
  )
}
