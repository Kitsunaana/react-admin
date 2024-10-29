import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useMemo } from "react"
import { useLang } from "shared/context/lang"
import { Text } from "shared/ui/text"

interface InputSettingsProps {
  onChangeSettingsFields: (name: KeysSettingsFields, value: boolean) => void
  settings: Record<string, boolean>
}

export const SettingsFields = observer((props: InputSettingsProps) => {
  const { settings, onChangeSettingsFields } = props
  const langBase = useLang()

  return (
    <FormGroup sx={{ mx: 1 }}>
      {Object.entries(settings).map(([key, value]) => (
        useMemo(() => (
          <FormControlLabel
            sx={{ userSelect: "none" }}
            key={key}
            label={<Text langBase={`${langBase}.fields`} sx={{ maxWidth: 250 }} name={key} />}
            control={(
              <Checkbox
                size="small"
                checked={value}
                onChange={(_, checked) => onChangeSettingsFields(key as KeysSettingsFields, checked)}
              />
            )}
          />
        ), [value])
      ))}
    </FormGroup>
  )
})
