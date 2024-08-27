import { Autocomplete, AutocompleteProps } from "@mui/material"
import { Input } from "shared/ui/form/input"
import { SelectItem } from "shared/ui/form/select"
import { Mark } from "shared/ui/mark"
import {
  Controller, ControllerRenderProps, FieldValues, useFormContext,
} from "react-hook-form"
import * as React from "react"
import { IAltName } from "entities/alt-name/model/types"
import { Text } from "shared/ui/text"
import { useTranslation } from "react-i18next"

type TField<TPath extends string> = ControllerRenderProps<FieldValues, TPath>
interface AltNameInputLocaleProps extends Omit<AutocompleteProps<any, any, any, any>, "renderInput"> {}

export const AltNameInputLocale = (props: AltNameInputLocaleProps) => {
  const { options, ...other } = props

  const methods = useFormContext()
  const { t } = useTranslation("locales", { keyPrefix: "global.dialog.validate" })

  const onChangeAutocomplete = (option: IAltName, field: TField<"locale">) => {
    field.onChange(option)
    methods.trigger("locale")
  }

  return (
    <Controller
      name="locale"
      rules={{ required: "required" }}
      defaultValue={null}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          size="small"
          value={field.value}
          onChange={(_, option) => onChangeAutocomplete(option, field)}
          options={options}
          getOptionLabel={(option) => (option ? option.caption : "")}
          isOptionEqualToValue={(option, value) => option?.caption === value?.caption}
          renderInput={(props) => (
            <Input
              label={<Text onlyText name="forms.locale" />}
              helperText={error?.message ? t(error.message) : null}
              error={!!error}
              {...props}
            />
          )}
          renderOption={({ key, ...other }, option) => (
            <SelectItem key={key} disabled={option?.disabled} {...other}>
              <Mark style={{ fontSize: 12 }}>{option.altName}</Mark>
              <div>{option.caption}</div>
            </SelectItem>
          )}
          {...other}
        />
      )}
    />
  )
}
