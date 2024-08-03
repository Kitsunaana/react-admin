import {
  memo, useCallback, useState, MouseEvent, useEffect, useRef, useMemo,
} from "react"
import * as React from "react"
import { addEvent } from "shared/lib/event"
import { useLocation } from "react-router-dom"
import { ListItemButton } from "./list-item-button"
import { ExpandButton } from "../expand-button"
import { MenuList } from "../../types"
import { ListLayout, ListLayoutProps } from "./list-layout"

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
      borderLeftColor: ({ palette }) => ((isSelected && open)
        ? (palette.mode === "light" ? palette.primary.light : palette.primary.dark)
        : "transparent"),
    },
  }),
}

export type ListProps = {
  open: boolean
  list: MenuList
}

export type TRef = { selectedId: number | null; selectedOptionId: number | null }

export const List = memo((props: ListProps) => {
  const { open, list } = props

  const { pathname } = useLocation()

  const [selected, selectedOption] = pathname.replace("/", "").split("/")
  const findSelectedOptions = list.sublist.find((option) => option.name === selectedOption)

  const [, setReload] = useState(true)
  const [isExpanded, setIsExpanded] = useState(selected === list.name)
  const ref = useRef<TRef>({
    selectedId: selected === list.name ? list.id : null,
    selectedOptionId: findSelectedOptions ? findSelectedOptions.id : null,
  })

  useEffect(() => {
    addEvent("selected", (data) => {
      if (data.selectedId === list.id) setIsExpanded(true)

      if ((list.id === data.selectedId) || (ref.current.selectedId === list.id)) {
        ref.current = data

        setReload((prevState) => !prevState)
      }
    })
  }, [])

  useEffect(() => {
    if (list.name === selected) {
      setIsExpanded(true)
    }

    ref.current = {
      selectedId: selected === list.name ? list.id : null,
      selectedOptionId: findSelectedOptions?.id ?? null,
    }

    setReload((prevState) => !prevState)
  }, [pathname])

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
  }

  const listItemButtonProps = {
    open,
    isSelected,
    name: list.name,
    path: list.name,
    icon: list.icon,
    caption: list.caption,
    listId: list.id,
  }

  const menuItemButtonStyle = useMemo(() => styles.listItemButton(
    isSelected,
    isExpanded,
    list.sublist.length < 1,
    open,
  ), [isSelected, isExpanded, open])

  const memoizedExpandButton = useMemo(() => (
    <ExpandButton
      name={list.name}
      buttonProps={buttonProps}
      handleOnExpand={handleOnExpand}
      isExpanded={isExpanded}
    />
  ), [isExpanded, list.name, handleOnExpand, buttonProps])

  if (!open) {
    return (
      <ListLayout
        {...listLayoutProps}
        header={
          list.sublist.length > 0 ? (
            <ExpandButton
              name={list.name}
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
            /* <ExpandButton
              name={list.name}
              buttonProps={buttonProps}
              handleOnExpand={handleOnExpand}
              isExpanded={isExpanded}
            /> */
            memoizedExpandButton
          )}
        </ListItemButton>
      )}
    />
  )
})
