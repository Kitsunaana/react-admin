import {
  IconButton, Menu, MenuItem,
} from "@mui/material"
import { Icon } from "shared/ui/Icon"
import React, {
  MouseEvent,
} from "react"
import { Text } from "shared/ui/Text"

import { Divider } from "shared/ui/Divider"
import { CardProduct } from "entities/goods"
import { dispatch } from "shared/lib/event"
import { Backdrop } from "shared/ui/Backdrop"
import { Bottom } from "pages/Goods/ui/Bottom"
import { Header } from "pages/Goods/ui/Header"
import { Table } from "shared/ui/Table"
import { DialogCreate } from "features/goods/create/ui/DialogCreate"
import { DialogEdit } from "features/goods/edit/ui/DialogEdit"

export const ActionButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)

    dispatch("backdrop", { isActive: open })
  }

  const handleClose = (event: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLLIElement>) => {
    event.stopPropagation()

    setAnchorEl(null)

    dispatch("backdrop", { isActive: open })
  }

  const menu = [
    // { type: "action", caption: "Редактировать", icon: "edit" },
    { type: "divider" },
    { type: "action", caption: "Дополнения", icon: "additional" },
    { type: "action", caption: "Сделать копию товара", icon: "copy" },
    { type: "action", caption: "Добавить в стоп-лист", icon: "stopList" },
    { type: "divider" },
    { type: "action", caption: "Удалить", icon: "delete" },
  ]

  return (
    <div>
      <IconButton
        sx={{ p: 0.25, borderRadius: 1 }}
        onClick={(event) => {
          event.stopPropagation()

          handleClick(event)
        }}
      >
        <Icon
          sx={{ fontSize: 28, color: ({ palette }) => palette.primary.main }}
          name="actions"
        />
      </IconButton>
      <Menu
        sx={{
          "& .MuiList-root": {
            mx: 1,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={(event) => {
            handleClose(event)

            dispatch("dialog.goods.edit" as any, { id: 123 })
          }}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            borderRadius: 1,
          }}
        >
          <Text caption="Редактировать" />
          <Icon name="edit" sx={{ color: ({ palette }) => palette.primary.main, fontSize: 20 }} />
        </MenuItem>
        {menu.map((action, index) => {
          if (action.type === "divider") return <Divider key={index} />

          if (action.type === "action") {
            return (
              <MenuItem
                key={index}
                onClick={handleClose}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 1,
                  borderRadius: 1,
                }}
              >
                <Text caption={action.caption} />
                <Icon name={action.icon ?? ""} sx={{ color: ({ palette }) => palette.primary.main, fontSize: 20 }} />
              </MenuItem>
            )
          }
        })}
      </Menu>
    </div>
  )
}

const GoodsPage = () => (
  <>
    <Table
      header={<Header />}
      content={new Array(20).fill(20).map((_, index) => index).map((item) => (
        <CardProduct key={item} />
      ))}
      bottom={<Bottom />}
    />
    <Backdrop />
    <DialogCreate />
    <DialogEdit />
  </>
)

export default GoodsPage
