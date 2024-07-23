/*
import {
  alpha, AutocompleteProps, MenuItem, TextField,
} from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete"
import { Icon } from "shared/ui/Icon"
import { Text } from "shared/ui/Text"
import * as React from "react"

interface Option {
  value: string
  icon?: string
}

interface SelectProps extends AutocompleteProps<Option, any, any, any> {
}

export const Select = (props: SelectProps) => {
  const { options } = props

  return (
    <Autocomplete
      onChange={(event, value) => onChange(value)}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      options={options}
      getOptionLabel={(option) => option.value}
      renderInput={(params) => (
        <TextField {...params} />
      )}
      renderOption={(props, option, state) => {
        const { key, ...other } = props

        return <MenuItem key={key} {...other}>{option.value}</MenuItem>
      }}
    />
  )
}
*/
