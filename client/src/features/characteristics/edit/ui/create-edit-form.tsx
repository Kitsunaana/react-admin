import { Controller, useFormContext } from "react-hook-form"
import { useEffect } from "react"
import { Box } from "shared/ui/box"
import { Select } from "shared/ui/form/select"
import { Input } from "shared/ui/form/input"
import { Checkbox, FormControlLabel } from "@mui/material"
import * as React from "react"
import { useGetCharacteristics, useGetUnits } from "entities/characteristic"
import { useTranslation } from "react-i18next"

interface CreateEditFormProps {
  langBase?: string
}

export const CreateEditForm = (props: CreateEditFormProps) => {
  const { langBase } = props

  const methods = useFormContext()

  const { characteristics, characteristicsIsLoading } = useGetCharacteristics()
  const { units, unitsIsLoading } = useGetUnits()
  const { t } = useTranslation("locales", { keyPrefix: langBase ?? "" })

  return (
    <Box flex gap sx={{ pt: 1 }}>
      <Controller
        name="caption"
        rules={{
          required: "required",
          minLength: { value: 3, message: "minLength" },
        }}
        render={({ field, fieldState: { error } }) => (
          <Select
            disabled={characteristicsIsLoading}
            value={field.value}
            freeSolo
            onChange={(event, option) => { field.onChange(option) }}
            options={(characteristics || []).map((option) => option.caption)}
            InputProps={{
              ...field,
              error: !!error,
              helperText: error?.message ? t(`validate.${error.message}`) : null,
              label: t("forms.caption"),
              onChange: (event) => {
                field.onChange(event)
              },
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
              label: t("forms.unit"),
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
            label={t("forms.value")}
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
              label={t("forms.hideClient")}
            />
          )}
        />
      </Box>
    </Box>
  )
}
