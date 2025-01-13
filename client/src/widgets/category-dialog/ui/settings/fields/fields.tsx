import { Checkbox, FormControlLabel } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useMemo } from "react"
import { useLang } from "shared/context/lang"
import { useSettingsStore } from "../../../view-model/setting/use-settings-store"
import { KeysSettingsFields } from "../../../view-model/setting/settings-types"
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
                onChange={(_, checked) => onChange(key as keyof KeysSettingsFields, checked)}
              />
            )}
          />
        ), [value])
      ))}
    </Container>
  )
})
