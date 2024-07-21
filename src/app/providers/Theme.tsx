import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useEffect, useMemo, useState } from "react"
import { alpha, PaletteMode, useMediaQuery } from "@mui/material"
import { addEvent } from "shared/lib/event"
import { useAppSelector } from "shared/lib/hooks"
import { RootState } from "app/providers/Store"

const Theme = (props) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-schemas: dark)")

  const mode = useAppSelector((state: RootState) => state.settings.theme)

  const theme = useMemo(() => {
    const calcMode = mode === "system" ? (prefersDarkMode ? "dark" : "light") : mode

    const defTheme = createTheme({
      palette: { mode: calcMode as PaletteMode },
    })

    return createTheme({
      background: {
        sectionBackground: calcMode === "dark"
          ? "linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))"
          : "#fff",
        gradient: {
          primary: `linear-gradient(180deg, ${alpha(defTheme.palette.primary.main, 0.1)} 20%, ${alpha("#000", 0)} 100%)`,
        },
        hatch: {
          warning: `linear-gradient(315deg, #0000 48%, ${
            alpha(defTheme.palette.warning.main, 0.35)} 50%, #0000 52%)`,
        },
      },
      palette: {
        mode: calcMode as PaletteMode,
        background: {
          /* sectionBackground: theme === "dark"
            ? "linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))"
            : "#fff", */
          /* strong: theme === "dark"
            ? "rgba(255, 255, 255, 0.3)"
            : "rgba(0, 0, 0, 0.26)",
          gradient: {
            primary: `linear-gradient(180deg, ${defTheme.palette.primary.main} 0%, ${defTheme.palette.primary.light} 100%)`,
          }, */
        },
      },
      typography: {
        fontFamily: "'Nunito Sans', sans-serif",
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            "&::-webkit-scrollbar": {
              width: 2,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#c9c9c9",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#989898",
            },
          },
        },
      },
    })
  }, [prefersDarkMode, mode])

  return <ThemeProvider theme={theme} {...props} />
}

export { Theme as ThemeProvider }
