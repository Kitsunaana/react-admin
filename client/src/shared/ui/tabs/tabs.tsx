import {
  TabsProps as BaseTabsProps,
  Tabs as MUITabs,
  tabsClasses,
  tabScrollButtonClasses,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { memo, ReactNode } from "react"
import { Divider } from "shared/ui/divider"

const StyledTabs = styled(MUITabs)(() => ({
  minHeight: 0,

  [`& .${tabsClasses.scrollButtons}`]: {
    opacity: 0.75,
    width: "auto",

    [`&.${tabScrollButtonClasses.disabled}`]: {
      opacity: "0.25 !important",
    },
  },
}))

interface TabsProps extends BaseTabsProps {
  tab: number
  tabs: ReactNode
}

export const Tabs = memo((props: TabsProps) => {
  const {
    tab,
    tabs,
    ...other
  } = props

  return (
    <>
      <StyledTabs
        {...other}
        value={tab}
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{
          sx: {
            display: "none",
          },
        }}
      >
        {tabs}
      </StyledTabs>
      <Divider />
    </>
  )
})
