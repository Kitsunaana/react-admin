import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useMemo } from "react"
import { alpha, PaletteMode, useMediaQuery } from "@mui/material"
import { useAppSelector } from "shared/lib/hooks"
import { RootState } from "app/providers/store"

const Theme = (props) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-schemas: dark)")

  const mode = useAppSelector((state: RootState) => state.settings.theme)

  const theme = useMemo(() => {
    const calcMode = mode === "system" ? (prefersDarkMode ? "dark" : "light") : mode

    const { palette } = createTheme({
      palette: { mode: calcMode as PaletteMode },
    })

    const { primary, warning } = palette

    return createTheme({
      background: {
        sectionBackground: calcMode === "dark"
          ? "linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))"
          : "#fff",
        gradient: {
          primary: `linear-gradient(180deg, ${alpha(primary.main, 0.1)} 20%, ${alpha("#000", 0)} 100%)`,
          warning: `linear-gradient(180deg, ${alpha(warning.main, 0.1)} 20%, ${alpha("#000", 0)} 100%)`,
        },
        hatch: {
          warning: `linear-gradient(315deg, #0000 48%, ${alpha(warning.main, 0.35)} 50%, #0000 52%)`,
          primary: `linear-gradient(315deg, #0000 48%, ${alpha(primary.main, 0.35)} 50%, #0000 52%)`,
        },
      },
      palette: {
        mode: calcMode as PaletteMode,
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
        MuiAutocomplete: {
          styleOverrides: {
            paper: {
              backgroundImage: calcMode === "dark"
                ? "linear-gradient(rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.13))"
                : "#fff",
            },
          },
        },
      },
    })
  }, [prefersDarkMode, mode])

  return <ThemeProvider theme={theme} {...props} />
}

export { Theme as ThemeProvider }