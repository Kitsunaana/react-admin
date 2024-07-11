import * as React from "react"
import { memo, useCallback, useState } from "react"
import { useSelector } from "react-redux"
import { Layout } from "./ui/Layout"
import { MenuList } from "./ui/MenuList"
import { SidebarHeader } from "./ui/SidebarHeader"
import { RootState } from "../../app/store"
import { MenuList as IMenuList } from "./model/sidebarSlice"

interface SidebarContentProps {
  open: boolean
}

const shallowEqual = (prev, next) => {
  const keysPrev = Object.keys(prev)
  const keysNext = Object.keys(next)

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keysPrev) {
    if (prev[key] !== next[key]) {
      console.log({ [`${key}-prev`]: prev[key], [`${key}-next`]: next[key] })

      return false
    }
  }

  return true
}

export const SidebarContent = memo((props: SidebarContentProps) => {
  const {
    open,
  } = props
  console.log(23)

  const menu = useSelector((state: RootState) => state.sidebar.menu)
  const listActive = useSelector((state: RootState) => state.sidebar.listActive)
  // const listsExpanded = useSelector((state: RootState) => state.sidebar.listsExpanded)

  return (
    <>
      {menu.map((list) => (
        <MenuList
          open={open}
          key={list.id}
          {...list}
          isActive={listActive === list.id}
          // isExpanded={listsExpanded.includes(list.id)}
        />
      ))}
    </>
  )
})

export const Sidebar = () => {
  const [open, setOpen] = useState(true)

  // const menu = useSelector((state: RootState) => state.sidebar.menu)
  // const menuBottom = useSelector((state: RootState) => state.sidebar.menuBottom)

  const onToggle = useCallback(() => {
    setOpen((prevState) => !prevState)
  }, [])

  // const { listActive, listsExpanded } = useSelector((state: RootState) => state.sidebar)

  return (
    <Layout
      open={open}
      header={(
        <SidebarHeader
          onToggle={onToggle}
          open={open}
        />
      )}
      content={(
        <SidebarContent
          open={open}
          // menu={menu}
          // listActive={listActive}
          // listsExpanded={listsExpanded}
        />
      )}
      /* content={menu.map((list) => (
        <MenuList
          open={open}
          key={list.id}
          {...list}
          isActive={listActive === list.id}
          isExpanded={listsExpanded.includes(list.id)}
        />
      ))} */
      /* footer={menuBottom.map((list) => (
        <MenuList
          open={open}
          key={list.id}
          {...list}
          isActive={listActive === list.id}
          isExpanded={listsExpanded.includes(list.id)}
        />
      ))} */
      footer={<div />}
    />
  )
}
