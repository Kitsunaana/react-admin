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
        disabled: true,
        icon: "",
      },
    ],
  },
  {
    id: 2,
    name: "order",
    caption: "Склады",
    icon: "",
    sublist: [
      {
        id: 0,
        name: "new-order",
        caption: "Приход",
        icon: "",
      },
      {
        id: 0,
        name: "new-order",
        caption: "Размещение",
        icon: "",
      },
      {
        id: 0,
        name: "new-order",
        caption: "Расход",
        icon: "",
      },
      {
        id: 0,
        name: "new-order",
        caption: "Документы",
        disabled: true,
        icon: "",
      },
    ],
  },
  {
    id: 3,
    name: "order",
    caption: "Стоп-лист",
    icon: "",
  },
  {
    id: 4,
    name: "order",
    caption: "Ценообразование",
    icon: "",
    sublist: [
      {
        id: 0,
        name: "new-order",
        caption: "Прайс-лист",
        disabled: true,
        icon: "",
      },
      {
        id: 0,
        name: "new-order",
        caption: "Прайс-лист доставки",
        disabled: true,
        icon: "",
      },
      {
        id: 0,
        name: "new-order",
        caption: "Промокоды",
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
      {
        id: 0,
        name: "new-order",
        caption: "Документы",
        icon: "",
      },
    ],
  },
  {
    id: 6,
    name: "order",
    caption: "Клиенты",
    icon: "",
    sublist: [
      {
        id: 0,
        name: "new-order",
        caption: "Анализ",
        disabled: true,
        icon: "",
      },
      {
        id: 0,
        name: "new-order",
        caption: "Чаты",
        disabled: true,
        icon: "",
      },
      {
        id: 0,
        name: "new-order",
        caption: "Избранное",
        disabled: true,
        icon: "",
      },
      {
        id: 0,
        name: "new-order",
        caption: "Адреса доставки",
        disabled: true,
        icon: "",
      },
    ],
  },
  {
    id: 7,
    name: "order",
    caption: "Бот",
    icon: "",
  },
  {
    id: 8,
    name: "order",
    caption: "Отделы",
    icon: "",
    sublist: [
      {
        id: 0,
        name: "new-order",
        caption: "Группы",
        disabled: true,
        icon: "",
      },
    ],
  },
  {
    id: 9,
    name: "order",
    caption: "Маркетинг",
    icon: "",
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
      header={<MenuItem open={open} caption="Магазин" />}
      content={(
        <>
          {menu.map((list) => (
            <MenuList
              open={open}
              key={list.id}
              id={list.id}
              caption={list.caption}
              name={list.name}
              isActive={sidebar.listActive === list.id}
              isExpanded={sidebar.listsExpanded.includes(list.id)}
              onClose={onClose}
              onExpand={onExpand}
              options={list.sublist ?? []}
            />
          ))}
        </>
      )}
      footer={<MenuItem open={open} caption="Закрыть" onClick={onOpen} />}
    />
  )
}
