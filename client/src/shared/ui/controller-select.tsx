import { Controller, useFormContext } from "react-hook-form"
import { Select } from "shared/ui/select"
import React from "react"
import { SxProps, TextFieldProps } from "@mui/material"

export interface Option {
  id?: number
  value: string | null
  icon?: string
}

type ControllerSelectProps = {
  options: Option[]
  sx?: SxProps
  InputProps?: TextFieldProps
  onChange?: (value: any) => void
  name: string
}

export const ControllerSelect = (props: ControllerSelectProps) => {
  const {
    options, onChange: propsOnChange, name, ...otherProps
  } = props

  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...other } }) => (
        <Select
          {...other}
          value={value ?? null}
          onChange={(_, value) => {
            onChange(value)

            propsOnChange?.(value)
          }}
          options={options}
          {...otherProps}
        />
      )}
    />
  )
}
