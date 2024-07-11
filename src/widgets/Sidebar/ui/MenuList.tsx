import * as React from "react"
import {
  memo, PropsWithChildren, ReactNode, useCallback, useState,
} from "react"
import Box from "@mui/material/Box"
import { useDispatch } from "react-redux"
import { selectMenuItem } from "../model/sidebarSlice"
import { MenuItem } from "./MenuItem"
import { SidebarExpandButton } from "./SidebarExpandButton"
import { menu } from "../constants"

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
  open?: boolean
  sublist?: BaseItemWithDisabled[]

  isActive: boolean
}

interface ContainerMenuItemProps extends PropsWithChildren {
  isActive: boolean
  isExpanded: boolean
  length: number
  open: boolean
}

interface MenuListLayoutProps {
  header: ReactNode
  options: ReactNode
  id: number
  open: boolean

  isActive: boolean
  isExpanded: boolean
  length: number
}

export const ContainerMenuItem = memo((props: ContainerMenuItemProps) => {
  const {
    children, isActive, isExpanded, length, open,
  } = props

  return (
    <Box sx={{
      transition: "height .3s",
      borderBottomLeftRadius: 4,
      display: "flex",
      flexDirection: "column",
      ...(open ? { borderLeft: isActive ? "4px solid rgb(3, 169, 244)" : "4px solid transparent" } : {}),
      ...(isExpanded ? {
        height: length * 40,
        overflow: "hidden",
      } : {
        height: 0,
        overflow: "hidden",
      }),
    }}
    >
      {children}
    </Box>
  )
})

export const MenuListLayout = (props: MenuListLayoutProps) => {
  const {
    options,
    header,
    id,
    open,
    isExpanded,
    isActive,
    length,
  } = props

  return (
    <>
      {header}
      <ContainerMenuItem
        open={open}
        length={length}
        isActive={isActive}
        isExpanded={isExpanded}
      >
        {options}
      </ContainerMenuItem>
    </>
  )
}

export const MenuList = memo((props: MenuListProps) => {
  const {
    id,
    caption,
    name,
    icon,
    sublist = [],
    open,
    isActive,
  } = props

  const [isExpanded, setIsExpanded] = useState(false)

  const dispatch = useDispatch()

  const handleOnToggleExpand = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()

    setIsExpanded((prevState) => !prevState)
  }, [])

  const handleOnSelectedMenuItem = useCallback((sublistId?: number) => {
    setIsExpanded(true)

    dispatch(selectMenuItem({ listId: id, sublistId }))
  }, [])

  if (open) {
    return (
      <MenuListLayout
        id={id}
        open={open}
        isActive={isActive}
        isExpanded={isExpanded}
        length={sublist.length}
        header={(
          <MenuItem
            isActive={isActive}
            isExpanded={isExpanded}
            listId={id}
            icon={icon}
            caption={caption}
            open={open}
            isList
            onToggleExpand={handleOnToggleExpand}
            onSelectedMenuItem={handleOnSelectedMenuItem}
            showExpandButton={sublist.length !== 0}
          />
        )}
        options={sublist.length > 0 && sublist.map((option) => (
          <MenuItem
            isActive={isActive}
            isExpanded={isExpanded}
            key={option.id}
            listId={id}
            sublistId={option.id}
            icon={option.icon}
            isList={false}
            caption={option.caption}
            open={open}
            onToggleExpand={handleOnToggleExpand}
            disabled={option.disabled ?? false}
            onSelectedMenuItem={handleOnSelectedMenuItem}
          />
        ))}
      />
    )
  }

  if (!open && sublist.length === 0) {
    return (
      <MenuListLayout
        id={id}
        open={open}
        isActive={isActive}
        isExpanded={isExpanded}
        length={sublist.length}
        header={(
          <MenuItem
            isActive={isActive}
            isExpanded={isExpanded}
            listId={id}
            icon={icon}
            caption={caption}
            open={open}
            isList
            onToggleExpand={handleOnToggleExpand}
            onSelectedMenuItem={handleOnSelectedMenuItem}
            showExpandButton={sublist.length !== 0}
          />
        )}
        options={sublist.length > 0 && sublist.map((option) => (
          <MenuItem
            isActive={isActive}
            isExpanded={isExpanded}
            key={option.id}
            listId={id}
            sublistId={option.id}
            icon={option.icon}
            isList={false}
            caption={option.caption}
            open={open}
            onToggleExpand={handleOnToggleExpand}
            disabled={option.disabled ?? false}
            onSelectedMenuItem={handleOnSelectedMenuItem}
          />
        ))}
      />
    )
  }

  if (!open) {
    return (
      <MenuListLayout
        id={id}
        open={open}
        isActive={isActive}
        isExpanded={isExpanded}
        length={sublist.length + 1}
        header={(
          <SidebarExpandButton
            isExpanded
            onToggleExpand={handleOnToggleExpand}
            open={open}
          />
      )}
        options={[{
          id, name, caption, icon, disabled: false
        }, ...sublist].map((option) => (
          <MenuItem
            key={option.id}
            isActive={isActive}
            isExpanded={isExpanded}
            listId={id}
            sublistId={option.id}
            icon={option.icon}
            isList={false}
            caption={option.caption}
            open={open}
            onToggleExpand={handleOnToggleExpand}
            disabled={true}
            onSelectedMenuItem={handleOnSelectedMenuItem}
          />
        ))}
      />
    )
  }
})
