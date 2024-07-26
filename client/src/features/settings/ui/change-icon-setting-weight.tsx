import { Slider } from "@mui/material"
import { useAppDispatch, useAppSelector } from "shared/lib/hooks"
import { RootState } from "app/providers/store"
import { changeIconSettings } from "features/settings/model/settings-slice"

export const ChangeIconSettingWeight = () => {
  const weightIcon = useAppSelector((state: RootState) => state.settings.weightIcon)

  const dispatch = useAppDispatch()

  const handleOnChangeIconThickness = (event: Event, value: number | Array<unknown>) => {
    if (typeof value === "number") {
      dispatch(changeIconSettings({ weightIcon: value }))
    }
  }

  return (
    <Slider
      onChange={handleOnChangeIconThickness}
      value={weightIcon}
      valueLabelDisplay="auto"
      shiftStep={30}
      step={100}
      marks
      min={100}
      max={700}
    />
  )
}
