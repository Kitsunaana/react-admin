import { Checkbox, FormControlLabel } from "@mui/material"
import { observer } from "mobx-react-lite"
import { Text } from "shared/ui/text"
import { useAppSettings } from "shared/lib/app-settings"

export const IconFill = observer(() => {
  const fillIcon = useAppSettings((store) => store.iconSettings.fillIcon)
  const changeIconSetting = useAppSettings((store) => store.changeIconSettings)

  return (
    <FormControlLabel
      label={<Text name="changeFillIcons" onlyText />}
      control={(
        <Checkbox
          checked={Boolean(fillIcon)}
          onChange={({ target }) => changeIconSetting({ fillIcon: target.checked ? 1 : 0 })}
        />
      )}
    />
  )
})
