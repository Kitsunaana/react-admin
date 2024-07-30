import { Theme as MUITheme, ThemeOptions as MUIThemeOptions } from "@mui/material/styles"

declare module "@mui/material/styles" {
  interface Theme {
    background: {
      sectionBackground: string
      gradient: {
        primary: string
        warning: string
      }
      hatch: {
        warning: string
        primary: string
      }
    }
  }

  interface ThemeOptions {
    background?: {
      sectionBackground?: string
      gradient?: {
        primary?: string
        warning?: string
      }
      hatch?: {
        warning?: string
        primary?: string
      }
    }
  }
}
