import {
  CssBaseline, useTheme,
} from "@mui/material"
import { Box } from "shared/ui/box"
import { menu, menuBottom } from "widgets/Sidebar/constants"
import { Sidebar } from "widgets/Sidebar/ui/sidebar"
import { Suspense, useEffect, useState } from "react"
import { routeConfig } from "shared/config/route-config"
import { LangContext } from "shared/context/Lang"
import { Route, Routes } from "react-router-dom"
import { Spinner } from "shared/ui/spinner"
import { Gallery } from "widgets/galerry"
import { ToastContainer } from "react-toastify"
import { useAppSelector } from "shared/lib/hooks"

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

export const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(true)
  const theme = useAppSelector((state) => state.settings.theme)

  useEffect(() => {
    const event = () => {
      console.log("load")

      setFontsLoaded(true)
    }

    window.addEventListener("load", event)
    return () => window.removeEventListener("load", event)
  }, [])

  return (
    <Box sx={{
      height: "100vh",
      p: 1.5,
      display: "flex",
    }}
    >
      <Box sx={{
        height: "100vh",
        width: "100vw",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100000000,
        top: 0,
        right: 0,
        visibility: fontsLoaded ? "hidden" : "visible",
      }}
      >
        <Box sx={{ fontSize: 32 }}>Подождите, идет загрузка</Box>
      </Box>

      <CssBaseline />

      <Box sx={{
        display: "flex",
        transition: "0.5s",
        width: 1,
        gap: 1.5,
        ...(fontsLoaded ? {
          visibility: "visible",
          opacity: 1,
        } : {
          visibility: "hidden",
          opacity: 0,
        }),
      }}
      >
        <LangContext lang="sidebar">
          <Sidebar menu={menu} menuBottom={menuBottom} />
        </LangContext>

        <Gallery />
        <Pages />
      </Box>

      <ToastContainer
        autoClose={3000}
        closeOnClick
        position="top-center"
        toastStyle={{
          maxWidth: "500px !important",
        }}
        style={{
          width: "unset",
        }}
        theme={(() => (theme === "light" ? "light" : theme === "dark" ? "dark" : "light"))()}
      />
    </Box>
  )
}
