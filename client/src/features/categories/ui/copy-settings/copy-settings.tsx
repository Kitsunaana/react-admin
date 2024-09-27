import { useEffect, useRef, useState } from "react"
import { Tabs } from "shared/ui/tabs/tabs"
import { Tab } from "shared/ui/tabs/tab"
import { RowSettings } from "features/categories/ui/copy-settings/row-settings"
import { InputSettings } from "features/categories/ui/copy-settings/input-settings"
import { observer } from "mobx-react-lite"
import { useStores } from "features/categories/model/context"
import { TabPanel } from "shared/ui/tabs/tab-panel"

const tabs = [{ id: 0, caption: "rows" }, { id: 1, caption: "inputs" }]
const buttonGroups = ["images", "characteristics", "tags"]

export const CopySettings = observer(() => {
  const {
    settingsRows,
    settingsFields,
    handleChangeSettingsFields,
    handleChangeSettingsRows,
  } = useStores()

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
          <RowSettings
            ref={tabPanelRowsRef}
            settings={settingsRows}
            buttonGroups={buttonGroups}
            onChangeSettingsRows={handleChangeSettingsRows}
          />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <InputSettings
            ref={tabPanelInputsRef}
            settings={settingsFields}
            onChangeSettingsFields={handleChangeSettingsFields}
          />
        </TabPanel>
      </div>
    </>
  )
})
