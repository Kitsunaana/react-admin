import { Box, Divider } from "@mui/material"
import * as React from "react"
import {
  ReactNode, useMemo, useState,
} from "react"
import { List } from "./ui/List"
import { menu, menuBottom } from "./constants"
import { MenuBurger } from "./ui/MenuBurger"

export type SidebarLayoutProps = {
  content: ReactNode
  header: ReactNode
  bottom: ReactNode

  open: boolean
}

export const SidebarLayout = (props: SidebarLayoutProps) => {
  const {
    content,
    header,
    open,
    bottom,
  } = props

  return (
    <Box sx={{
      width: 1,
      height: 1,
      maxWidth: open ? 240 : 47,
      boxShadow: "0px 0px 5px 0px rgba(66,68,90,.37)",
      background: ({ background }) => background.sectionBackground,
      borderRadius: 2,
      transition: ".3s",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}
    >
      <Box sx={{
        maxWidth: 47,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      >
        {header}
      </Box>
      <Divider />
      <Box sx={{
        flexGrow: 1,
        overflowY: "auto",
        overflowX: "hidden",
      }}
      >
        {content}
      </Box>
      <Divider />
      {bottom}
    </Box>
  )
}

export const Sidebar = () => {
  const [open, setOpen] = useState(false)

  const handleOnToggle = () => {
    setOpen((prevState) => !prevState)
  }

  const memoizedContent = useMemo(() => menu.map((list) => (
    <List
      key={list.id}
      list={list}
      open={open}
    />
  )), [open])

  const memoizedBottom = useMemo(() => menuBottom.map((list) => (
    <List
      key={list.id}
      list={list}
      open={open}
    />
  )), [open])

  return (
    <SidebarLayout
      open={open}
      header={<MenuBurger open={open} onClick={handleOnToggle} />}
      content={memoizedContent}
      bottom={memoizedBottom}
    />
  )
}
