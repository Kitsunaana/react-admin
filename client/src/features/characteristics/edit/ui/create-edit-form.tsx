import { Controller, useFormContext } from "react-hook-form"
import { useEffect } from "react"
import { Box } from "shared/ui/box"
import { Select } from "shared/ui/form/select"
import { Input } from "shared/ui/form/input"
import { Checkbox, FormControlLabel } from "@mui/material"
import * as React from "react"
import { useGetCharacteristics, useGetUnits } from "entities/characteristic"
import { useTranslation } from "react-i18next"
import { Text } from "shared/ui/text"

export const CreateEditForm = () => {
  const { characteristics, characteristicsIsLoading } = useGetCharacteristics()
  const { units, unitsIsLoading } = useGetUnits()
  const { t } = useTranslation("translation", { keyPrefix: "global.forms" })

  return (
    <Box flex gap sx={{ pt: 1 }}>
      <Controller
        name="characteristic"
        rules={{
          required: "required",
          minLength: { value: 3, message: "minLength" },
        }}
        render={({ field, fieldState: { error } }) => (
          <Select
            disabled={characteristicsIsLoading}
            value={field.value}
            freeSolo
            onChange={(_, option) => {
              console.log(option)
              field.onChange(option)
            }}
            options={(characteristics || []).map((option) => option.caption)}
            InputProps={{
              ...field,
              error: !!error,
              helperText: error?.message ? t(`validate.${error.message}`, { value: 3 }) : null,
              label: <Text name="forms.caption" />,
              onChange: field.onChange,
            }}
          />
        )}
      />

      <Controller
        name="unit"
        render={({ field }) => (
          <Select
            freeSolo
            disabled={unitsIsLoading}
            value={field.value}
            onChange={(event, option) => field.onChange(option)}
            options={(units || [])
              .filter((option) => Boolean(option.caption))
              .map((option) => option.caption)}
            InputProps={{
              label: <Text name="forms.unit" />,
              ...field,
            }}
          />
        )}
      />

      <Controller
        name="value"
        rules={{ required: "required" }}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            size="small"
            label={<Text name="forms.value" />}
            error={!!error}
            helperText={error?.message ? t(`validate.${error.message}`) : null}
          />
        )}
      />

      <Box sx={{ mx: 1 }}>
        <Controller
          name="hideClient"
          render={({ field }) => (
            <FormControlLabel
              sx={{ alignSelf: "start" }}
              control={<Checkbox {...field} sx={{ p: 0.75, mr: 1 }} checked={field.value} />}
              label={<Text name="forms.hideClient" />}
            />
          )}
        />
      </Box>
    </Box>
  )
}
