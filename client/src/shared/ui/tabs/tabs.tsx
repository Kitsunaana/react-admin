import * as React from "react"
import {
  memo, ReactNode,
} from "react"
import {
  Tabs as MUITabs, useTheme, TabsProps as BaseTabsProps, Box,
} from "@mui/material"
import { Divider } from "shared/ui/divider"

interface TabsProps extends BaseTabsProps {
  tab: number
  hasError: boolean
  tabs: ReactNode
}

export const Tabs = memo((props: TabsProps) => {
  const {
    tab, hasError, tabs, sx, ...other
  } = props

  const { palette } = useTheme()

  return (
    <Box>
      <MUITabs
        {...other}
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
            display: "none",
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
          ...sx,
        }}
      >
        {tabs}
      </MUITabs>
      <Divider />
    </Box>
  )
})
