import {
  CssBaseline,
} from "@mui/material"
import * as React from "react"
import { Sidebar } from "../widgets/Sidebar/Sidebar"
import { menu, menuBottom } from "../widgets/Sidebar/constants"
import { Box } from "../shared/ui/Box"

export const App = () => (
  <Box sx={{
    height: "100vh",
    p: 1.5,
    display: "flex",
    gap: 1.5,
  }}
  >
    <CssBaseline />

    <Sidebar open menu={menu} menuBottom={menuBottom} />

    <Box sx={{
      width: 1,
      height: 1,
      boxShadow: "0px 0px 5px 0px rgba(66,68,90,.37)",
      background: ({ background }) => background.sectionBackground,
      borderRadius: 2,
    }}
    />
  </Box>
)
