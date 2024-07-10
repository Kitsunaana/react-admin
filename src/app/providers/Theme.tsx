import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useMemo } from "react"

type TypeTheme = "light" | "dark"

const Theme = (props) => {
  const theme = useMemo(() => {
    const defTheme = createTheme({
      palette: { mode: "light" },
    })

    const theme: TypeTheme = "light"

    return createTheme({
      background: {
        // @ts-ignore
        sectionBackground: theme === "dark"
          ? "linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))"
          : "#fff",
      },
      palette: {
        mode: theme,
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
  }, [])

  return <ThemeProvider theme={theme} {...props} />
}

export { Theme as ThemeProvider }
