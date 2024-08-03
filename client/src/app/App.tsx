import {
  CssBaseline,
} from "@mui/material"
import * as React from "react"
import { Box } from "shared/ui/box"
import { menu, menuBottom } from "widgets/Sidebar/constants"
import { Sidebar } from "widgets/Sidebar/ui/sidebar"
import { Suspense } from "react"
import { routeConfig } from "shared/config/route-config"
import { LangContext } from "shared/context/Lang"
import { Route, Routes } from "react-router-dom"

export const Pages = () => (
  <Box sx={{
    width: 1,
    height: 1,
    boxShadow: "0px 0px 5px 0px rgba(66,68,90,.37)",
    background: ({ background }) => background.sectionBackground,
    borderRadius: 2,
  }}
  >
    <Routes>
      {Object.entries(routeConfig).map(([key, route]) => (
        <Route
          key={key}
          path={route.path}
          element={(
            <Suspense fallback="Загрузка">
              <LangContext lang={key}>
                {route.element}
              </LangContext>
            </Suspense>
            )}
        />
      ))}
    </Routes>
  </Box>
)

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
