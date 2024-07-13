import {
  memo, useCallback, useState, MouseEvent,
} from "react"
import * as React from "react"
import { ListItemButton } from "./ListItemButton"
import { TSelected } from "../Sidebar"
import { ExpandButton } from "./ExpandButton"
import { MenuList } from "../types"
import { ListLayout } from "./ListLayout"
import { shallowEqual } from "../../../shared/lib/utils"

const styles = {
  listItemButton: (isSelected: boolean, isExpanded: boolean, isEmptyOptions: boolean) => ({
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
      borderLeftColor: ({ palette }) => (isSelected ? palette.primary.light : "transparent"),
    },
  }),
}

export type List = {
  isSelected: boolean
  selectedOptionId: boolean | number
  onSelect: (data: TSelected) => void
  open: boolean
  list: MenuList
}

export const List = memo((props: List) => {
  const {
    isSelected, selectedOptionId, onSelect, open, list,
  } = props

  const [isExpanded, setIsExpanded] = useState(list.id === 0)

  const handleOnSelect = useCallback((optionId?: number) => {
    setIsExpanded(true)

    onSelect({
      optionSelected: optionId ?? null,
      listSelected: list.id,
    })
  }, [onSelect, list.id])

  const handleOnExpand = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    setIsExpanded((prevState) => !prevState)
  }, [])

  const listLayoutProps = {
    sublist: list.sublist ? list.sublist : [],
    onSelect: handleOnSelect,
    name: list.name,
    isExpanded,
    isSelected,
    selectedOptionId,
    open,
    ...list,
  }

  const listItemButtonProps = {
    open,
    path: list.name,
    onSelectOption: handleOnSelect,
    icon: list.icon,
    caption: list.caption,
    isSelected,
  }

  const menuItemButtonStyle = styles.listItemButton(
    isSelected,
    isExpanded,
    list.sublist === undefined,
  )

  if (!open) {
    return (
      <ListLayout
        {...listLayoutProps}
        header={
          list.sublist ? (
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
              buttonProps={{
                disableRipple: true,
                sx: { width: "auto" },
              }}
              handleOnExpand={handleOnExpand}
              isExpanded={isExpanded}
            />
          )}
        </ListItemButton>
      )}
    />
  )
}, shallowEqual)
