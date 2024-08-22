import * as React from "react"
import { SxProps } from "@mui/system"
import { Theme } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useLang } from "shared/context/Lang"
import { Input } from "shared/ui/form/input"
import { Box } from "shared/ui/box"
import { UseCategoryFormProps } from "features/categories/create-and-edit/model/types"

interface CaptionInputProps {
  sx?: SxProps<Theme>
  langBase?: string
}

export const CaptionInput = (props: CaptionInputProps) => {
  const { sx, langBase: langBaseProps } = props

  const { control, trigger } = useFormContext<UseCategoryFormProps>()
  const { t } = useTranslation("translation", { keyPrefix: "global.message" })
  const langBase = langBaseProps ?? useLang()?.lang

  return (
    <Controller
      name="caption"
      control={control}
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

export const DescriptionInput = () => {
  const langBase = useLang()?.lang

  return (
    <Controller
      name="description"
      defaultValue=""
      render={({ field }) => (
        <Input
          {...field}
          fullWidth
          label={`${langBase}.description`}
          multiline
          rows="10"
          sx={{
            "& .MuiInputBase-root": {
              py: 0.5,
            },
          }}
        />
      )}
    />
  )
}

export const CommonTab = () => (
  <Box flex ai gap sx={{ mt: 1 }}>
    <CaptionInput />
    <DescriptionInput />
  </Box>
)
