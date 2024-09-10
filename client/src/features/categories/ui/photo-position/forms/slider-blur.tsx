import { Slider, SliderProps } from "@mui/material"
import { Icon } from "shared/ui/icon"
import { Controller } from "react-hook-form"
import { eventBus } from "shared/lib/event-bus"
import { updateCaption } from "features/categories/ui/tabs/tab-common"

interface ChangeBlurProps extends SliderProps {}

export const ChangeBlur = (props: ChangeBlurProps) => (
  <Controller
    name="blur"
    defaultValue={1}
    render={({ field }) => (
      <Slider
        {...field}
        valueLabelDisplay="auto"
        max={20}
        marks={[{ value: 10, label: <Icon name="zoomEffect" fontSize="small" /> }]}
        onChange={(event, value) => {
          field.onChange(value)
          eventBus.emit(updateCaption({
            blur: Array.isArray(value) ? value[0] : value,
          }))
        }}
        {...props}
      />
    )}
  />
)
