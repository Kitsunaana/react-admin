import { ColorInput } from "shared/ui/form/input-color"
import { Text } from "shared/ui/text"
import { eventBus } from "shared/lib/event-bus"
import { updateCaption } from "features/categories/ui/tabs/tab-common"
import { Controller } from "react-hook-form"

export const ChangeBgColor = (() => (
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
)
)
