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
      style={{ height: "100%" }}
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (children)}
    </div>
  )
}
