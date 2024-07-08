import * as React from "react"
import { memo } from "react"
import Box from "@mui/material/Box"
import { MenuItem } from "./MenuItem"

interface BaseItem {
  id: number
  caption: string
  name: string
  icon: string
}

interface BaseItemWithDisabled extends BaseItem {
  disabled?: boolean
}

interface MenuListProps extends BaseItem{
  options: BaseItemWithDisabled[]
  isActive: boolean
  isExpanded: boolean
  onExpand: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, listId: number) => void
  onClose: (listId: number) => void
  open?: boolean
}

export const MenuList = memo((props: MenuListProps) => {
  const {
    id, caption, name, options, isActive, isExpanded, onClose, onExpand, open, icon,
  } = props

  return (
    <>
      <Box
        onClick={() => onClose(id)}
        sx={{
          backgroundColor: isActive ? "rgba(25, 118, 210, 0.08)" : null,
        }}
      >
        <MenuItem
          icon={icon}
          isActive={isActive}
          isExpanded={isExpanded}
          caption={caption}
          open={open}
          isList
          showExpandButton={options.length !== 0}
          onClose={(event) => onExpand(event, id)}
        />
      </Box>
      <Box sx={{
        transition: "height .3s",
        borderBottomLeftRadius: 4,
        display: "flex",
        flexDirection: "column",
        ...(open ? { borderLeft: isActive ? "4px solid rgb(3, 169, 244)" : "4px solid transparent" } : {}),
        ...(isExpanded ? {
          height: options.length * 40,
          overflow: "hidden",
        } : {
          height: 0,
          overflow: "hidden",
        }),
      }}
      >
        {options.length > 0 && options.map((option) => (
          <MenuItem
            icon={option.icon}
            key={option.id}
            isList={false}
            isActive={isActive}
            isExpanded={isExpanded}
            caption={option.caption}
            open={open}
            disabled={option.disabled ?? false}
          />
        ))}
      </Box>
    </>
  )
})
