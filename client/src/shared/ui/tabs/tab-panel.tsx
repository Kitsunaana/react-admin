import { ReactNode } from "react"

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
    <div
      style={{
        height: "100%",
        width: "100%",
        opacity: value !== index ? 0 : 1,
        transition: "0.3s",
        position: "absolute",
        right: 0,
        visibility: value !== index ? "hidden" : "visible",
      }}
      role="tabpanel"
      {...other}
    >
      {children}
    </div>
  )
}
