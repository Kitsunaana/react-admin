import * as React from "react"
import { memo } from "react"
import Box from "@mui/material/Box"
import { MenuItem } from "./MenuItem"

interface BaseItem {
  id: number
  caption: string
  name: string
}

interface MenuListProps extends BaseItem{
  options: BaseItem[]
  isActive: boolean
  isExpanded: boolean
  onExpand: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, listId: number) => void
  onClose: (listId: number) => void
}

export const MenuList = memo((props: MenuListProps) => {
  const {
    id, caption, name, options, isActive, isExpanded, onClose, onExpand,
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
          isList
          isActive={isActive}
          isExpanded={isExpanded}
          caption={caption}
          onClose={(event) => onExpand(event, id)}
        />
      </Box>
      <Box sx={{
        transition: "height .3s",
        borderLeft: isActive ? "4px solid rgb(3, 169, 244)" : "4px solid transparent",
        borderBottomLeftRadius: 4,
        display: "flex",
        flexDirection: "column",
        ...(isExpanded ? {
          height: options.length * 40,
          overflow: "hidden",
        } : {
          height: 0,
          overflow: "hidden",
        }),
      }}
      >
        {options && options.map((option) => (
          <MenuItem
            key={option.id}
            isList={false}
            isActive={isActive}
            isExpanded={isExpanded}
            caption={option.caption}
          />
        ))}
      </Box>
    </>
  )
})
