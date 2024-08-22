import { Controller, useFormContext } from "react-hook-form"
import { useEffect } from "react"
import { Box } from "shared/ui/box"
import { Select } from "shared/ui/form/select"
import * as React from "react"
import { Input } from "shared/ui/form/input"
import { DescriptionInput } from "shared/ui/description"

const locales = [
  { caption: "English", code: "en", altName: "EN" },
  { caption: "Русский", code: "ru", altName: "RU" },
]

export const CreateEditForm = () => {
  const methods = useFormContext()

  useEffect(() => { methods.trigger() }, [])

  return (
    <Box flex gap sx={{ p: 1 }}>
      <Controller
        name="lang"
        rules={{
          required: "Поле должно быть заполнено",
        }}
        render={({ field, fieldState }) => (
          <Select
            value={field.value}
            freeSolo
            onChange={(event, option) => {
              field.onChange(option)
              methods.trigger("lang")
            }}
            options={locales.map((option) => option.caption)}
            InputProps={{
              label: "Название",
              ...field,
              onChange: (event) => {
                field.onChange(event)
                methods.trigger("lang")
              },
              error: !!fieldState.error,
              helperText: fieldState.error ? fieldState.error.message : null,
            }}
          />
        )}
      />

      <Controller
        name="caption"
        rules={{
          required: "Поле обязательно для заполнения",
          minLength: { value: 3, message: "Количество символов должно быть больше 3" },
        }}
        render={({ field, fieldState }) => (
          <Input
            size="small"
            label="Заголовок"
            {...field}
            onChange={(event) => {
              field.onChange(event)
              methods.trigger("caption")
            }}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <DescriptionInput />
    </Box>
  )
}
