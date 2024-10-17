import { Slider } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useSettings } from "../model/context"

export const ChangeIconSettingWeight = observer(() => {
  const settings = useSettings()

  const handleOnChangeIconThickness = (_: Event, value: number | Array<unknown>) => {
    if (typeof value === "number") {
      settings.onChangeIconSettings({ weightIcon: value })
    }
  }

  return (
    <Slider
      onChange={handleOnChangeIconThickness}
      value={settings.iconSettings.weightIcon}
      valueLabelDisplay="auto"
      shiftStep={30}
      step={100}
      marks
      min={100}
      max={700}
    />
  )
})
