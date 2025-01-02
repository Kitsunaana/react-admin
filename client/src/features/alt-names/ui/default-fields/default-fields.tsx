import { Controller } from "react-hook-form"
import { Autocomplete } from "@mui/material"
import { Input } from "shared/ui/form/input"
import { Text } from "shared/ui/text"
import { SelectItem } from "shared/ui/form/select"
import { Mark } from "shared/ui/mark"
import { DescriptionInput } from "shared/ui/description"
import { FormData, FormLocales } from "../../view-model/use-alt-name-form"

export const DefaultFields = ({
  locales,
  defaultValue,
}: {
  locales: Array<FormLocales>
  defaultValue: FormData
}) => (
  <>
    <Controller
      name="locale"
      defaultValue={defaultValue.locale}
      rules={{
        required: "requiredSelect",
      }}
      render={({ field, fieldState }) => (
        <Autocomplete<FormLocales>
          size="small"
          options={locales}
          value={field.value}
          getOptionLabel={(option) => (option ? option.caption : "")}
          onChange={(_, option) => field.onChange(option)}
          isOptionEqualToValue={(option, value) => option.caption === value.caption}
          renderInput={(props) => (
            <Input
              {...props}
              label={<Text onlyText name="forms.locale" />}
              error={Boolean(fieldState.error)}
              helperText={{
                name: fieldState.error?.message ?? "requiredSelect",
                langBase: "validate",
              }}
            />
          )}
          renderOption={({ key, ...other }, option) => (
            <SelectItem key={key} disabled={option?.disabled} {...other}>
              <Mark style={{ fontSize: 12 }}>{option.altName}</Mark>
              <div>{option?.caption ?? ""}</div>
            </SelectItem>
          )}
        />
      )}
    />

    <Controller
      name="caption"
      defaultValue={defaultValue.caption}
      rules={{
        required: "required",
        minLength: {
          value: 3,
          message: "minLength",
        },
      }}
      render={({ field, fieldState }) => (
        <Input
          size="small"
          {...field}
          error={Boolean(fieldState.error)}
          label={<Text onlyText name="forms.caption" />}
          helperText={{
            name: fieldState.error?.message! ?? "required",
            values: { value: 3 },
            langBase: "validate",
          }}
        />
      )}
    />

    <DescriptionInput
      defaultValue={defaultValue.description}
      name="forms.description"
    />
  </>
)
