import { useState } from "react"
import { Tabs } from "shared/ui/tabs/tabs"
import { Tab } from "shared/ui/tabs/tab"
import Box from "@mui/material/Box"
import * as React from "react"
import { RowSettings } from "features/categories/ui/copy-settings/row-settings"
import { InputSettings } from "features/categories/ui/copy-settings/input-settings"
import { observer } from "mobx-react-lite"
import { useStores } from "features/categories/model/context"

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

  return (
    <>
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
            sx={{ width: "50%" }}
          />
        ))}
      />

      <Box sx={{ mt: 1 }}>
        {selectedTab === 0 && (
          <RowSettings
            buttonGroups={buttonGroups}
            settings={settings}
            onChangeSettings={onChangePasteSettings}
          />
        )}
        {selectedTab === 1 && (
          <InputSettings
            onChangeSettingInput={onChangeSettingInput}
            settingInputs={settingInputs}
          />
        )}
      </Box>
    </>
  )
})
