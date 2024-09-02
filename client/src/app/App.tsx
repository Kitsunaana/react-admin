import {
  CssBaseline, useTheme,
} from "@mui/material"
import * as React from "react"
import { Box } from "shared/ui/box"
import { menu, menuBottom } from "widgets/Sidebar/constants"
import { Sidebar } from "widgets/Sidebar/ui/sidebar"
import { Suspense } from "react"
import { routeConfig } from "shared/config/route-config"
import { LangContext } from "shared/context/Lang"
import { Route, Routes } from "react-router-dom"
import { Spinner } from "shared/ui/spinner"
import { Gallery } from "widgets/galerry"
import { Backdrop } from "shared/ui/backdrop"

export const Pages = () => {
  const { palette } = useTheme()

  return (
    <Box
      flex
      sx={{
        width: 1,
        height: 1,
        boxShadow: "0px 0px 5px 0px rgba(66,68,90,.37)",
        background: ({ background }) => background.sectionBackground,
        borderRadius: 3,
      }}
    >
      <Routes>
        {Object.entries(routeConfig).map(([key, route]) => (
          <Route
            key={key}
            path={route.path}
            element={(
              <Suspense fallback={(
                <Box flex grow ai jc>
                  <Spinner
                    color={palette.warning.dark}
                    height={100}
                    width={100}
                  />
                </Box>
              )}
              >
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

    <Gallery />
    <Backdrop />

    <Pages />
  </Box>
)
