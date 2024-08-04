import { DescriptionInput } from "shared/ui/description"
import * as React from "react"
import { SxProps } from "@mui/system"
import { Theme } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useLang } from "shared/context/Lang"
import { Input } from "shared/ui/input"
import { Box } from "shared/ui/box"

export const CaptionInput = (props: { sx?: SxProps<Theme> }) => {
  const { sx } = props

  const { control, trigger } = useFormContext()
  const { t } = useTranslation("translation", { keyPrefix: "global.message" })
  const langBase = useLang()?.lang

  return (
    <Controller
      name="caption"
      control={control}
      defaultValue=""
      rules={{ required: "required", minLength: { value: 3, message: "minLength" } }}
      render={({ field: { value, onChange, ...other }, fieldState: { error } }) => (
        <Input
          {...other}
          sx={sx}
          onChange={(event) => {
            onChange(event)
            trigger("caption")
          }}
          value={value}
          label={`${langBase}.caption`}
          size="small"
          fullWidth
          error={!!error}
          helperText={error?.message ? t(error.message, { value: 3 }) : ""}
        />
      )}
    />
  )
}

export const CommonTab = () => (
  <Box flex ai gap>
    <CaptionInput />
    <DescriptionInput />
  </Box>
)
