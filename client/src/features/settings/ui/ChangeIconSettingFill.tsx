import { useAppDispatch, useAppSelector } from "shared/lib/hooks"
import { RootState } from "app/providers/Store"
import { ChangeEvent } from "react"
import { Checkbox, FormControlLabel } from "@mui/material"
import { Text } from "shared/ui/Text"
import { changeIconSettings } from "features/settings/model/SettingsSlice"

export const ChangeIconSettingFill = () => {
  const fillIcon = useAppSelector((state: RootState) => state.settings.fillIcon)

  const dispatch = useAppDispatch()

  const handleOnChangeIconFill = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeIconSettings({ fillIcon: event.target.checked ? 1 : 0 }))
  }

  return (
    <FormControlLabel
      control={(
        <Checkbox
          onChange={handleOnChangeIconFill}
          checked={!!fillIcon}
        />
      )}
      label={<Text name="fill-icons" onlyText />}
    />
  )
}
