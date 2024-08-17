import Autocomplete from "@mui/material/Autocomplete"
import { Icon } from "shared/ui/icon"
import {
  alpha, MenuItem, AutocompleteProps, TextFieldProps,
} from "@mui/material"
import { FieldError } from "react-hook-form"
import * as React from "react"
import { forwardRef } from "react"
import { Input } from "shared/ui/input"

interface SelectProps extends Omit<AutocompleteProps<any, any, any, any>, "renderInput">{
  error?: FieldError | undefined
  InputProps?: TextFieldProps
}

export const Select = forwardRef((props: SelectProps, ref) => {
  const {
    options, error, InputProps, sx, ...other
  } = props

  return (
    <Autocomplete
      {...other}
      sx={sx}
      // value={value}
      options={options.map((option) => (
        typeof option === "object" && option !== null ? option.value : option))}
      size="small"
      renderInput={(params) => {
        const extendedParams = { ...params, ...InputProps }

        if (other.value !== null) {
          const findOption = options
            .find((option) => (typeof option === "object"
              ? option.value === other.value
              : option === other.value))

          params.InputProps.startAdornment = findOption?.icon
            ? (<Icon sx={{ fontSize: 20 }} name={findOption.icon ?? ""} />)
            : undefined
        }

        return (<Input {...extendedParams} />)
      }}
      renderOption={(props, option) => {
        const { key, ...other } = props

        const findOption = options
          .find((item) => (typeof item === "object" && item.value === option))

        return (
          <MenuItem
            key={key}
            {...other}
            sx={{
              mx: 1,
              my: 0.25,
              px: "4px !important",
              py: "4px !important",
              display: "flex",
              justifyContent: "space-between !important",
              alignItems: "center",
              borderRadius: 1.5,
              border: "1px solid transparent",
              transition: ".2s",
              "&:hover": {
                backgroundColor: ({ palette }) => alpha(palette.grey["600"], 0.25),
                border: ({ palette }) => `1px solid ${alpha(palette.grey["300"], 0.25)}`,
              },

              "&[aria-selected='true']": {
                backgroundColor: ({ palette }) => alpha(palette.grey["600"], 0.25),
                border: ({ palette }) => `1px solid ${alpha(palette.grey["300"], 0.25)}`,
              },
            }}
          >
            {findOption?.icon ? <Icon name={findOption.icon} /> : <div />}
            {option}
          </MenuItem>
        )
      }}
    />
  )
})
