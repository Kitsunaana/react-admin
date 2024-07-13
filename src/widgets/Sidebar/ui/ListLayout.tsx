import { memo, ReactNode, useMemo } from "react"
import MUIList from "@mui/material/List"
import { Box, CollapseProps, MenuListProps } from "@mui/material"
import MUICollapse from "@mui/material/Collapse"
import * as React from "react"
import { ListItemButton } from "./ListItemButton"
import { MenuList } from "../types"
import { shallowEqual } from "../../../shared/lib/utils"

const List = memo((props: MenuListProps) => <MUIList {...props} />)
const Collapse = memo((props: CollapseProps) => <MUICollapse {...props} />)

export type ListLayoutProps = {
  header: ReactNode
  isSelected: boolean
  selectedOptionId: boolean | number
  onSelect: (optionId?: number) => void
  isExpanded: boolean
  open: boolean
} & MenuList

export const ListLayout = memo((props: ListLayoutProps) => {
  const {
    header,
    name,
    isSelected,
    onSelect,
    selectedOptionId,
    sublist,
    isExpanded,
    open,
    caption,
    icon,
    id,
  } = props

  const sx = useMemo(() => ({ pl: open ? 2 : 0 }), [open])

  return (
    <List component="nav" disablePadding>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
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
            transition: ".2s",
            borderBottomLeftRadius: 4,
            borderLeftColor: ({ palette }) => (isExpanded && isSelected && open
              ? palette.primary.light
              : "transparent"),
          },
        }}
      >
        <List component="div" disablePadding>
          {!open && sublist?.length !== 0 && (
            <ListItemButton
              open={open}
              onSelectOption={onSelect}
              path={name}
              icon={icon}
              caption={caption}
              isSelected={isSelected}
              listId={id}
            />
          )}
          {sublist && sublist.length > 0 && sublist.map((option) => {
            const path = option?.disabled ? name : `${name}/${option.name}`
            const isSelectedOption = selectedOptionId === option.id && !option.disabled

            return (
              <ListItemButton
                listId={id}
                open={open}
                onSelectOption={onSelect}
                path={path}
                sx={sx}
                isSelected={isSelectedOption}
                optionId={option.id}
                key={option.id}
                caption={option.caption}
                icon={option.icon}
                disabled={option?.disabled}
              />
            )
          })}
        </List>
      </Collapse>
    </List>
  )
})
