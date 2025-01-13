import { ButtonGroup } from "shared/ui/buttons/toggle-button"
import { useSettingsStore } from "../../../view-model/setting/use-settings-store"
import { KeysSettingsRows } from "../../../view-model/setting/settings-types"
import { Divider, Caption } from "./styles"

const buttonGroups = ["images", "characteristics", "tags"] as const
const actions = ["replace", "none", "add"]

export const Rows = () => {
  const onChange = useSettingsStore((store) => store.changeRows)
  const settings = useSettingsStore((store) => store.settingsRows)

  return (
    <>
      {buttonGroups.map((groups) => (
        <div key={groups}>
          <Divider>
            <Caption name={`rows.${groups}`} />
          </Divider>
          <ButtonGroup
            name={groups}
            options={actions}
            defaultValue={settings[groups]}
            onChange={(name, value) => onChange(name as keyof KeysSettingsRows, value)}
          />
        </div>
      ))}
    </>
  )
}
