import { Input } from "shared/ui/form/input"
import {
  Controller, ControllerRenderProps, FieldValues, useFormContext,
} from "react-hook-form"
import * as React from "react"
import { ChangeEvent } from "react"
import { useTranslation } from "react-i18next"
import { Text } from "shared/ui/text"

type TField<TPath extends string> = ControllerRenderProps<FieldValues, TPath>
type EventInput = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

export const AltNameInputCaption = () => {
  const { t } = useTranslation("locales", { keyPrefix: "global.dialog.validate" })
  const methods = useFormContext()

  const onChangeInput = (event: EventInput, field: TField<"caption">) => {
    field.onChange(event)
    methods.trigger("caption")
  }

  return (
    <Controller
      name="caption"
      rules={{
        required: "required",
        minLength: { value: 3, message: "minLength" },
      }}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          size="small"
          onChange={(event) => onChangeInput(event, field)}
          error={!!error}
          label={<Text onlyText name="forms.caption" />}
          helperText={error?.message ? t(error.message, { defaultValue: 3 }) : null}
        />
      )}
    />
  )
}
