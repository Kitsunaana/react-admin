import Divider from "@mui/material/Divider"
import { Text } from "shared/ui/text"
import { ButtonGroup } from "shared/ui/buttons/toggle-button"
import { forwardRef } from "react"

interface RowSettingsProps {
  buttonGroups: string[]
  settings: Record<string, string>
  onChangeSettingsRows: (name: string, value: string) => void
}

export const RowSettings = forwardRef<HTMLDivElement, RowSettingsProps>((props, ref) => {
  const { buttonGroups, settings, onChangeSettingsRows } = props

  return (
    <div ref={ref}>
      {buttonGroups.map((groups) => (
        <div key={groups}>
          <Divider sx={{ fontSize: 12, textTransform: "uppercase" }}>
            <Text name={groups} sx={{ my: 0.5 }} />
          </Divider>
          <ButtonGroup
            name={groups}
            onChangeSettings={onChangeSettingsRows}
            defaultValue={settings[groups]}
          />
        </div>
      ))}
    </div>
  )
})
