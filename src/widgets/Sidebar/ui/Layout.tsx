import * as React from "react"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import { Divider } from "@mui/material"
import { memo, ReactNode } from "react"

interface SidebarLayoutProps {
  header?: ReactNode
  footer?: ReactNode
  content?: ReactNode
  open: boolean
}

export const Layout = memo((props: SidebarLayoutProps) => {
  const {
    footer, header, content, open,
  } = props

  return (

    <Box sx={{ p: 1, height: 1 }}>
      <Box sx={{
        transition: ".3s",
        width: open ? 220 : 38,
        backgroundSize: "cover",
        height: 1,
        borderRadius: 2,
        boxShadow: "0px 0px 5px 0px rgba(66,68,90,.37)",
        background: ({ background }) => background.sectionBackground,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
      >
        <Box>
          {header}
        </Box>
        <Divider />
        <Box sx={{
          overflowY: "auto",
          overflowX: "hidden",
          flexGrow: 1,
        }}
        >
          <List sx={{ p: 0, py: 0.5 }}>
            {content}
          </List>
        </Box>
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
          <Divider />
          {footer}
        </Box>
      </Box>
    </Box>
  )
})
