import { Controller } from "react-hook-form"
import { Input } from "shared/ui/form/input"
import { Text } from "shared/ui/text"
import { SelectItem } from "shared/ui/form/select"
import { Autocomplete, Checkbox } from "@mui/material"
import { FormControlLabel } from "./styles"
import { FormData } from "../../view-model/use-characteristic-form"

export const DefaultFields = ({
  units,
  characteristics,
  defaultValue,
}: {
  units: string[]
  characteristics: string[]
  defaultValue: FormData
}) => (
  <>
    <Controller
      name="caption"
      defaultValue={defaultValue.caption}
      rules={{
        required: "requiredSelect",
        minLength: { value: 3, message: "minLength" },
      }}
      render={({ field, fieldState }) => (
        <Autocomplete
          {...field}
          freeSolo
          size="small"
          onChange={(_, value) => field.onChange(value)}
          options={characteristics}
          renderInput={(params) => (
            <Input
              {...params}
              label={<Text name="forms.caption" />}
              onChange={field.onChange}
              error={Boolean(fieldState.error)}
              helperText={{
                name: fieldState.error?.message ?? "requiredSelect",
                values: { value: 3 },
                langBase: "validate",
              }}
            />
          )}
          renderOption={({ key, ...other }, option) => (
            <SelectItem key={key} {...other}>{option}</SelectItem>
          )}
        />
      )}
    />

    <Controller
      name="unit"
      defaultValue={defaultValue.unit}
      render={({ field }) => (
        <Autocomplete
          {...field}
          freeSolo
          size="small"
          options={units}
          onChange={(_, value) => field.onChange(value)}
          renderInput={(params) => (
            <Input {...params} {...field} label={<Text name="forms.unit" />} />
          )}
          renderOption={({ key, ...other }, option) => (
            <SelectItem key={key} {...other}>{option}</SelectItem>
          )}
        />
      )}
    />

    <Controller
      name="value"
      defaultValue={defaultValue.value}
      rules={{ required: "required" }}
      render={({ field, fieldState }) => (
        <Input
          {...field}
          fullWidth
          size="small"
          label={<Text name="forms.value" />}
          error={Boolean(fieldState.error?.message)}
          helperText={{
            name: fieldState.error?.message ?? "required",
            langBase: "validate",
          }}
        />
      )}
    />

    <FormControlLabel
      label={<Text name="forms.hideClient" />}
      control={(
        <Controller
          name="hideClient"
          defaultValue={defaultValue.hideClient}
          render={({ field }) => (
            <Checkbox
              {...field}
              size="medium"
              checked={field.value}
            />
          )}
        />
      )}
    />
  </>
)
