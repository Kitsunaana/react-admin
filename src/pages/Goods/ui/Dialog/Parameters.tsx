import {
  Control, Controller, FormState, UseFormGetValues, UseFormRegister, UseFormSetValue,
} from "react-hook-form"
import { Select } from "shared/ui/Select"
import { Input } from "shared/ui/Input"
import { Text } from "shared/ui/Text"
import * as React from "react"
import { useEffect } from "react"
import { dispatch } from "shared/lib/event"
import { alpha, MenuItem, TextField } from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete"

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

interface ParametersProps {
  errors: FormState<UseFormProps>["errors"]
  register: UseFormRegister<UseFormProps>
  getValues: UseFormGetValues<UseFormProps>
  setValue: UseFormSetValue<UseFormProps>
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

const validate = {
  requiredSelect<T extends Option>(data: T, options: T[]) {
    if (data === null) return "requiredSelect"

    const findOption = options
      .find((option) => option.value === data.value && data.value)

    return findOption ? true : "requiredSelect"
  },
}

export const Parameters = (props: ParametersProps & { control: Control<UseFormProps, any> }) => {
  const { errors, control } = props

  return (
    <>
      <Controller
        name="category.value"
        control={control}
        // rules={{ validate: (data: Option) => validate.requiredSelect(data, categoryList) }}
        rules={{
          required: "requiredOption",
        }}
        render={({ field: { value, onChange, ...other }, fieldState: { error } }) => (
          /* <Select
            {...other}
            value={value as any}
            error={fieldState.error}
            options={categoryList.map((category) => category.value)}
            sx={{ mb: 1 }}
          /> */
          <Autocomplete
            {...other}
            value={value ?? null}
            onChange={(event, value) => onChange(value)}
            options={categoryList.map((category) => category.value)}
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!error}
                helperText={<Text onlyText langBase="global.message" name={error?.message} />}
                fullWidth
                label="Категория"
              />
            )}
            renderOption={(props, option, state) => {
              const { key, ...other } = props

              return (<MenuItem key={key} {...other}>{option}</MenuItem>)
            }}
          />
        )}
      />
      <Controller
        name="caption.value"
        control={control}
        defaultValue=""
        rules={{ required: "required", minLength: { value: 3, message: "minLength" } }}
        render={({ field: { value, ...other } }) => (
          <Input
            {...other}
            value={value}
            label="Заголовок"
            size="small"
            fullWidth
            error={!!errors.caption?.value}
            helperText={(
              <Text
                onlyText
                langBase="global.message"
                name={errors.caption?.value?.message}
                value="3"
              />
            )}
          />
        )}
      />
    </>
  )
}
