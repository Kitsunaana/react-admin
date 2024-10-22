import {
  alpha,
  AutocompleteProps,
  MenuItem,
  MenuItemProps,
  TextFieldProps,
} from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete"
import { ReactNode } from "react"
import { FieldError } from "react-hook-form"
import { Input } from "shared/ui/form/input"
import { Icon } from "shared/ui/icon"

interface SelectProps extends Omit<AutocompleteProps<any, any, any, any>, "renderInput">{
  error?: FieldError | undefined
  InputProps?: TextFieldProps
  startAdornmentOption?: (option: string) => ReactNode
}

export const Select = (props: SelectProps) => {
  const {
    options, error, InputProps, sx, startAdornmentOption, ...other
  } = props

  return (
    <Autocomplete
      sx={sx}
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
            {startAdornmentOption?.(option)}
            {option}
          </MenuItem>
        )
      }}
      {...other}
    />
  )
}

export const SelectItem = (props: MenuItemProps) => {
  const { sx, children, ...other } = props

  return (
    <MenuItem
      sx={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        mx: 1,
        my: 0.75,
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
        ...sx,
      }}
      {...other}
    >
      {children}
    </MenuItem>
  )
}
