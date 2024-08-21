import { Controller, useFormContext } from "react-hook-form"
import { useEffect } from "react"
import { Box } from "shared/ui/box"
import { Select } from "shared/ui/form/select"
import { Input } from "shared/ui/form/input"
import { Checkbox, FormControlLabel } from "@mui/material"
import * as React from "react"
import { useGetCharacteristics, useGetUnits } from "entities/characteristic"

export const CreateEditForm = () => {
  const methods = useFormContext()

  const { characteristics, characteristicsIsLoading } = useGetCharacteristics()
  const { units, unitsIsLoading } = useGetUnits()

  useEffect(() => { methods.trigger() }, [])

  return (
    <Box flex gap sx={{ p: 1, height: 1 }}>
      <Controller
        name="caption"
        rules={{
          required: "Поле должно быть заполнено",
          minLength: {
            value: 3,
            message: "Поле должно быть не менее 3 символов",
          },
        }}
        render={({ field, fieldState }) => (
          <Select
            disabled={characteristicsIsLoading}
            value={field.value}
            freeSolo
            onChange={(event, option) => {
              field.onChange(option)
              methods.trigger()
            }}
            options={(characteristics || []).map((option) => option.caption)}
            InputProps={{
              label: "Название",
              ...field,
              onChange: (event) => {
                field.onChange(event)
                methods.trigger()
              },
              error: !!fieldState.error,
              helperText: fieldState.error ? fieldState.error.message : null,
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
              label: "Единицы измерения",
              ...field,
            }}
          />
        )}
      />

      <Controller
        name="value"
        rules={{
          required: "Количество символов должно быть больше 1",
        }}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            onChange={(event) => {
              field.onChange(event)
              methods.trigger()
            }}
            size="small"
            label="Значение"
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : null}
          />
        )}
      />

      <Controller
        name="hideClient"
        render={({ field }) => (
          <FormControlLabel
            sx={{ alignSelf: "start" }}
            control={<Checkbox {...field} checked={field.value} />}
            label="Скрыть у клиента"
          />
        )}
      />
    </Box>
  )
}
