import { memo, ReactNode } from "react"
import {
  Tabs as MUITabs,
  TabsProps as BaseTabsProps,
  tabsClasses,
  tabScrollButtonClasses,
} from "@mui/material"
import { Divider } from "shared/ui/divider"

interface TabsProps extends BaseTabsProps {
  tab: number
  hasError?: boolean
  tabs: ReactNode
}

export const Tabs = memo((props: TabsProps) => {
  const {
    tab,
    tabs,
    sx,
    hasError = false,
    ...other
  } = props

  return (
    <>
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
            display: "none",
            backgroundColor: ({ palette }) => (hasError ? palette.warning.main : undefined),
          },
        }}
        sx={{
          minHeight: 0,

          [`& .${tabsClasses.scrollButtons}`]: {
            opacity: 0.75,
            width: "auto",

            [`&.${tabScrollButtonClasses.disabled}`]: {
              opacity: "0.25 !important",
            },
          },

          ...sx,
        }}
      >
        {tabs}
      </MUITabs>
      <Divider />
    </>
  )
})
