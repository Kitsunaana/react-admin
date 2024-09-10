import { Checkbox, FormControlLabel } from "@mui/material"
import { Text } from "shared/ui/text"
import { Controller } from "react-hook-form"

export const CheckboxShowPhoto = () => (
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
)
