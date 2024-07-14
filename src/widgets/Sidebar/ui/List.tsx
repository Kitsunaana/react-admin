import {
  memo, useCallback, useState, MouseEvent, useEffect, useRef, useMemo,
} from "react"
import * as React from "react"
import { ListItemButton } from "./ListItemButton"
import { ExpandButton } from "./ExpandButton"
import { MenuList } from "../types"
import { ListLayout, ListLayoutProps } from "./ListLayout"
import { addEvent } from "shared/lib/event"

const styles = {
  listItemButton: (isSelected: boolean, isExpanded: boolean, isEmptyOptions: boolean, open: boolean) => ({
    position: "relative",
    "&::before": {
      content: "''",
      position: "absolute",
      width: 4,
      height: 1,
      top: 0,
      left: 0,
      borderLeft: "5px solid",
      transition: ".2s",
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: isEmptyOptions || (isSelected && !isExpanded) ? 4 : 0,
      borderLeftColor: ({ palette }) => (isSelected && open ? palette.primary.light : "transparent"),
    },
  }),
}

export type ListProps = {
  open: boolean
  list: MenuList
}

export type TRef = { selectedId: number; selectedOptionId: number | null }

export const List = memo((props: ListProps) => {
  const { open, list } = props

  const [, setReload] = useState(true)
  const [isExpanded, setIsExpanded] = useState(list.id === 0)
  const ref = useRef<TRef>({ selectedId: 0, selectedOptionId: null })

  useEffect(() => {
    addEvent("selected", (data) => {
      if (data.selectedId === list.id) setIsExpanded(true)

      if ((list.id === data.selectedId) || (ref.current.selectedId === list.id)) {
        ref.current = data

        setReload((prevState) => !prevState)
      }
    })
  }, [])

  const buttonProps = useMemo(() => ({
    disableRipple: true,
    sx: { width: "auto" },
  }), [])

  const handleOnExpand = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    setIsExpanded((prevState) => !prevState)
  }, [])

  const isSelected = ref.current.selectedId === list.id
  const { selectedOptionId } = ref.current

  const listLayoutProps: Omit<ListLayoutProps, "header"> = {
    ...list,
    isExpanded,
    isSelected,
    selectedOptionId: selectedOptionId ?? false,
    open,
    sublist: list.sublist,
    name: list.name,
  }

  const listItemButtonProps = {
    open,
    isSelected,
    path: list.name,
    icon: list.icon,
    caption: list.caption,
    listId: list.id,
  }

  const menuItemButtonStyle = styles.listItemButton(
    isSelected,
    isExpanded,
    list.sublist.length < 1,
    open,
  )

  if (!open) {
    return (
      <ListLayout
        {...listLayoutProps}
        header={
          list.sublist.length > 0 ? (
            <ExpandButton
              tooltipCaption={list.caption}
              isExpanded={isExpanded}
              handleOnExpand={handleOnExpand}
              divider
            />
          ) : (
            <ListItemButton {...listItemButtonProps} sx={menuItemButtonStyle} />
          )
        }
      />
    )
  }

  return (
    <ListLayout
      {...listLayoutProps}
      header={(
        <ListItemButton {...listItemButtonProps} sx={menuItemButtonStyle}>
          {list.sublist && list.sublist.length > 0 && (
            <ExpandButton
              buttonProps={buttonProps}
              handleOnExpand={handleOnExpand}
              isExpanded={isExpanded}
            />
          )}
        </ListItemButton>
      )}
    />
  )
})


