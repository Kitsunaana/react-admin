import { observer } from "mobx-react-lite"
import { useEffect, useRef, useState } from "react"
import { Tab } from "shared/ui/tabs/tab"
import { TabPanel } from "shared/ui/tabs/tab-panel"
import { Tabs } from "shared/ui/tabs/tabs"
import { useCategoryStores } from "../../model/context"
import { SettingsFields } from "./settings-fields"
import { SettingsRows } from "./settings-rows"

const tabs = [{ id: 0, caption: "rows" }, { id: 1, caption: "inputs" }]

export const PasteSettings = observer(() => {
  const {
    settingsRows,
    settingsFields,
    handleChangeSettingsFields,
    handleChangeSettingsRows,
  } = useCategoryStores()

  const [selectedTab, setSelectedTab] = useState(0)
  const [height, setHeight] = useState(0)

  const tabPanelRowsRef = useRef<null | HTMLDivElement>(null)
  const tabPanelInputsRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (selectedTab === 0) setHeight(tabPanelRowsRef.current?.clientHeight ?? 0)
    if (selectedTab === 1) setHeight(tabPanelInputsRef.current?.clientHeight ?? 0)
  }, [selectedTab])

  return (
    <>
      <Tabs
        tab={selectedTab}
        tabs={tabs.map((tab) => (
          <Tab
            id={tab.id}
            key={tab.id}
            icon={tab.caption}
            caption="tab.caption"
            isActive={tab.id === selectedTab}
            changeTab={setSelectedTab}
          />
        ))}
      />

      <div style={{ position: "relative", height }}>
        <TabPanel value={selectedTab} index={0}>
          <SettingsRows
            ref={tabPanelRowsRef}
            settings={settingsRows}
            onChangeSettingsRows={handleChangeSettingsRows}
          />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <SettingsFields
            ref={tabPanelInputsRef}
            settings={settingsFields}
            onChangeSettingsFields={handleChangeSettingsFields}
          />
        </TabPanel>
      </div>
    </>
  )
})
