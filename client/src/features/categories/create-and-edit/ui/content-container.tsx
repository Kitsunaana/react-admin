import { memo, useEffect, useState } from "react"
import { useLang } from "shared/context/Lang"
import { addEvent } from "shared/lib/event"
import { TabPanel } from "shared/ui/tab-panel"
import * as React from "react"
import { CommonTab } from "features/categories/create-and-edit/ui/tabs/common"
import { PhotosTab } from "features/categories/create-and-edit/ui/tabs/photos"
import { PhotoPosition } from "features/categories/create-and-edit/ui/tabs/photo-position"

export const ContentContainer = memo((props: { tab: number, langBase?: string}) => {
  const { tab: tabProps, langBase: langBaseProps } = props

  const lang = useLang()
  const langBase = langBaseProps ?? lang?.lang

  const [tab, setTab] = useState(tabProps)

  useEffect(() => addEvent(`${langBase}.changeTab` as any, ({ tab }: { tab: number }) => {
    setTab(tab)
  }), [])

  return (
    <>
      <TabPanel value={tab} index={0}><CommonTab /></TabPanel>
      <TabPanel value={tab} index={1}><PhotosTab /></TabPanel>
      {/* <TabPanel value={tab} index={2}><PhotoPosition /></TabPanel> */}
    </>
  )
})
