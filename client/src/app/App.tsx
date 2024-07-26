import {
  CssBaseline,
} from "@mui/material"
import * as React from "react"
import { Box } from "shared/ui/box"
import { menu, menuBottom } from "widgets/Sidebar/constants"
import { Sidebar } from "widgets/Sidebar/ui/sidebar"
import { Suspense, useEffect, useState } from "react"
import { addEvent, dispatch } from "shared/lib/event"
import { routeConfig } from "shared/config/route-config"
import { LangContext } from "shared/context/Lang"
import { actionParams } from "shared/lib/params"

export const Pages = () => {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => addEvent("route", (data) => {
    actionParams.replace(data.route)

    setPath(window.location.pathname)
  }), [])

  useEffect(() => window.addEventListener("popstate", (event) => {
    // console.log(event.state)
    if (event.state?.name) dispatch(event.state.name, { params: event.state?.params })
    // actionParams.replace(event.state?.name)

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
          <LangContext lang={key} key={key}>
            {route.path === path && route.element}
          </LangContext>
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

    <LangContext lang="sidebar">
      <Sidebar menu={menu} menuBottom={menuBottom} />
    </LangContext>

    <Pages />
  </Box>
)
