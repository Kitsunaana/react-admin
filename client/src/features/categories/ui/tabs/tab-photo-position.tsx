import { Box } from "shared/ui/box"
import { Text } from "shared/ui/text"
import { Controller, useFormContext } from "react-hook-form"
import { Checkbox, FormControlLabel, Slider } from "@mui/material"
import { ColorInput } from "shared/ui/form/input-color"
import { eventBus } from "shared/lib/event-bus"
import { updateCaption } from "features/categories/ui/tabs/tab-common"
import { Icon } from "shared/ui/icon"
import { Gallery } from "../photo-position/gallery"

export const TabPhotoPosition = () => (
  <Box sx={{ mt: 1 }}>
    <Controller
      defaultValue
      name="isShowPhotoWithGoods"
      render={({ field }) => (
        <FormControlLabel
          label={<Text onlyText name="forms.showPhotoInListGoods" />}
          control={(
            <Checkbox
              sx={{ ml: 1, mr: 1, p: 0.75 }}
              checked={field.value}
              {...field}
            />
            )}
        />
      )}
    />

    <Box flex ai row jc_sp gap>
      <Controller
        name="bgColor"
        render={({ field }) => (
          <ColorInput
            {...field}
            fullWidth
            label={<Text onlyText name="forms.bgColor" />}
            onChange={(value) => {
              field.onChange(value)
              eventBus.emit(updateCaption({ bgColor: value }))
            }}
          />
        )}
      />
      <Controller
        name="color"
        render={({ field }) => (
          <ColorInput
            {...field}
            fullWidth
            label={<Text onlyText name="forms.textColor" />}
            onChange={(value) => {
              field.onChange(value)
              eventBus.emit(updateCaption({ color: value }))
            }}
          />
        )}
      />
      <Box sx={{ width: 1 }}>
        <Text name="forms.effectBlur" />
        <Box sx={{ px: 2 }}>
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
              />
            )}
          />
        </Box>
      </Box>
    </Box>

    <Text sx={{ mb: 1 }} name="positionInContainer" />
    <Gallery />
  </Box>
)
