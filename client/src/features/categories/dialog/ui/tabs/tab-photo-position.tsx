import { Box } from "shared/ui/box"
import { Text } from "shared/ui/text"
import { Controller } from "react-hook-form"
import { Checkbox, FormControlLabel, Slider } from "@mui/material"
import { ColorInput } from "shared/ui/form/input-color"
import { eventBus } from "shared/lib/event-bus"
import { Icon } from "shared/ui/icon"
import { updateCaption } from "features/categories/@dialog/domain/event"
import { useCategoryStores } from "features/categories/@dialog/ui/context"
import { observer } from "mobx-react-lite"
import { nanoid } from "nanoid"
import { Gallery } from "features/categories/@dialog/ui/tabs/photo-position/gallery"

export const TabPhotoPosition = observer(() => {
  const categoryStores = useCategoryStores()

  return (
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
                {...field}
                checked={field.value}
                onChange={(event, checked) => {
                  field.onChange(event)

                  categoryStores.historyStore.recordEvent({
                    id: nanoid(),
                    tab: 2,
                    type: "changeIsShowPhotoWithGoods",
                    value: checked,
                  })
                }}
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
              onBlur={(event) => {
                categoryStores.historyStore.recordEvent({
                  id: nanoid(),
                  tab: 2,
                  type: "changeBgColor",
                  value: event.target.value,
                })
              }}
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
              onBlur={(event) => {
                categoryStores.historyStore.recordEvent({
                  id: nanoid(),
                  tab: 2,
                  type: "changeColor",
                  value: event.target.value,
                })
              }}
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
                  onBlur={(event) => {
                    const readAttribute = parseInt(event.target.getAttribute("value") ?? "0", 10)

                    const value = Number.isNaN(readAttribute)
                      ? 0
                      : readAttribute

                    categoryStores.historyStore.recordEvent({
                      id: nanoid(),
                      tab: 2,
                      type: "changeBlur",
                      value,
                    })
                  }}
                  onChange={(_, value) => {
                    value = Array.isArray(value) ? value[0] : value

                    field.onChange(value)
                    eventBus.emit(updateCaption({
                      blur: value,
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
})
