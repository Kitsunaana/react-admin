import {
  CssBaseline,
} from "@mui/material"
import * as React from "react"
import { Box } from "shared/ui/Box"
import { menu, menuBottom } from "widgets/Sidebar/constants"
import { Sidebar } from "widgets/Sidebar/ui/Sidebar"
import { Suspense, useEffect, useState } from "react"
import { addEvent } from "shared/lib/event"
import { routeConfig } from "shared/config/routeConfig"

export const Pages = () => {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => addEvent("route", (data) => {
    window.history.replaceState({}, "", `/${data.route}`)

    setPath(window.location.pathname)
  }), [])

  return (
    <Box sx={{
      width: 1,
      height: 1,
      boxShadow: "0px 0px 5px 0px rgba(66,68,90,.37)",
      background: ({ background }) => background.sectionBackground,
      borderRadius: 2,
    }}
    >
      <Suspense fallback={<div>loader</div>}>
        {Object.entries(routeConfig).map(([key, route]) => (
          <Box key={key}>{route.path === path && route.element}</Box>
        ))}
      </Suspense>
    </Box>
  )
}

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

    <Pages />
  </Box>
)
