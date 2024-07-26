import * as React from "react"
import { memo } from "react"
import { TabPanel } from "shared/ui/tab-panel"
import { CaptionInput, CategorySelect } from "./parameters"
import { Description } from "./description"

interface DialogContentProps {
  tab: number
}

export const DialogContent = memo((props: DialogContentProps) => {
  const { tab } = props

  return (
    <>
      <TabPanel value={tab} index={0}>
        <>
          <CategorySelect />
          <CaptionInput />
        </>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Description />
      </TabPanel>
    </>
  )
})
