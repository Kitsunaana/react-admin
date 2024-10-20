import { styled } from "@mui/material/styles"
import { ReactNode } from "react"
import { Box, BoxProps } from "shared/ui/box"

interface TabProps extends BoxProps {
  hidden: boolean
}

const Tab = styled(
  ({ hidden, ...other }: TabProps) => <Box {...other} />,
)(({ hidden }) => ({
  height: "100%",
  width: "100%",
  opacity: hidden ? 0 : 1,
  transition: "0.3s",
  position: "absolute",
  right: 0,
  visibility: hidden ? "hidden" : "visible",
}))

interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
}

export const TabPanel = (props: TabPanelProps) => {
  const {
    children,
    value,
    index,
    ...other
  } = props

  return (
    <Tab
      hidden={index !== value}
      role="tabpanel"
      {...other}
    >
      {children}
    </Tab>
  )
}
