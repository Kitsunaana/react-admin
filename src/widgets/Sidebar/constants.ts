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
    id: 3,
    name: "warehouses",
    caption: "Склады",
    icon: "warehouses",
    sublist: [
      {
        id: 4,
        name: "coming",
        caption: "Приход",
        icon: "coming",
      },
      {
        id: 5,
        name: "moving",
        caption: "Размещение",
        icon: "moving",
      },
      {
        id: 6,
        name: "consumption",
        caption: "Расход",
        icon: "consumption",
      },
      {
        id: 7,
        name: "document",
        caption: "Документы",
        disabled: true,
        icon: "document",
      },
    ],
  },
  {
    id: 8,
    name: "stop-ist",
    caption: "Стоп-лист",
    icon: "stopList",
    sublist: [],
  },
  {
    id: 9,
    name: "pricing",
    caption: "Ценообразование",
    icon: "pricing",
    sublist: [
      {
        id: 10,
        name: "price-list",
        caption: "Прайс-лист",
        disabled: true,
        icon: "priceList",
      },
      {
        id: 11,
        name: "price-list-delivery",
        caption: "Прайс-лист доставки",
        disabled: true,
        icon: "priceListDelivery",
      },
      {
        id: 12,
        name: "promo-code",
        caption: "Промокоды",
        icon: "promoCode",
      },
    ],
  },
  {
    id: 13,
    name: "order",
    caption: "Заказы",
    icon: "orders",
    sublist: [
      {
        id: 14,
        name: "new-order",
        caption: "Новый заказ",
        icon: "newOrder",
      },
      {
        id: 15,
        name: "document",
        caption: "Документы",
        icon: "document",
      },
    ],
  },
  {
    id: 16,
    name: "clients",
    caption: "Клиенты",
    icon: "clients",
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
      {
        id: 20,
        name: "delivery-addresses",
        caption: "Адреса доставки",
        disabled: true,
        icon: "deliveryAddresses",
      },
    ],
  },
  {
    id: 21,
    name: "bot",
    caption: "Бот",
    icon: "bot",
    sublist: [],
  },
  {
    id: 22,
    name: "departments",
    caption: "Отделы",
    icon: "departments",
    sublist: [
      {
        id: 23,
        name: "groups",
        caption: "Группы",
        disabled: true,
        icon: "groups",
      },
    ],
  },
  {
    id: 24,
    name: "marketing",
    caption: "Маркетинг",
    icon: "marketing",
    sublist: [],
  },
]

export const menuBottom = [
  {
    id: 25,
    name: "service",
    icon: "service",
    caption: "Сервис",
    sublist: [
      {
        id: 26,
        name: "system-scripts",
        icon: "systemScripts",
        caption: "Системные скрипты",
      },
      {
        id: 27,
        name: "location",
        icon: "location",
        caption: "Локация",
      },
      {
        id: 28,
        name: "import",
        icon: "import",
        caption: "Испорт",
      },
      {
        id: 29,
        name: "updates",
        icon: "updates",
        caption: "Обновления",
      },
    ],
  },
  {
    id: 30,
    name: "users",
    icon: "users",
    caption: "Пользователи",
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
