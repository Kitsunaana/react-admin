import * as React from "react"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import { Divider } from "@mui/material"
import { ReactNode } from "react"

interface SidebarLayoutProps {
  header?: ReactNode
  footer?: ReactNode
  content?: ReactNode
  open: boolean
}

export const Layout = (props: SidebarLayoutProps) => {
  const {
    footer, header, content, open,
  } = props

  return (
    <Box sx={{ p: 2, height: 1 }}>
      <Box sx={{
        width: open ? 220 : 90,
        backgroundSize: "cover",
        height: 1,
        borderRadius: 2,
        boxShadow: "0px 0px 5px 0px rgba(66,68,90,.37)",
        backgroundImage: ({ palette }) => palette.background.paper,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
      >
        <Box sx={{ mt: 1 }}>
          {header}
        </Box>
        <Divider sx={{ my: 1 }} />
        <List sx={{ p: 0, py: 0.5, flexGrow: 1 }}>
          {content}
        </List>
        <Box>
          <List sx={{ p: 0, py: 0.5, flexGrow: 1 }}>
            <Box>
              <Box />
              <Box sx={{
                transition: "height .3s",
                borderLeft: "4px solid transparent",
                borderBottomLeftRadius: 4,
                display: "flex",
                flexDirection: "column",
              }}
              />
            </Box>
          </List>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ my: 1 }}>
            {footer}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
