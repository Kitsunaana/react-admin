import { Checkbox, FormControlLabel } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useMemo } from "react"
import { useLang } from "shared/context/lang"
import { KeysSettingsFields } from "../../../domain/settings"
import { useSettingsStore } from "../../../model/settings/use-settings-store"
import { Container, Caption } from "./styles"

export const Fields = observer(() => {
  const langBase = useLang("fields")

  const onChange = useSettingsStore((store) => store.changeFields)
  const settings = useSettingsStore((store) => store.settingsFields)

  return (
    <Container>
      {Object.entries(settings).map(([key, value]) => (
        useMemo(() => (
          <FormControlLabel
            key={key}
            label={(
              <Caption
                langBase={langBase}
                name={key}
              />
            )}
            control={(
              <Checkbox
                size="small"
                checked={value}
                onChange={(_, checked) => onChange(key as KeysSettingsFields, checked)}
              />
            )}
          />
        ), [value])
      ))}
    </Container>
  )
})
