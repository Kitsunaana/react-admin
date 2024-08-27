import { Autocomplete } from "@mui/material"
import { Input } from "shared/ui/form/input"
import { Text } from "shared/ui/text"
import { SelectItem } from "shared/ui/form/select"
import {
  Controller, ControllerRenderProps, FieldValues, useFormContext,
} from "react-hook-form"
import React, { ChangeEvent } from "react"
import { useTranslation } from "react-i18next"
import { useLang } from "shared/context/Lang"

interface TagInputProps {
  options: { caption: string }[]
}

type TField<TPath extends string> = ControllerRenderProps<FieldValues, TPath>
type EventInput = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

export const TagInputCaption = (props: TagInputProps) => {
  const { options } = props

  const methods = useFormContext()
  const lang = useLang()
  const { t } = useTranslation("locales", { keyPrefix: lang?.lang })

  const onChangeAutocomplete = (option: string, field: TField<"tag.caption">) => {
    field.onChange(option)
    methods.trigger("tag.caption")
  }

  const onChangeInput = (event: EventInput, field: TField<"tag.caption">) => {
    field.onChange(event)
    methods.trigger("tag.caption")
  }

  return (
    <Controller
      name="tag.caption"
      rules={{ required: "validate.required" }}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          size="small"
          freeSolo
          fullWidth
          value={field.value}
          onChange={(_, option) => onChangeAutocomplete(option, field)}
          options={options.map((item) => item.caption)}
          renderInput={(props) => (
            <Input
              {...props}
              {...field}
              onChange={(event) => onChangeInput(event, field)}
              label={<Text onlyText name="forms.tag" />}
              helperText={error?.message ? t(error.message) : null}
              error={!!error}
            />
          )}
          renderOption={({ key, ...other }, option) => (
            <SelectItem key={key} {...other}>
              {option}
            </SelectItem>
          )}
        />
      )}
    />
  )
}
