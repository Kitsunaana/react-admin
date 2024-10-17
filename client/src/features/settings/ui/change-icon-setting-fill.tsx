import { Checkbox, FormControlLabel } from "@mui/material"
import { observer } from "mobx-react-lite"
import { ChangeEvent } from "react"
import { Text } from "shared/ui/text"
import { useSettings } from "../model/context"

export const ChangeIconSettingFill = observer(() => {
  const settings = useSettings()

  const handleOnChangeIconFill = (event: ChangeEvent<HTMLInputElement>) => {
    settings.onChangeIconSettings({ fillIcon: event.target.checked ? 1 : 0 })
  }

  return (
    <FormControlLabel
      control={(
        <Checkbox
          onChange={handleOnChangeIconFill}
          checked={!!settings.iconSettings.fillIcon}
        />
      )}
      label={<Text name="changeFillIcons" onlyText />}
    />
  )
})
