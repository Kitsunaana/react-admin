import { memo, ReactNode, useMemo } from "react"
import { Collapse, List } from "@mui/material"
import * as React from "react"
import { Box } from "shared/ui/Box"
import { ListItemButton } from "./ListItemButton"
import { MenuList } from "../../types"

export type ListLayoutProps = {
  header: ReactNode
  isSelected: boolean
  selectedOptionId: boolean | number
  isExpanded: boolean
  open: boolean
} & MenuList

export const ListLayout = memo((props: ListLayoutProps) => {
  const {
    header,
    name,
    isSelected,
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
    <List component="nav" disablePadding sx={{ width: open ? 240 : 47, transition: !open ? "width .3s" : null }}>
      <Box flex jc>{header}</Box>

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
              ? (palette.mode === "light" ? palette.primary.light : palette.primary.dark)
              : "transparent"),
          },
        }}
      >
        <List component="div" disablePadding>
          {!open && sublist?.length !== 0 && (
            <ListItemButton
              name={name}
              open={open}
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
                name={option.name}
                listId={id}
                open={open}
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
