import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import * as React from "react"
import { observer } from "mobx-react-lite"
import { useMemo } from "react"

interface InputSettingsProps {
  onChangeSettingInput: (name: string, value: boolean) => void
  settingInputs: Record<string, boolean>
}

export const InputSettings = observer((props: InputSettingsProps) => {
  const { settingInputs, onChangeSettingInput } = props

  return (
    <FormGroup sx={{ mx: 1 }}>
      {Object.entries(settingInputs).map(([key, value]) => (
        useMemo(() => (
          <FormControlLabel
            sx={{ userSelect: "none" }}
            key={key}
            label={key}
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
})
