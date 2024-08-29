import { observer } from "mobx-react-lite"
import { Slider, SliderProps } from "@mui/material"
import { Icon } from "shared/ui/icon"
import { useStores } from "../../../model/context"

interface ChangeBlurProps extends SliderProps {}

export const ChangeBlur = observer((props: ChangeBlurProps) => {
  const { photoPosition } = useStores()

  return (
    <Slider
      onChange={(event, value) => {
        photoPosition.changeBlur(Array.isArray(value) ? 0 : value)
      }}
      value={photoPosition.blur}
      valueLabelDisplay="auto"
      defaultValue={5}
      max={20}
      marks={[{ value: 10, label: <Icon name="zoomEffect" fontSize="small" /> }]}
      {...props}
    />
  )
})
