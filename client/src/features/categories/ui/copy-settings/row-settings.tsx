import Divider from "@mui/material/Divider"
import { Text } from "shared/ui/text"
import { ButtonGroup } from "shared/ui/buttons/toggle-button"
import * as React from "react"

interface RowSettingsProps {
  buttonGroups: string[]
  settings: Record<string, string>
  onChangeSettings: (name: string, value: string) => void
}

export const RowSettings = (props: RowSettingsProps) => {
  const { buttonGroups, settings, onChangeSettings } = props

  return (
    <>
      {
        buttonGroups.map((groups) => (
          <div key={groups}>
            <Divider sx={{ fontSize: 12, textTransform: "lowercase" }}>
              <Text name={groups} />
            </Divider>
            <ButtonGroup
              name={groups}
              onChangeSettings={onChangeSettings}
              defaultValue={settings[groups]}
            />
          </div>
        ))
      }
    </>
  )
}
