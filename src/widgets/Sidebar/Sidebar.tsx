import * as React from "react"
import { useCallback, useState } from "react"
import { Layout } from "./ui/Layout"
import { MenuList } from "./ui/MenuList"
import { SidebarHeader } from "./ui/SidebarHeader"
import { menu, menuBottom } from "./constants"

export const Sidebar = () => {
  const [open, setOpen] = useState(true)
  const [sidebar, setSidebar] = useState({
    listActive: 0,
    sublistActive: null,
    listsExpanded: [0],
    menu,
    menuBottom,
  })

  const onClose = useCallback(({ listId, sublistId }: { listId: number, sublistId?: number }) => {
    setSidebar((prevState) => {
      const newState = { ...prevState, listActive: listId, sublistActive: sublistId }

      const find = sidebar.menu.find((list) => list.id === listId)

      if (find !== undefined) {
        const isExpandable = find?.sublist?.length > 0

        if (isExpandable) newState.listsExpanded.push(listId)
      }

      return newState
    })
  }, [])

  const onToggleExpand = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>, listId: number) => {
    event.stopPropagation()

    setSidebar((prevState) => {
      const newState = { ...prevState }

      const findListId = prevState.listsExpanded.find((id) => id === listId)
      if (findListId !== undefined) newState.listsExpanded = newState.listsExpanded.filter((id) => id !== findListId)
      else newState.listsExpanded.push(listId)

      return newState
    })
  }, [])

  const onToggle = useCallback(() => {
    setOpen((prevState) => !prevState)
  }, [])

  return (
    <Layout
      open={open}
      header={(
        <SidebarHeader
          onToggle={onToggle}
          open={open}
        />
      )}
      content={menu.map((list) => (
        <MenuList
          open={open}
          key={list.id}
          id={list.id}
          icon={list.icon}
          caption={list.caption}
          name={list.name}
          isActive={sidebar.listActive === list.id}
          isExpanded={sidebar.listsExpanded.includes(list.id)}
          onClose={onClose}
          onToggleExpand={onToggleExpand}
          options={list.sublist ?? []}
          listActive={sidebar.listActive}
          sublistActive={sidebar.sublistActive}
        />
      ))}
      footer={sidebar.menuBottom.map((list) => (
        <MenuList
          open={open}
          key={list.id}
          id={list.id}
          icon={list.icon}
          caption={list.caption}
          name={list.name}
          isActive={sidebar.listActive === list.id}
          isExpanded={sidebar.listsExpanded.includes(list.id)}
          onClose={onClose}
          onToggleExpand={onToggleExpand}
          options={list.sublist ?? []}
          listActive={sidebar.listActive}
          sublistActive={sidebar.sublistActive}
        />
      ))}
    />
  )
}
