import * as React from "react"
import { TabPanel } from "shared/ui/TabPanel"
import { CaptionInput, CategorySelect } from "pages/Goods/ui/Dialog/Parameters"
import { Description } from "pages/Goods/ui/Dialog/Description"
import { memo } from "react"

interface DialogContentProps {
  tab: number
}

export const DialogContent = memo((props: DialogContentProps) => {
  const {
    tab,
  } = props

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
