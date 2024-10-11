import { Checkbox, FormControlLabel } from "@mui/material"
import { useGetCharacteristics, useGetUnits } from "entities/characteristic"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Box } from "shared/ui/box"
import { Input } from "shared/ui/form/input"
import { Select } from "shared/ui/form/select"
import { Text } from "shared/ui/text"

export const CharacteristicForm = () => {
  const { t } = useTranslation("translation", { keyPrefix: "global.forms" })

  const characteristicsQuery = useGetCharacteristics()
  const unitsQuery = useGetUnits()

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
            disabled={characteristicsQuery.isLoadingGet}
            value={field.value}
            freeSolo
            onChange={(_, option) => field.onChange(option)}
            options={(characteristicsQuery.characteristics || []).map((option) => option.caption)}
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
            disabled={unitsQuery.isLoadingGet}
            value={field.value}
            onChange={(_, option) => field.onChange(option)}
            options={(unitsQuery.units || [])
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
