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
    icon: "catalog",
    sublist: [
      {
        id: 0,
        name: "goods",
        caption: "Товары",
        icon: "goods",
      },
      {
        id: 1,
        name: "additions",
        caption: "Дополнения",
        disabled: true,
        icon: "additional",
      },
    ],
  },
  {
    id: 2,
    name: "order",
    caption: "Склады",
    icon: "warehouses",
    sublist: [
      {
        id: 0,
        name: "new-order",
        caption: "Приход",
        icon: "coming",
      },
      {
        id: 0,
        name: "new-order",
        caption: "Размещение",
        icon: "moving",
      },
      {
        id: 0,
        name: "new-order",
        caption: "Расход",
        icon: "consumption",
      },
      {
        id: 0,
        name: "new-order",
        caption: "Документы",
        disabled: true,
        icon: "document",
      },
    ],
  },
  {
    id: 3,
    name: "order",
    caption: "Стоп-лист",
    icon: "stopList",
  },
  {
    id: 4,
    name: "order",
    caption: "Ценообразование",
    icon: "pricing",
    sublist: [
      {
        id: 0,
        name: "new-order",
        caption: "Прайс-лист",
        disabled: true,
        icon: "priceList",
      },
      {
        id: 0,
        name: "new-order",
        caption: "Прайс-лист доставки",
        disabled: true,
        icon: "priceListDelivery",
      },
      {
        id: 0,
        name: "new-order",
        caption: "Промокоды",
        icon: "promoCode",
      },
    ],
  },
  {
    id: 5,
    name: "order",
    caption: "Заказы",
    icon: "orders",
    sublist: [
      {
        id: 0,
        name: "new-order",
        caption: "Новый заказ",
        icon: "newOrder",
      },
      {
        id: 0,
        name: "new-order",
        caption: "Документы",
        icon: "document",
      },
    ],
  },
  {
    id: 6,
    name: "order",
    caption: "Клиенты",
    icon: "clients",
    sublist: [
      {
        id: 0,
        name: "new-order",
        caption: "Анализ",
        disabled: true,
        icon: "analysis",
      },
      {
        id: 0,
        name: "new-order",
        caption: "Чаты",
        disabled: true,
        icon: "chat",
      },
      {
        id: 0,
        name: "new-order",
        caption: "Избранное",
        disabled: true,
        icon: "favorite",
      },
      {
        id: 0,
        name: "new-order",
        caption: "Адреса доставки",
        disabled: true,
        icon: "deliveryAddresses",
      },
    ],
  },
  {
    id: 7,
    name: "order",
    caption: "Бот",
    icon: "bot",
  },
  {
    id: 8,
    name: "order",
    caption: "Отделы",
    icon: "departments",
    sublist: [
      {
        id: 0,
        name: "new-order",
        caption: "Группы",
        disabled: true,
        icon: "groups",
      },
    ],
  },
  {
    id: 9,
    name: "order",
    caption: "Маркетинг",
    icon: "marketing",
  },
]

export const Sidebar = () => {
  const [open, setOpen] = useState(false)
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

  const onToggle = () => {
    setOpen((prevState) => !prevState)
  }

  return (
    <Layout
      open={open}
      header={(
        <MenuItem
          icon=""
          open={open}
          caption="Магазин"
        />
      )}
      content={(
        <>
          {menu.map((list) => (
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
              onExpand={onExpand}
              options={list.sublist ?? []}
            />
          ))}
        </>
      )}
      footer={(
        <MenuItem
          icon=""
          open={open}
          caption="Закрыть"
          onClick={onToggle}
        />
    )}
    />
  )
}
