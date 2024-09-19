import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import * as React from "react"
import { observer } from "mobx-react-lite"
import { forwardRef, useMemo } from "react"
import { Text } from "shared/ui/text"
import { useLang } from "shared/context/lang"

interface InputSettingsProps {
  onChangeSettingInput: (name: string, value: boolean) => void
  settingInputs: Record<string, boolean>
}

export const InputSettings = observer(forwardRef<HTMLDivElement, InputSettingsProps>((props, ref) => {
  const { settingInputs, onChangeSettingInput } = props
  const langBase = useLang()

  return (
    <FormGroup ref={ref} sx={{ mx: 1 }}>
      {Object.entries(settingInputs).map(([key, value]) => (
        useMemo(() => (
          <FormControlLabel
            sx={{ userSelect: "none" }}
            key={key}
            label={<Text langBase={`${langBase}.inputs`} sx={{ maxWidth: 250 }} name={key} />}
            control={(
              <Checkbox
                size="small"
                checked={value}
                onChange={(_, checked) => onChangeSettingInput(key, checked)}
              />
            )}
          />
        ), [value])
      ))}
    </FormGroup>
  )
}))
