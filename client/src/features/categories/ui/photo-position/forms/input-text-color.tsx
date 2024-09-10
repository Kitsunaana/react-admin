import { ColorInput } from "shared/ui/form/input-color"
import { Text } from "shared/ui/text"
import { Controller } from "react-hook-form"
import { eventBus } from "shared/lib/event-bus"
import { updateCaption } from "features/categories/ui/tabs/tab-common"

export const InputTextColor = () => (
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
)
