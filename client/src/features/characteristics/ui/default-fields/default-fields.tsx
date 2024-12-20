import { useController } from "react-hook-form"
import { Input } from "shared/ui/form/input"
import { Text } from "shared/ui/text"
import { SelectItem } from "shared/ui/form/select"
import { Autocomplete, Checkbox } from "@mui/material"
import { FormControlLabel } from "./styles"
import { FormData } from "../../view-model/use-characteristic-form"

export const DefaultFields = ({
  characteristics,
  units,
  defaultValue,
}: {
  characteristics: string[]
  units: string[]
  defaultValue: FormData
}) => {
  const captionController = useController({
    name: "caption",
    defaultValue: defaultValue.caption,
    rules: {
      required: "required",
      minLength: { value: 3, message: "minLength" },
    },
  })

  const unitController = useController({
    name: "unit",
    defaultValue: defaultValue.unit,
  })

  const valueController = useController({
    name: "value",
    defaultValue: defaultValue.value,
    rules: {
      required: "required",
    },
  })

  const hideClientController = useController({
    name: "hideClient",
    defaultValue: defaultValue.hideClient,
  })

  return (
    <>
      <Autocomplete
        {...captionController.field}
        freeSolo
        size="small"
        onChange={(_, value) => captionController.field.onChange(value)}
        options={characteristics}
        renderInput={(params) => (
          <Input
            {...params}
            label={<Text name="forms.caption" />}
            onChange={captionController.field.onChange}
            error={Boolean(captionController.fieldState.error)}
            helperText={{
              name: captionController.fieldState.error?.message ?? "required",
              values: { value: 3 },
              langBase: "validate",
            }}
          />
        )}
        renderOption={({ key, ...other }, option) => (
          <SelectItem key={key} {...other}>{option}</SelectItem>
        )}
      />

      <Autocomplete
        {...unitController.field}
        freeSolo
        size="small"
        options={units}
        onChange={(_, value) => unitController.field.onChange(value)}
        renderInput={(params) => (
          <Input {...params} {...unitController.field} label={<Text name="forms.unit" />} />
        )}
        renderOption={({ key, ...other }, option) => (
          <SelectItem key={key} {...other}>{option}</SelectItem>
        )}
      />

      <Input
        {...valueController.field}
        fullWidth
        size="small"
        label={<Text name="forms.value" />}
        error={Boolean(valueController.fieldState.error?.message)}
        helperText={{
          name: valueController.fieldState.error?.message ?? "required",
          langBase: "validate",
        }}
      />

      <FormControlLabel
        label={<Text name="forms.hideClient" />}
        control={(
          <Checkbox
            size="medium"
            {...hideClientController.field}
            checked={hideClientController.field.value}
          />
        )}
      />
    </>
  )
}
