import {
  Controller, useFormContext,
} from "react-hook-form"
import { Select } from "shared/ui/select"
import { Input } from "shared/ui/input"
import * as React from "react"
import { useTranslation } from "react-i18next"

export interface Option {
  value: string
  icon?: string
  tab?: number
}

interface UseFormProps {
  category: Option
  caption: Option
  description: string
}

export const categoryList = [
  {
    value: "Option 1",
    icon: "good",
  },
  {
    value: "Option 2",
    icon: "additional",
  },
  { value: "Option 3" },
]

export const CategorySelect = () => {
  const { control, trigger } = useFormContext<UseFormProps>()

  const { t } = useTranslation("translation", { keyPrefix: "global.message" })

  return (
    <Controller
      name="category.value"
      control={control}
      rules={{ required: "requiredOption" }}
      render={({ field: { value, onChange, ...other }, fieldState: { error } }) => (
        <Select
          {...other}
          value={value ?? null}
          error={error}
          onChange={(_, value) => {
            onChange(value)
            trigger("category")
          }}
          options={categoryList}
          sx={{ mb: 1 }}
          InputProps={{
            fullWidth: true,
            label: "Категория",
            error: !!error,
            helperText: error?.message ? t(error.message, { value: 3 }) : "",
          }}
        />
      )}
    />
  )
}

export const CaptionInput = () => {
  const { control, trigger } = useFormContext<UseFormProps>()

  const { t } = useTranslation("translation", { keyPrefix: "global.message" })

  return (
    <Controller
      name="caption.value"
      control={control}
      defaultValue=""
      rules={{ required: "required", minLength: { value: 3, message: "minLength" } }}
      render={({ field: { value, onChange, ...other }, fieldState: { error } }) => (
        <Input
          {...other}
          onChange={(event) => {
            onChange(event)
            trigger("caption")
          }}
          value={value}
          label="Заголовок"
          size="small"
          fullWidth
          error={!!error}
          helperText={error?.message ? t(error.message, { value: 3 }) : ""}
        />
      )}
    />
  )
}
