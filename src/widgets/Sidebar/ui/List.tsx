import { memo, ReactNode, useCallback, useState } from "react"
import MUIList from "@mui/material/List"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import Collapse from "@mui/material/Collapse"
import * as React from "react"
import { ListItemButton } from "./ListItemButton"
import { TSelected } from "../Sidebar"
import { Box, ButtonBase } from "@mui/material"
import { Icon } from "../../../shared/ui/Icon"

export type MenuItemBase = {
  id: number
  name: string
  caption: string
  icon: string
}

export type MenuItem = { disabled?: boolean } & MenuItemBase

export type MenuList = { sublist?: MenuItem[] } & MenuItemBase

export type List = {
  isSelected: boolean
  selectedOptionId: boolean | number
  onSelect: (data: TSelected) => void
  open: boolean
} & MenuList

export type ListLayoutProps = {
  header: ReactNode
  isSelected: boolean
  selectedOptionId: boolean | number
  onSelect: (optionId?: number) => void
  isExpanded: boolean
  open: boolean
} & MenuList

export const ListLayout = (props: ListLayoutProps) => {
  const {
    header,
    name,
    isSelected,
    onSelect,
    selectedOptionId,
    sublist,
    isExpanded,
    open,
    caption, id, icon
  } = props

  return (
    <MUIList component="nav" disablePadding>
      <Box sx={{
        display: "flex",
        justifyContent: "center"
      }}>
        {header}
      </Box>

      <Collapse
        in={isExpanded}
        timeout={300}
        unmountOnExit
        sx={{
          position: "relative",
          "&::before": {
            content: "''",
            position: "absolute",
            width: 1,
            height: 1,
            top: 0,
            left: 0,
            borderLeft: "5px solid",
            borderBottomLeftRadius: 4,
            borderLeftColor: ({ palette }) => (isExpanded && isSelected && open) ? palette.primary.light : "transparent",
          }
        }}
      >
        <MUIList component="div" disablePadding>
          {!open && sublist?.length !== 0 && <ListItemButton
            open={open}
            path={name}
            onSelectOption={onSelect}
            icon={icon}
            caption={caption}
            sx={{
              backgroundColor: isSelected ? "rgba(25, 118, 210, 0.08)" : null,
            }}
          />}
          {sublist && sublist.length > 0 && sublist.map(option => (
            <ListItemButton
              path={option?.disabled ? name : `${name}/${option.name}`}
              sx={{
                backgroundColor: (selectedOptionId === option.id && !option.disabled)
                  ? "rgba(25, 118, 210, 0.08)"
                  : null,
                pl: open ? 2 : 0,
              }}
              optionId={option.id}
              key={option.id}
              caption={option.caption}
              icon={option.icon}
              disabled={option?.disabled}
              onSelectOption={onSelect}
              open={open}
            />
          ))}
        </MUIList>
      </Collapse>
    </MUIList>
  )
}

export const List = memo((props: List) => {
  const {
    id,
    caption,
    name,
    icon,
    sublist,
    isSelected,
    selectedOptionId,
    onSelect,
    open
  } = props

  const [isExpanded, setIsExpanded] = useState(false)

  const handleOnSelect = useCallback((optionId?: number) => {
    setIsExpanded(true)

    onSelect({
      optionSelected: optionId ?? null,
      listSelected: id
    })
  }, [onSelect, id])

  const handleOnExpand = (event: any) => {
    event.stopPropagation()

    setIsExpanded(prevState => !prevState)
  }

  if (!open) {
    return <ListLayout
      icon={icon}
      caption={caption}
      id={id}
      header={sublist ? (
        <ButtonBase onClick={handleOnExpand} sx={{ width: 1, }}>
          <Box sx={{
            height: 20,
            position: "relative",
            display: "flex",
            alignItems: "center",
            "&::after, &::before": {
              content: "''",
              position: "absolute",
              width: 1,
              height: "1px",
              top: "50%",
              transform: "translate(0, -50%)",
              backgroundColor: ({ palette }) => palette.grey["300"]
            },
            "&::after": {
              right: -18,
            },
            "&::before": {
              left: -18,
            },
          }}>
            <Icon name="expand" sx={{
              fontSize: 18,
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: ".3s",
            }}/>
          </Box>
        </ButtonBase>
      ) : <ListItemButton
        open={open}
        path={name}
        onSelectOption={handleOnSelect}
        icon={icon}
        caption={caption}
        sx={{
          backgroundColor: isSelected ? "rgba(25, 118, 210, 0.08)" : null,
        }}
      />}
      sublist={sublist ? sublist : []}
      onSelect={handleOnSelect}
      name={name}
      isExpanded={isExpanded}
      isSelected={isSelected}
      selectedOptionId={selectedOptionId}
      open={open}
    />
  }

  return <ListLayout
    icon={icon}
    caption={caption}
    id={id}
    header={<ListItemButton
      open={open}
      path={name}
      onSelectOption={handleOnSelect}
      icon={icon}
      caption={caption}
      sx={{
        backgroundColor: isSelected ? "rgba(25, 118, 210, 0.08)" : null,
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
          borderBottomLeftRadius: sublist?.length > 0 ? 0 : 4,
          borderLeftColor: ({ palette }) => (isExpanded && isSelected) ? palette.primary.light : "transparent"
        }
      }}
    >
      {sublist && sublist.length > 0 && (
        <Icon
          name="expand"
          onClick={handleOnExpand}
          sx={{
            fontSize: 18,
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: ".3s",
          }}
        />
      )}
    </ListItemButton>}
    sublist={[...(sublist ?? [])]}
    onSelect={handleOnSelect}
    name={name}
    isExpanded={isExpanded}
    isSelected={isSelected}
    selectedOptionId={selectedOptionId}
    open={open}
  />

  /* return (
    <MUIList component="nav" disablePadding>
      <ListItemButton
        path={name}
        onSelectOption={handleOnSelect}
        icon={icon}
        caption={caption}
        sx={{
          backgroundColor: isSelected ? "rgba(25, 118, 210, 0.08)" : null,
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
            borderBottomLeftRadius: sublist?.length > 0 ? 0 : 4,
            borderLeftColor: ({ palette }) => (isExpanded && isSelected) ? palette.primary.light : "transparent"
          }
        }}
      >
        {sublist && sublist.length > 0 && (
          <KeyboardArrowDownIcon
            onClick={handleOnExpand}
            sx={{
              fontSize: 18,
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: ".3s",
            }}
          />
        )}
      </ListItemButton>
      <Collapse
        in={isExpanded}
        timeout={300}
        unmountOnExit
        sx={{
          position: "relative",
          "&::before": {
            content: "''",
            position: "absolute",
            width: 1,
            height: 1,
            top: 0,
            left: 0,
            borderLeft: "5px solid",
            transition: ".2s",
            borderBottomLeftRadius: 4,
            borderLeftColor: ({ palette }) => (isExpanded && isSelected) ? palette.primary.light : "transparent"
          }
        }}
      >
        <MUIList component="div" disablePadding>
          {sublist && sublist.length > 0 && sublist.map(option => (
            <ListItemButton
              path={option?.disabled ? name : `${name}/${option.name}`}
              sx={{
                backgroundColor: (selectedOptionId === option.id && !option.disabled) ? "rgba(25, 118, 210, 0.08)" : null,
                pl: 2
              }}
              optionId={option.id}
              key={option.id}
              caption={option.caption}
              icon={option.name}
              disabled={option?.disabled}
              onSelectOption={handleOnSelect}
            />
          ))}
        </MUIList>
      </Collapse>
    </MUIList>
  ) */
})
