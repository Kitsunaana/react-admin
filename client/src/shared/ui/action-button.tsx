import React, {
  MouseEvent, ReactNode, useState,
} from "react"
import { dispatch } from "shared/lib/event"
import { IconButton, Menu } from "@mui/material"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { Mark } from "shared/ui/mark"

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

interface ActionButtonProps {
  renderActions?: (onClose: (event: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLLIElement>) => void) => ReactNode
  id: number
}

export const ActionButton = (props: ActionButtonProps) => {
  const { renderActions, id } = props

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
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
            mx: 0,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {renderActions?.(handleClose)}
        <Text
          sx={{ fontSize: 12, textAlign: "center" }}
          caption={(
            <>
              ID
              <Mark style={{ marginLeft: 4 }}>{id}</Mark>
            </>
          )}
        />
      </Menu>
    </div>
  )
}
