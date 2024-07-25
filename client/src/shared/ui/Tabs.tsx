import * as React from "react"
import {
  memo, ReactNode,
} from "react"
import {
  Tabs as MUITabs, useTheme,
} from "@mui/material"

interface TabsProps {
  tab: number
  onChange: (event: React.SyntheticEvent, newValue: number) => void
  hasError: boolean
  tabs: ReactNode
}

export const Tabs = memo((props: TabsProps) => {
  const {
    tab, onChange, hasError, tabs,
  } = props

  const { palette } = useTheme()

  return (
    <MUITabs
      value={tab}
      onChange={onChange}
      variant="scrollable"
      scrollButtons="auto"
      TabIndicatorProps={{
        sx: {
          top: 0,
          height: 3,
          borderRadius: 2,
          ...(hasError ? {
            backgroundColor: palette.warning.main,
          } : {}),
        },
      }}
      sx={{
        minHeight: 0,
        "& .MuiTabScrollButton-root": {
          opacity: "0.75 !important",
          width: "auto",
          "&.Mui-disabled": {
            opacity: "0.25 !important",
          },
        },
      }}
    >
      {tabs}
    </MUITabs>
  )
})
