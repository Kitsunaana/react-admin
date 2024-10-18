import { styled } from "@mui/material/styles"
import { observer } from "mobx-react-lite"
import { MouseEvent } from "react"
import { useListSelected } from "../../model/use-list-selected"
import { MenuList } from "../../model/types"
import { ListItemButton, ListItemButtonProps } from "./list-item-button"
import { ListLayout } from "./list-layout"
import { ExpandButton } from "../expand-button"

export type ListProps = {
  open: boolean
  list: MenuList
}

interface ClosedListItemButtonProps extends ListItemButtonProps {
  isExpanded: boolean
  isEmptyOptions: boolean
}

const StyledListItemButton = styled(
  ({ isExpanded, isEmptyOptions, ...other }: ClosedListItemButtonProps) => <ListItemButton {...other} />,
)((props) => {
  const {
    theme,
    isSelected,
    isExpanded,
    isEmptyOptions,
    open,
  } = props

  const { palette } = theme

  return {
    position: "relative",
    "&::before": {
      content: "''",
      position: "absolute",
      width: 4,
      height: "100%",
      top: 0,
      left: 0,
      borderLeft: "5px solid",
      transition: ".2s",
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: isEmptyOptions || (isSelected && !isExpanded) ? 4 : 0,
      borderLeftColor: (isSelected && open)
        ? (palette.mode === "light" ? palette.primary.light : palette.primary.dark)
        : "transparent",
    },
  }
})

export const List = observer((props: ListProps) => {
  const { open, list } = props

  const {
    isExpanded,
    isSelected,
    selectedOptionId,
    setIsExpanded,
  } = useListSelected(list)

  const handleOnExpand = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsExpanded((prevState) => !prevState)
  }

  if (open) {
    return (
      <ListLayout
        {...list}
        open={open}
        isExpanded={isExpanded}
        isSelected={isSelected}
        selectedOptionId={selectedOptionId ?? false}
        header={(
          <StyledListItemButton
            disabled={list.disabled}
            name={list.name}
            icon={list.icon}
            caption={list.caption}
            path={list.name}
            open={open}
            isSelected={isSelected}
            listId={list.id}
            isEmptyOptions={list.sublist.length < 1}
            isExpanded={isExpanded}
          >
            {list.sublist && list.sublist.length > 0 && (
              <ExpandButton
                name={list.name}
                handleOnExpand={handleOnExpand}
                isExpanded={isExpanded}
                buttonProps={{
                  disableRipple: true,
                  sx: { width: "auto" },
                }}
              />
            )}
          </StyledListItemButton>
        )}
      />
    )
  }

  return (
    <ListLayout
      {...list}
      open={open}
      isExpanded={isExpanded}
      isSelected={isSelected}
      selectedOptionId={selectedOptionId ?? false}
      header={
        list.sublist.length > 0 ? (
          <ExpandButton
            name={list.name}
            isExpanded={isExpanded}
            handleOnExpand={handleOnExpand}
            divider
          />
        ) : (
          <StyledListItemButton
            name={list.name}
            icon={list.icon}
            caption={list.caption}
            path={list.name}
            open={open}
            isSelected={isSelected}
            listId={list.id}
            isEmptyOptions={list.sublist.length < 1}
            isExpanded={isExpanded}
          />
        )
      }
    />
  )
})
