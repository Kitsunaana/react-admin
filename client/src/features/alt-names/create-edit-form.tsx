import { Controller, useFormContext } from "react-hook-form"
import { useEffect } from "react"
import { Box } from "shared/ui/box"
import { Select, SelectItem } from "shared/ui/form/select"
import * as React from "react"
import { Input } from "shared/ui/form/input"
import { DescriptionInput } from "shared/ui/description"
import { useGetLocales } from "features/alt-names/queries"
import { Mark } from "shared/ui/mark"
import { Autocomplete } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useStores } from "features/categories/create-and-edit/ui/dialog"

export const CreateEditForm = () => {
  const { altNames } = useStores()
  const methods = useFormContext()

  const { localesData, localesIsLoading } = useGetLocales()

  // console.log(altNames.exclude(localesData ?? []))
  altNames.exclude(localesData ?? [])

  useEffect(() => { methods.trigger() }, [])

  return (
    <Box flex gap sx={{ p: 1, height: 1 }}>
      <Controller
        name="lang"
        rules={{
          required: "Поле должно быть заполнено",
        }}
        render={({ field, fieldState }) => (
          <Autocomplete
            size="small"
            value={field.value}
            onChange={(event, option) => {
              field.onChange(option)
              methods.trigger("lang")
            }}
            disabled={localesIsLoading}
            options={(altNames.exclude(localesData ?? [])).map((option) => option)}
            getOptionLabel={(option) => option.caption}
            isOptionEqualToValue={(option, value) => option?.caption === value?.caption}
            renderInput={(props) => (
              <Input
                label="Название"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
                {...props}
              />
            )}
            renderOption={({ key, ...other }, option) => (
              <SelectItem key={key} {...other}>
                <Mark style={{ fontSize: 12 }}>{option.altName}</Mark>
                <div>{option.caption}</div>
              </SelectItem>
            )}
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
