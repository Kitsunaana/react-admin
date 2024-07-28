import * as React from "react"
import { memo } from "react"
import { TabPanel } from "shared/ui/tab-panel"
import { Description, DescriptionInput } from "shared/ui/description"
import { CaptionInput, CategorySelect } from "./parameters"

interface DialogContentProps {
  tab: number
}

export const DialogContent = memo((props: DialogContentProps) => {
  const { tab } = props

  return (
    <>
      <TabPanel value={tab} index={0}>
        <>
          <CaptionInput sx={{ mb: 1 }} />
          <DescriptionInput />
        </>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Description />
      </TabPanel>
    </>
  )
})
