import { Theme as MUITheme, ThemeOptions as MUIThemeOptions } from "@mui/material/styles"

declare module "@mui/material/styles" {
  interface Theme {
    background: {
      sectionBackground: string
    }
  }

  interface ThemeOptions {
    background?: {
      sectionBackground?: string
    }
  }
}
