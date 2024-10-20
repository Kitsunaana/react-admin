import { styled } from "@mui/material/styles"
import { observer } from "mobx-react-lite"
import { Box, BoxProps } from "shared/ui/box"
import { Divider } from "shared/ui/divider"
import { sidebarStore } from "../model/sidebar-store"
import { MenuList } from "../model/types"
import { List } from "./list/list"
import { MenuBurger } from "./menu-burger"

interface ContainerProps extends BoxProps {
  open: boolean
}

const Container = styled(
  ({ open, ...other }: ContainerProps) => <Box {...other} />,
)(({ theme: { background }, open }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  maxWidth: open ? 240 : 47,
  boxShadow: "0px 0px 5px 0px rgba(66,68,90,.37)",
  background: background.sectionBackground,
  borderRadius: 12,
  transition: "max-width .3s",
  overflow: "hidden",
}))

const MenuBurgerContainer = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  maxWidth: 47,
}))

const ListContainer = styled("div")(() => ({
  overflowY: "auto",
  overflowX: "hidden",
  flexGrow: 1,
}))

interface SidebarProps {
  open?: boolean
  menu: MenuList[],
  menuBottom: MenuList[]
}

export const Sidebar = observer((props: SidebarProps) => {
  const {
    menu,
    menuBottom,
    open: openProps,
  } = props

  const open = openProps ?? sidebarStore.open

  return (
    <Container open={open}>
      <MenuBurgerContainer>
        <MenuBurger
          open={open}
          onClick={sidebarStore.onToggle}
        />
      </MenuBurgerContainer>
      <Divider />
      <ListContainer>
        {menu.map((list) => (
          <List
            key={list.id}
            list={list}
            open={open}
          />
        ))}
      </ListContainer>
      <Divider />
      {menuBottom.map((list) => (
        <List
          key={list.id}
          list={list}
          open={open}
        />
      ))}
    </Container>
  )
})
