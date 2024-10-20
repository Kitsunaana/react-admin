import {
  alpha,
  ListItemButton as MUIListItemButton,
  ListItemButtonProps as MUIListItemButtonProps, Tooltip,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { memo } from "react"
import { Link } from "react-router-dom"
import { Text } from "shared/ui/text"
import { ListItemIcon } from "./list-item-icon"
import { ListItemText } from "./list-item-text"

interface StyledListItemButtonProps extends MUIListItemButtonProps {
  isSelected: boolean;
  open: boolean
}

const StyledListItemButton = styled(
  ({ isSelected, open, ...other }: StyledListItemButtonProps) => <MUIListItemButton {...other} />,
)(({ theme: { palette }, isSelected, open }) => ({
  backgroundColor: isSelected ? alpha(palette.primary.dark, 0.10) : undefined,
  height: 35,
  padding: 0,
  paddingLeft: open ? 8 : 0,
  paddingRight: 0,
  display: "flex",
  alignItems: "center",
  width: "100%",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: isSelected ? alpha(palette.primary.dark, 0.15) : undefined,
  },
}))

const StyledLink = styled(Link)(() => ({
  display: "flex",
  width: "100%",
  textDecoration: "none",
  color: "inherit",
  justifyContent: "center",
}))

export type ListItemButtonProps = {
  caption: string
  icon: string
  path: string
  optionId?: number
  listId: number
  open: boolean
  name: string
  isSelected: boolean
} & MUIListItemButtonProps

export const ListItemButton = memo((props: ListItemButtonProps) => {
  const {
    icon,
    caption,
    name,
    path,
    disabled,
    children,
    optionId,
    listId,
    isSelected,
    open,
    sx,
    ...otherProps
  } = props

  const isShowTooltip = disabled || !open

  const renderContent = (
    <>
      <ListItemIcon
        open={open}
        icon={icon}
        disabled={disabled ?? false}
      />
      {
        open && (
          <ListItemText
            disabled={disabled ?? false}
            name={name}
          />
        )
      }
    </>
  )

  const renderButton = (
    <StyledListItemButton
      isSelected={isSelected}
      open={open}
      sx={sx}
      {...otherProps}
    >
      {disabled ? (
        renderContent
      ) : (
        <StyledLink to={path}>
          {renderContent}
        </StyledLink>
      )}
      {children}
    </StyledListItemButton>
  )

  if (isShowTooltip) {
    return (
      <Tooltip
        arrow
        placement="right"
        title={(
          disabled
            ? <Text onlyText name="notAvailable" />
            : <Text onlyText name={name} />
        )}
      >
        <div>
          {renderButton}
        </div>
      </Tooltip>
    )
  }

  return renderButton
})
