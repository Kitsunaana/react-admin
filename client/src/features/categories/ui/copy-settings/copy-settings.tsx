import { useEffect, useRef, useState } from "react"
import { Tabs } from "shared/ui/tabs/tabs"
import { Tab } from "shared/ui/tabs/tab"
import Box from "@mui/material/Box"
import * as React from "react"
import { RowSettings } from "features/categories/ui/copy-settings/row-settings"
import { InputSettings } from "features/categories/ui/copy-settings/input-settings"
import { observer } from "mobx-react-lite"
import { useStores } from "features/categories/model/context"
import { LangContext, useLang } from "shared/context/lang"
import { TabPanel } from "shared/ui/tabs/tab-panel"

interface CopySettingsProps {
  onChangeSettings: (name: string, value: string) => void
  onChangeSettingInput: (name: string, value: boolean) => void
  buttonGroups: string[]
  settings: Record<string, string>
  settingInputs: Record<string, boolean>
}

export const CopySettings = observer((props: CopySettingsProps) => {
  const { buttonGroups } = props

  const {
    settingInputs,
    settings,
    onChangeSettingInput,
    onChangePasteSettings,
  } = useStores()

  const [selectedTab, setSelectedTab] = useState(0)
  const [height, setHeight] = useState(0)
  const langBase = useLang()

  const tabPanelRowsRef = useRef<null | HTMLDivElement>(null)
  const tabPanelInputsRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (selectedTab === 0) setHeight(tabPanelRowsRef.current?.clientHeight ?? 0)

    if (selectedTab === 1) setHeight(tabPanelInputsRef.current?.clientHeight ?? 0)
  }, [selectedTab])

  return (
    <>
      <LangContext lang={`${langBase}.tabs`}>
        <Tabs
          hasError={false}
          tab={selectedTab}
          tabs={[{ id: 0, caption: "rows" }, { id: 1, caption: "inputs" }].map((tab) => (
            <Tab
              key={tab.id}
              id={tab.id}
              caption={tab.caption}
              icon={tab.caption}
              isActive={tab.id === selectedTab}
              changeTab={setSelectedTab}
            />
          ))}
        />
      </LangContext>

      <div style={{ position: "relative", height }}>
        <TabPanel value={selectedTab} index={0}>
          <LangContext lang={`${langBase}.rows`}>
            <RowSettings
              ref={tabPanelRowsRef}
              buttonGroups={buttonGroups}
              settings={settings}
              onChangeSettings={onChangePasteSettings}
            />
          </LangContext>
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <InputSettings
            ref={tabPanelInputsRef}
            onChangeSettingInput={onChangeSettingInput}
            settingInputs={settingInputs}
          />
        </TabPanel>
        {/* {selectedTab === 0 && (
          <LangContext lang={`${langBase}.rows`}>
            <RowSettings
              buttonGroups={buttonGroups}
              settings={settings}
              onChangeSettings={onChangePasteSettings}
            />
          </LangContext>
        )}
        {selectedTab === 1 && (
          <InputSettings
            onChangeSettingInput={onChangeSettingInput}
            settingInputs={settingInputs}
          />
        )} */}
      </div>
    </>
  )
})
