import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import { observer } from "mobx-react-lite"
import { forwardRef, useMemo } from "react"
import { useLang } from "shared/context/lang"
import { Text } from "shared/ui/text"
import { KeysSettingsFields } from "../../model/types"

interface InputSettingsProps {
  onChangeSettingsFields: (name: KeysSettingsFields, value: boolean) => void
  settings: Record<string, boolean>
}

export const SettingsFields = observer(forwardRef<HTMLDivElement, InputSettingsProps>((props, ref) => {
  const { settings, onChangeSettingsFields } = props
  const langBase = useLang()

  return (
    <FormGroup ref={ref} sx={{ mx: 1 }}>
      {Object.entries(settings).map(([key, value]) => (
        useMemo(() => (
          <FormControlLabel
            sx={{ userSelect: "none" }}
            key={key}
            label={<Text langBase={`${langBase}.inputs`} sx={{ maxWidth: 250 }} name={key} />}
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
}))