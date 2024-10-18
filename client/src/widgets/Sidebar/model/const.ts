export const menu = [
  {
    id: 0,
    name: "catalog",
    caption: "Каталог",
    icon: "catalog",
    sublist: [
      {
        id: 1,
        name: "goods",
        caption: "Товары",
        icon: "goods",
        disabled: true,
      },
      {
        id: 2,
        name: "additions",
        caption: "Дополнения",
        disabled: true,
        icon: "additional",
      },
    ],
  },
  {
    id: 8,
    name: "stopList",
    caption: "Стоп-лист",
    icon: "stopList",
    sublist: [],
  },
  {
    id: 9,
    name: "pricing",
    caption: "Ценообразование",
    disabled: true,
    icon: "pricing",
    sublist: [
      {
        id: 10,
        name: "priceList",
        caption: "Прайс-лист",
        disabled: true,
        icon: "priceList",
      },
      {
        id: 12,
        name: "promoCode",
        caption: "Промокоды",
        icon: "promoCode",
        disabled: true,
      },
    ],
  },
  {
    id: 13,
    name: "order",
    caption: "Заказы",
    icon: "orders",
    disabled: true,
    sublist: [
      {
        id: 14,
        name: "newOrder",
        caption: "Новый заказ",
        icon: "newOrder",
        disabled: true,
      },
    ],
  },
  {
    id: 16,
    name: "clients",
    caption: "Клиенты",
    icon: "clients",
    disabled: true,
    sublist: [
      {
        id: 17,
        name: "analysis",
        caption: "Анализ",
        disabled: true,
        icon: "analysis",
      },
      {
        id: 18,
        name: "chat",
        caption: "Чаты",
        disabled: true,
        icon: "chat",
      },
      {
        id: 19,
        name: "favorite",
        caption: "Избранное",
        disabled: true,
        icon: "favorite",
      },
    ],
  },
]

export const menuBottom = [
  {
    id: 30,
    name: "users",
    icon: "users",
    caption: "Пользователи",
    disabled: true,
    sublist: [
      {
        id: 31,
        name: "settings",
        icon: "settings",
        caption: "Настройки",
      },
    ],
  },
]
