import * as React from "react"
import {
  memo, ReactNode, useEffect, useState,
} from "react"
import {
  Tabs as MUITabs, useTheme,
} from "@mui/material"
import { useFormContext } from "react-hook-form"

interface TabsProps {
  tab: number
  hasError: boolean
  tabs: ReactNode
}

export const Tabs = memo((props: TabsProps) => {
  const {
    tab, hasError, tabs,
  } = props

  const { palette } = useTheme()

  return (
    <MUITabs
      value={tab}
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
