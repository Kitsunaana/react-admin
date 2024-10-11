import Divider from "@mui/material/Divider"
import { forwardRef } from "react"
import { ButtonGroup } from "shared/ui/buttons/toggle-button"
import { Text } from "shared/ui/text"
import { Action, KeysSettingsRows } from "../../model/types"

interface SettingsRowsProps {
  settings: Record<string, string>
  onChangeSettingsRows: (name: KeysSettingsRows, value: Action) => void
}

const buttonGroups = ["images", "characteristics", "tags"] as const

export const SettingsRows = forwardRef<HTMLDivElement, SettingsRowsProps>((props, ref) => {
  const { settings, onChangeSettingsRows } = props

  return (
    <div ref={ref}>
      {buttonGroups.map((groups) => (
        <div key={groups}>
          <Divider sx={{ fontSize: 12, textTransform: "uppercase" }}>
            <Text name={groups} sx={{ my: 0.5 }} />
          </Divider>
          <ButtonGroup
            name={groups}
            onChangeSetting={onChangeSettingsRows}
            defaultValue={settings[groups]}
          />
        </div>
      ))}
    </div>
  )
})
