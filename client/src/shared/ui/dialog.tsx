import { memo, ReactNode } from "react"
import MUIDialog from "@mui/material/Dialog"
import { Box } from "shared/ui/box"
import MUIDialogContent from "@mui/material/DialogContent"
import MUIDialogActions from "@mui/material/DialogActions"
import * as React from "react"
import { shallowEqual } from "shared/lib/utils"

interface DialogLayoutProps {
  fullScreen: boolean
  open: boolean
  header?: ReactNode
  tabs?: ReactNode
  content?: ReactNode
  actions?: ReactNode
}

export const Dialog = memo((props: DialogLayoutProps) => {
  const {
    fullScreen, actions, open, header, content, tabs,
  } = props

  return (
    <MUIDialog
      fullScreen={fullScreen}
      open={open}
      sx={{
        borderRadius: 2,
      }}
      PaperProps={{
        sx: {
          ...(fullScreen ? {} : {
            maxWidth: 900,
            height: 580,
          }),
        },
      }}
    >
      {header}
      <Box sx={{ mx: 1 }}>
        {tabs}
      </Box>
      <MUIDialogContent sx={{ height: 1, p: 1 }}>
        {content}
      </MUIDialogContent>
      <MUIDialogActions>
        {actions}
      </MUIDialogActions>
    </MUIDialog>
  )
})
