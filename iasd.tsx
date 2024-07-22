import { Control, Controller, useForm } from "react-hook-form"
import * as React from "react"
import Autocomplete from "@mui/material/Autocomplete"
import { alpha, MenuItem, TextField } from "@mui/material"
import { Icon } from "shared/ui/Icon"
import { Input } from "shared/ui/Input"
import { Text } from "shared/ui/Text"
import { Option } from "pages/Goods/ui/Header"

interface UseFormProps {
  category: Option
  caption: string
  description: string
}

export const Parameters = () => {
  const { control } = useForm<UseFormProps>({
    defaultValues: {
      category: { value: "Option 1" },
      caption: "",
      description: "",
    },
  })

  return (
    <Controller
      name="category"
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          options={[
            { value: "Option 1", icon: "good" },
            { value: "Option 2", icon: "additional" },
            { value: "Option 3" },
          ]}
          getOptionLabel={(option) => option.value}
          renderInput={(params) => (
            <TextField {...params} />
          )}
          renderOption={(props, option, state) => {
            const { key, ...other } = props

            return (
              <MenuItem key={key} {...other}>
                {option.value}
              </MenuItem>
            )
          }}
        />
      )}
    />
  )
}
