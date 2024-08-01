import {
  Controller, useFormContext,
} from "react-hook-form"
import { Input } from "shared/ui/input"
import * as React from "react"
import { useTranslation } from "react-i18next"
import { SxProps, Theme } from "@mui/material"

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

export const CaptionInput = (props: { sx: SxProps<Theme> }) => {
  const { sx } = props

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
          sx={sx}
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
