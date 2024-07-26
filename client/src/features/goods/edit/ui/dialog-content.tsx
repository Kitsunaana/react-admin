import * as React from "react"
import { memo } from "react"
import { TabPanel } from "shared/ui/tab-panel"
import { ControllerSelect } from "features/goods/filters/ui/category-select"
import { CaptionInput, CategorySelect } from "./parameters"
import { Description } from "./description"

const categoryList = [{ id: 1, value: "Option 1" }, { id: 2, value: "Option 2" }]

interface DialogContentProps {
  tab: number
}

export const DialogContent = memo((props: DialogContentProps) => {
  const { tab } = props

  return (
    <>
      <TabPanel value={tab} index={0}>
        <>
          <ControllerSelect options={categoryList} />
          <CaptionInput />
        </>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Description />
      </TabPanel>
    </>
  )
})
