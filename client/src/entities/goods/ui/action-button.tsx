import React, {
  forwardRef, MouseEvent, useEffect, useLayoutEffect, useRef, useState,
} from "react"
import { dispatch } from "shared/lib/event"
import { IconButton, Menu, MenuItem } from "@mui/material"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { Divider } from "shared/ui/divider"

const menu = [
  { id: 0, type: "divider" },
  {
    id: 1, type: "action", caption: "Дополнения", icon: "additional",
  },
  {
    id: 2, type: "action", caption: "Сделать копию товара", icon: "copy",
  },
  {
    id: 3, type: "action", caption: "Добавить в стоп-лист", icon: "stopList",
  },
  { id: 4, type: "divider" },
  {
    id: 5, type: "action", caption: "Удалить", icon: "delete",
  },
]

interface ActionMenuProps {
  anchorEl: null | HTMLElement
  handleClose: (event: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLLIElement>) => void
  open: boolean
}

export const ActionMenu = (props: ActionMenuProps) => {
  const { anchorEl, handleClose, open } = props

  return (
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
      {menu.map((action) => {
        if (action.type === "divider") return <Divider key={action.id} />

        if (action.type === "action") {
          return (
            <MenuItem
              key={action.id}
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
  )
}

export const ActionButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [position, setPosition] = useState({
    transformOrigin: "top",
    anchorOrigin: "bottom",
  })

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)

    dispatch("backdrop", { isActive: open })

    if (event.clientY + 250 >= document.body.offsetHeight) {
      setPosition({ transformOrigin: "bottom", anchorOrigin: "top" })
    }
  }

  const handleClose = (event: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLLIElement>) => {
    event.stopPropagation()

    setAnchorEl(null)

    dispatch("backdrop", { isActive: open })
  }

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
        transformOrigin={{ horizontal: "right", vertical: position.transformOrigin as any }}
        anchorOrigin={{ horizontal: "right", vertical: position.anchorOrigin as any }}
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
        {menu.map((action) => {
          if (action.type === "divider") return <Divider key={action.id} />

          if (action.type === "action") {
            return (
              <MenuItem
                key={action.id}
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

      {/* <ActionMenu
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
      /> */}
    </div>
  )
}
