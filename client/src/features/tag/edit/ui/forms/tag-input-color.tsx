import { Text } from "shared/ui/text"
import { Controller } from "react-hook-form"
import React from "react"
import { ColorInput } from "shared/ui/form/input-color"

export const TagInputColor = () => (
  <Controller
    name="tagColor"
    render={({ field }) => (
      <ColorInput
        {...field}
        sx={{ width: "30%" }}
        label={<Text onlyText name="forms.color" />}
        PopoverProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        }}
      />
    )}
  />
)
