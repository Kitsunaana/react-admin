import * as React from "react"
import Box from "@mui/material/Box"
import Menu from "@mui/material/Menu"
import { IconButton } from "shared/ui/buttons/icon-button"
import { ReactNode, useState } from "react"
import { Text } from "shared/ui/text"

interface CopySettingsPopupProps {
  children: ReactNode
}

export const CopySettingsPopup = (props: CopySettingsPopupProps) => {
  const { children } = props

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          name="settings_v2"
          onClick={handleClick}
          help={{
            arrow: true,
            title: <Text onlyText langBase="global.dialog" name="copySettings" />,
          }}
        />
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              backgroundColor: ({ palette }) => (palette.mode === "dark"
                ? palette.grey[900]
                : palette.common.white),
              backgroundImage: ({ background }) => background.sectionBackground,
              px: 0.5,
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              borderRadius: 3,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: "\"\"",
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                backgroundColor: ({ palette }) => (palette.mode === "dark"
                  ? palette.grey[900]
                  : palette.common.white),
                backgroundImage: ({ background }) => background.sectionBackground,
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {children}
      </Menu>
    </>
  )
}
