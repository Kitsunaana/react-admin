import * as React from "react"
import { useCallback, useState } from "react"
import { Layout } from "./ui/Layout"
import { MenuItem } from "./ui/MenuItem"
import { MenuList } from "./ui/MenuList"

const menu = [
  {
    id: 0,
    name: "catalog",
    caption: "Каталог",
    icon: "",
    sublist: [
      {
        id: 0,
        name: "goods",
        caption: "Товары",
        icon: "",
      },
      {
        id: 1,
        name: "additions",
        caption: "Дополнения",
        icon: "",
      },
    ],
  },
  {
    id: 1,
    name: "order",
    caption: "Склады",
    icon: "",
    sublist: [
      {
        id: 0,
        name: "new-order",
        caption: "Новый заказ",
        icon: "",
      },
    ],
  },
  {
    id: 2,
    name: "order",
    caption: "Заказы",
    icon: "",
    sublist: [
      {
        id: 0,
        name: "new-order",
        caption: "Новый заказ",
        icon: "",
      },
    ],
  },
  {
    id: 3,
    name: "order",
    caption: "Заказы",
    icon: "",
    sublist: [
      {
        id: 0,
        name: "new-order",
        caption: "Новый заказ",
        icon: "",
      },
    ],
  },
  {
    id: 4,
    name: "order",
    caption: "Заказы",
    icon: "",
    sublist: [
      {
        id: 0,
        name: "new-order",
        caption: "Новый заказ",
        icon: "",
      },
    ],
  },
  {
    id: 5,
    name: "order",
    caption: "Заказы",
    icon: "",
    sublist: [
      {
        id: 0,
        name: "new-order",
        caption: "Новый заказ",
        icon: "",
      },
    ],
  },
  {
    id: 6,
    name: "order",
    caption: "Заказы",
    icon: "",
    sublist: [
      {
        id: 0,
        name: "new-order",
        caption: "Новый заказ",
        icon: "",
      },
    ],
  },
  {
    id: 7,
    name: "order",
    caption: "Заказы",
    icon: "",
    sublist: [
      {
        id: 0,
        name: "new-order",
        caption: "Новый заказ",
        icon: "",
      },
    ],
  },
  {
    id: 8,
    name: "order",
    caption: "Заказы",
    icon: "",
    sublist: [
      {
        id: 0,
        name: "new-order",
        caption: "Новый заказ",
        icon: "",
      },
    ],
  },
]

export const Sidebar = () => {
  const [open, setOpen] = useState(true)
  const [sidebar, setSidebar] = useState({
    listActive: 0,
    sublistActive: null,
    listsExpanded: [0],
  })

  const onClose = useCallback((listId: number) => {
    setSidebar((prevState) => {
      const newState = { ...prevState, listActive: listId }

      newState.listsExpanded.push(listId)

      return newState
    })
  }, [])

  const onExpand = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>, listId: number) => {
    event.stopPropagation()

    setSidebar((prevState) => {
      const newState = { ...prevState, listActive: listId }

      const findListId = prevState.listsExpanded.find((id) => id === listId)
      if (findListId !== undefined) newState.listsExpanded = newState.listsExpanded.filter((id) => id !== findListId)
      else newState.listsExpanded.push(listId)

      return newState
    })
  }, [])

  const onOpen = () => {
    setOpen((prevState) => !prevState)
  }

  return (
    <Layout
      open={open}
      header={<MenuItem caption="Магазин" />}
      content={(
        <>
          {menu.map((list) => (
            <MenuList
              key={list.id}
              id={list.id}
              caption={list.caption}
              name={list.name}
              isActive={sidebar.listActive === list.id}
              isExpanded={sidebar.listsExpanded.includes(list.id)}
              onClose={onClose}
              onExpand={onExpand}
              options={list.sublist}
            />
          ))}
        </>
      )}
      footer={<MenuItem caption="Закрыть" onClick={onOpen} />}
    />
  )
}
