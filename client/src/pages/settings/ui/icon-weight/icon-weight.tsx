import { Slider } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useAppSettings } from "shared/lib/app-settings"

export const IconWeight = observer(() => {
  const changeIconSetting = useAppSettings((store) => store.changeIconSettings)
  const weightIcon = useAppSettings((store) => store.iconSettings.weightIcon)

  return (
    <Slider
      onChange={(_, value) => changeIconSetting({ weightIcon: Array.isArray(value) ? value[0] : value })}
      value={weightIcon}
      valueLabelDisplay="auto"
      shiftStep={30}
      step={100}
      marks
      min={100}
      max={700}
    />
  )
})
