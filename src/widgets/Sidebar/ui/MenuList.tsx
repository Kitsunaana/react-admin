import * as React from "react"
import { memo, useCallback } from "react"
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
  onToggleExpand: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, listId: number) => void
  onClose: (data: { listId: number; sublistId?: number }) => void
  open?: boolean
    listActive: number
    sublistActive: number | null
}

export const MenuList = memo((props: MenuListProps) => {
  const {
    id,
    caption,
    name,
    options,
    isActive,
    isExpanded,
    onClose,
    onToggleExpand,
    open,
    icon,
    listActive,
    sublistActive,
  } = props

  const listActiveId = listActive
  const sublistActiveId = sublistActive

  const handleOnToggleExpand = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => onToggleExpand(event, id), [])

  return (
    <>
      <MenuItem
        listId={id}
        icon={icon}
        isActive={listActiveId === id}
        isExpanded={isExpanded}
        caption={caption}
        open={open}
        isList
        showExpandButton={options.length !== 0}
        onToggleExpand={handleOnToggleExpand}
        onClick={onClose}
      />
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
            listId={id}
            sublistId={option.id}
            icon={option.icon}
            key={option.id}
            isList={false}
            isActive={sublistActiveId === option.id}
            isExpanded={isExpanded}
            caption={option.caption}
            open={open}
            disabled={option.disabled ?? false}
            onClick={onClose}
          />
        ))}
      </Box>
    </>
  )
})
