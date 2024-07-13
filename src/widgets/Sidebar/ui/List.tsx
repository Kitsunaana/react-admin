import {
  memo, useCallback, useState, MouseEvent, useEffect, useRef, useReducer, useMemo,
} from "react"
import * as React from "react"
import { ListItemButton } from "./ListItemButton"
import { TSelected } from "../Sidebar"
import { ExpandButton } from "./ExpandButton"
import { MenuList } from "../types"
import { ListLayout } from "./ListLayout"
import { shallowEqual } from "../../../shared/lib/utils"
import { addEvent, dispatch } from "../../../shared/lib/event"

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
  /* isSelected: boolean
  selectedOptionId: boolean | number */
  isSelected?: boolean
  selectedOptionId?: boolean | number
  onSelect: (data: TSelected) => void
  open: boolean
  list: MenuList

  selected?: TSelected
}

export const List = memo((props: ListProps) => {
  const {
    // isSelected, selectedOptionId, onSelect, open, list,
    onSelect, open, list,
  } = props

  const [isExpanded, setIsExpanded] = useState(list.id === 0)

  const handleOnSelect = useCallback((optionId?: number) => {
    setIsExpanded(true)

    // setSelected((prevState) => ({ ...prevState, selectedId: list.id, selectedOptionId: optionId ?? null }))

    /* dispatch("selected", { selectedId: list.id, selectedOptionId: optionId } satisfies {
      selectedId: number
      selectedOptionId: number | null
    }) */

    // dispatch("selected", { selectedId: list.id } satisfies { selectedId: number })
  }, [list.id])

  const handleOnExpand = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    setIsExpanded((prevState) => !prevState)
  }, [])

  const [, setReload] = useState(true)

  const ref = useRef<{ selectedId: number; selectedOptionId: number | null }>({
    selectedId: 0,
    selectedOptionId: null,
  })

  useEffect(() => {
    addEvent("selected", (data: { selectedId: number; selectedOptionId: number | null }) => {
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

  const isSelected = ref.current.selectedId === list.id
  const { selectedOptionId } = ref.current

  const listLayoutProps = {
    ...list,
    sublist: list.sublist.length > 0 ? list.sublist : [],
    onSelect: handleOnSelect,
    name: list.name,
    isExpanded,
    isSelected,
    selectedOptionId,
    open,
  }

  const listItemButtonProps = {
    open,
    path: list.name,
    onSelectOption: handleOnSelect,
    icon: list.icon,
    caption: list.caption,
    isSelected,
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
