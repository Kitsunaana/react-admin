import Divider from "@mui/material/Divider"
import { ButtonGroup } from "shared/ui/buttons/toggle-button"
import { Text } from "shared/ui/text"
import { Action, KeysSettingsRows } from "../../model/types"

interface SettingsRowsProps {
  settings: Record<string, string>
  onChangeSettingsRows: (name: KeysSettingsRows, value: Action) => void
}

const buttonGroups = ["images", "characteristics", "tags"] as const
const actions = ["replace", "none", "add"]

export const SettingsRows = (props: SettingsRowsProps) => {
  const { settings, onChangeSettingsRows } = props

  return (
    <div>
      {buttonGroups.map((groups) => (
        <div key={groups}>
          <Divider sx={{ fontSize: 12, textTransform: "uppercase" }}>
            <Text name={`rows.${groups}`} sx={{ my: 0.5 }} />
          </Divider>
          <ButtonGroup
            name={groups}
            options={actions}
            defaultValue={settings[groups]}
            onChange={(name, value) => onChangeSettingsRows(name as KeysSettingsRows, value as Action)}
          />
        </div>
      ))}
    </div>
  )
}
