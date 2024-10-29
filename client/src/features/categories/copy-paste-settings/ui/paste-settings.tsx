import { observer } from "mobx-react-lite"
import { useEffect, useRef, useState } from "react"
import { LangContext, useLang } from "shared/context/lang"
import { Tab } from "shared/ui/tabs/tab"
import { TabPanel } from "shared/ui/tabs/tab-panel"
import { Tabs } from "shared/ui/tabs/tabs"
import { SettingsFields } from "./settings-fields"
import { SettingsRows } from "./settings-rows"

const tabs = [{ id: 0, caption: "rows" }, { id: 1, caption: "fields" }]

export const PasteSettings = observer(() => {
  const langBase = useLang()

  const {
    settingsRows,
    settingsFields,
    handleChangeSettingsFields,
    handleChangeSettingsRows,
  } = useCategoryStores()

  const [selectedTab, setSelectedTab] = useState(0)
  const [height, setHeight] = useState(0)

  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      const children = Array.from(ref.current?.children)

      children.forEach((child) => {
        const index = parseInt(child.getAttribute("data-index") ?? "0", 10)

        if (index === selectedTab) setHeight(child.children[0].clientHeight)
      })
    }
  }, [selectedTab])

  return (
    <>
      <LangContext lang={`${langBase}.tabs`}>
        <Tabs
          tab={selectedTab}
          tabs={tabs.map((tab) => (
            <Tab
              id={tab.id}
              key={tab.id}
              icon={tab.caption}
              caption={tab.caption}
              isActive={tab.id === selectedTab}
              changeTab={setSelectedTab}
            />
          ))}
        />
      </LangContext>

      <div ref={ref} style={{ position: "relative", height }}>
        <TabPanel value={selectedTab} index={0} data-index="0">
          <SettingsRows
            settings={settingsRows}
            onChangeSettingsRows={handleChangeSettingsRows}
          />
        </TabPanel>
        <TabPanel value={selectedTab} index={1} data-index="1">
          <SettingsFields
            settings={settingsFields}
            onChangeSettingsFields={handleChangeSettingsFields}
          />
        </TabPanel>
      </div>
    </>
  )
})
