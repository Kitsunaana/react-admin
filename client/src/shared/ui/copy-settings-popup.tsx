import { default as Menu, menuClasses } from "@mui/material/Menu"
import { IconButton } from "shared/ui/buttons/icon-button"
import { MouseEvent, ReactNode, useState } from "react"
import { Text } from "shared/ui/text"
import { styled } from "@mui/material/styles"

interface CopySettingsPopupProps {
  children: ReactNode
}

const StyledMenu = styled(Menu)(({ theme }) => ({
  [`& .${menuClasses.paper}`]: {

    backgroundColor: theme.palette.mode === "dark"
      ? theme.palette.grey[900]
      : theme.palette.common.white,

    backgroundImage: theme.background.sectionBackground,
    padding: "0px 4px",
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    marginTop: 12,
    borderRadius: 12,

    "&::before": {
      content: "\"\"",
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      backgroundColor: theme.palette.mode === "dark"
        ? theme.palette.grey[900]
        : theme.palette.common.white,

      backgroundImage: theme.background.sectionBackground,
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
}))

export const CopySettingsPopup = (props: CopySettingsPopupProps) => {
  const { children } = props

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <IconButton
        name="settings_v2"
        onClick={handleClick}
        help={{
          title: (
            <Text
              onlyText
              langBase="global.dialog"
              name="copySettings"
            />
          ),
        }}
      />
      <StyledMenu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {children}
      </StyledMenu>
    </>
  )
}
