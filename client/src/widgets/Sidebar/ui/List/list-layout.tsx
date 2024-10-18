import { Collapse, CollapseProps, List } from "@mui/material"
import { styled } from "@mui/material/styles"
import { observer } from "mobx-react-lite"
import { ReactNode } from "react"
import { Box } from "shared/ui/box"
import { MenuList } from "../../model/types"
import { ListItemButton } from "./list-item-button"

interface StyledCollapseProps extends CollapseProps {
  isShowBorderLeft: boolean
}

const StyledCollapse = styled(
  ({ isShowBorderLeft, ...other }: StyledCollapseProps) => <Collapse {...other} />,
)(({ isShowBorderLeft, theme: { palette } }) => ({
  position: "relative",
  "&::before": {
    content: "''",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    borderLeft: "5px solid",
    transition: ".2s",
    borderBottomLeftRadius: 4,
    borderLeftColor: (
      isShowBorderLeft
        ? palette.primary[palette.mode === "light" ? "light" : "dark"]
        : "transparent"
    ),
  },
}))

export type ListLayoutProps = {
  header: ReactNode
  isSelected: boolean
  selectedOptionId: boolean | number
  isExpanded: boolean
  open: boolean
} & MenuList

export const ListLayout = observer((props: ListLayoutProps) => {
  const {
    id,
    name,
    caption,
    icon,
    header,
    isSelected,
    isExpanded,
    selectedOptionId,
    sublist,
    open,
    disabled,
  } = props

  return (
    <List
      component="nav"
      disablePadding
      sx={{
        width: open ? 240 : 47,
        transition: !open ? "width .3s" : null,
      }}
    >
      <Box flex jc>{header}</Box>

      <StyledCollapse
        in={isExpanded}
        timeout={300}
        unmountOnExit
        isShowBorderLeft={isExpanded && isSelected && open}
      >
        <List component="div" disablePadding>
          {!open && sublist?.length !== 0 && (
            <ListItemButton
              disabled={disabled}
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
                key={option.id}
                name={option.name}
                caption={option.caption}
                icon={option.icon}
                isSelected={isSelectedOption}
                optionId={option.id}
                listId={id}
                open={open}
                path={path}
                disabled={option?.disabled}
                sx={{ pl: open ? 2 : 0 }}
              />
            )
          })}
        </List>
      </StyledCollapse>
    </List>
  )
})
