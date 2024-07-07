import * as React from "react"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket"
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu"
import { useState } from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { Divider } from "@mui/material"

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

  const handleClick = (listId: number) => {
    setSidebar((prevState) => {
      const newState = { ...prevState, listActive: listId }

      newState.listsExpanded.push(listId)

      return newState
    })
  }

  const collapseList = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, listId: number) => {
    event.stopPropagation()

    setSidebar((prevState) => {
      const newState = { ...prevState, listActive: listId }

      const findListId = prevState.listsExpanded.find((id) => id === listId)
      if (findListId !== undefined) newState.listsExpanded = newState.listsExpanded.filter((id) => id !== findListId)
      else newState.listsExpanded.push(listId)

      return newState
    })
  }

  return (
    <Box
      sx={{
        p: 2,
        height: 1,
      }}
    >
      <Box sx={{
        width: open ? 220 : 60,
        backgroundSize: "cover",
        height: 1,
        borderRadius: 2,
        boxShadow: "0px 0px 5px 0px rgba(66,68,90,.37)",
        backgroundImage: ({ palette }) => palette.background.paper,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
      >
        <Box sx={{ mt: 1 }}>
          <ListItemButton sx={{
            p: 0.5,
            borderLeft: "4px solid transparent",
          }}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="Магазин" />
          </ListItemButton>
        </Box>

        <Divider sx={{ my: 1 }} />

        <List sx={{
          p: 0, py: 0.5, flexGrow: 1,
        }}
        >
          {menu.map((list) => (
            <Box key={list.id}>
              <Box
                onClick={() => handleClick(list.id)}
                sx={{
                  backgroundColor: sidebar.listActive === list.id ? "rgba(25, 118, 210, 0.08)" : null,
                }}
              >
                <ListItemButton sx={{
                  p: 0.5,
                  borderLeft: sidebar.listActive === list.id ? "4px solid rgb(3, 169, 244)" : "4px solid transparent",
                  borderTopLeftRadius: 4,
                  borderBottomLeftRadius: sidebar.listsExpanded.includes(list.id) ? 0 : 4,
                }}
                >
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <ShoppingBasketIcon />
                  </ListItemIcon>
                  <ListItemText primary={list.caption} />

                  <Box
                    onClick={(event) => collapseList(event, list.id)}
                    sx={{
                      p: 0.8,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <KeyboardArrowDownIcon
                      sx={{
                        fontSize: 18,
                        transform: sidebar.listsExpanded.includes(list.id) ? "rotate(180deg)" : "rotate(0deg)",
                        transition: ".3s",
                      }}
                    />
                  </Box>
                </ListItemButton>
              </Box>
              <Box sx={{
                transition: "height .3s",
                borderLeft: sidebar.listActive === list.id ? "4px solid rgb(3, 169, 244)" : "4px solid transparent",
                borderBottomLeftRadius: 4,
                display: "flex",
                flexDirection: "column",
                ...(sidebar.listsExpanded.includes(list.id) ? {
                  height: list?.sublist.length * 40,
                  overflow: "hidden",
                } : {
                  height: 0,
                  overflow: "hidden",
                }),
              }}
              >
                {list?.sublist.map((sublist) => (
                  <ListItemButton
                    sx={{
                      p: 0.5,
                      pl: 2,
                      backgroundColor: sidebar.sublistActive === sublist.id ? "rgba(25, 118, 210, 0.08)" : null,
                    }}
                    key={sublist.id}
                  >
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <RestaurantMenuIcon />
                    </ListItemIcon>
                    <ListItemText primary={sublist.caption} />

                  </ListItemButton>
                ))}

              </Box>
            </Box>
          ))}
        </List>
        <Box>
          <List sx={{
            p: 0, py: 0.5, flexGrow: 1,
          }}
          >
            <Box>
              <Box
                sx={{
                }}
              >
                <ListItemButton sx={{
                  p: 0.5,
                  borderLeft: "4px solid transparent",
                  borderTopLeftRadius: 4,
                }}
                >
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <ShoppingBasketIcon />
                  </ListItemIcon>
                  <ListItemText primary="Настройки" />

                  <Box
                    sx={{
                      p: 0.8,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <KeyboardArrowDownIcon
                      sx={{
                        fontSize: 18,
                        transform: "rotate(0deg)",
                        transition: ".3s",
                      }}
                    />
                  </Box>
                </ListItemButton>
              </Box>
              <Box sx={{
                transition: "height .3s",
                borderLeft: "4px solid transparent",
                borderBottomLeftRadius: 4,
                display: "flex",
                flexDirection: "column",
              }}
              />
            </Box>
          </List>
          <Divider sx={{ my: 1 }} />
          <Box
            sx={{
              my: 1,
            }}
          >
            <ListItemButton sx={{
              p: 0.5,
              borderLeft: "4px solid transparent",
            }}
            >
              <ListItemIcon sx={{ minWidth: 30 }}>
                <ShoppingBasketIcon />
              </ListItemIcon>
              <ListItemText primary={open ? "Закрыть" : "Открыть"} />
            </ListItemButton>
          </Box>
        </Box>
      </Box>

    </Box>
  )
}
