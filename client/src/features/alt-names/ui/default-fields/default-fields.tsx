import { useController } from "react-hook-form"
import { Autocomplete } from "@mui/material"
import { Locale } from "shared/types/new_types/types"
import { Input } from "shared/ui/form/input"
import { Text } from "shared/ui/text"
import { SelectItem } from "shared/ui/form/select"
import { Mark } from "shared/ui/mark"
import { DescriptionInput } from "shared/ui/description"
import { FormData } from "../../view-model/use-alt-name-form"

export const DefaultFields = ({
  locales,
  defaultValue,
}: {
  locales: Array<Locale & { disabled?: boolean }>
  defaultValue: FormData
}) => {
  const localeController = useController({
    name: "locale",
    defaultValue: defaultValue.locale,
    rules: {
      required: "requiredSelect",
    },
  })

  const captionController = useController<FormData>({
    name: "caption",
    defaultValue: defaultValue.caption,
    rules: {
      required: "required",
      minLength: {
        value: 3,
        message: "minLength",
      },
    },
  })

  return (
    <>
      <Autocomplete<Locale & { disabled?: boolean }>
        size="small"
        options={locales}
        value={localeController.field.value}
        getOptionLabel={(option) => (option ? option.caption : "")}
        onChange={(_, option) => localeController.field.onChange(option)}
        isOptionEqualToValue={(option, value) => option.caption === value.caption}
        renderInput={(props) => (
          <Input
            {...props}
            label={<Text onlyText name="forms.locale" />}
            error={!!localeController.fieldState.error}
            helperText={{
              name: localeController.fieldState.error?.message ?? "requiredSelect",
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

      <Input
        size="small"
        {...captionController.field}
        error={!!captionController.fieldState.error}
        label={<Text onlyText name="forms.caption" />}
        helperText={{
          name: captionController.fieldState.error?.message! ?? "required",
          values: { value: 3 },
          langBase: "validate",
        }}
      />

      <DescriptionInput
        defaultValue={defaultValue.description}
        name="forms.description"
      />
    </>
  )
}
