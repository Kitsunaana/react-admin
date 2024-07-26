import * as React from "react"
import { Box } from "shared/ui/box"
import { Divider } from "shared/ui/divider"
import { useAppSelector } from "shared/lib/hooks"
import { RootState } from "app/providers/store"
import { useDispatch } from "react-redux"
import { toggle } from "../model/sidebar-slice"
import { MenuList } from "../types"
import { MenuBurger } from "./menu-burger"
import { List } from "./List/list"

interface SidebarProps {
  open?: boolean

  menu: MenuList[],
  menuBottom: MenuList[]
}

export const Sidebar = (props: SidebarProps) => {
  const { open: openProps, menuBottom, menu } = props

  const open = openProps ?? useAppSelector((state: RootState) => state.sidebar.open)
  const dispatch = useDispatch()

  const onToggle = (open: boolean) => dispatch(toggle({ open }))

  return (
    <Box
      flex
      sx={{
        width: 1,
        height: 1,
        maxWidth: open ? 240 : 47,
        boxShadow: "0px 0px 5px 0px rgba(66,68,90,.37)",
        background: ({ background }) => background.sectionBackground,
        borderRadius: 2,
        transition: "max-width .3s",
        overflow: "hidden",
      }}
    >
      <Box flex center sx={{ maxWidth: 47 }}>
        <MenuBurger open={open} onClick={onToggle} />
      </Box>
      <Divider />
      <Box
        grow
        sx={{
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
