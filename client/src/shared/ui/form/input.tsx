import {
  TextField, TextFieldProps,
} from "@mui/material"
import { ChangeEvent, forwardRef } from "react"
import styled from "styled-components"
import { IconButtonBase } from "shared/ui/buttons/icon-button-base"

export const StyledInput = styled(TextField)<TextFieldProps>`
    & .MuiInputBase-input {
        padding: 8.5px 12px 8.5px 4px;
        height: 18px;
    }
    
    & .MuiFormLabel-root {
        font-size: 12px;
    }
    
    & .MuiFormLabel-root[data-shrink='true'] {
        transform: translate(16px, -6px) scale(0.75);
    }
    
    & legend {
        font-size: 9px;
    }
    
    & .MuiInputBase-root {
        padding-right: 4px;
        padding-left: 4px;
      border-radius: 8px;
    }
`

type InputProps = {
  clear?: boolean
  setValue?: (name: any, value: any) => void
  onClear?: () => void

  name?: string
} & TextFieldProps

export const Input = forwardRef<HTMLDivElement, InputProps>((props, ref) => {
  const {
    clear = true, name, onClear, setValue, onChange, InputProps, value, ...other
  } = props

  const clearButton = (clear && value) ? (
    <IconButtonBase
      fontSize={20}
      name="clear"
      onClick={() => {
        if (onClear) onClear()
        if (name && onChange) {
          onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
        }
      }}
    />
  ) : null

  return (
    <StyledInput
      InputProps={{ endAdornment: clearButton, ...InputProps }}
      ref={ref}
      onChange={onChange}
      value={value}
      name={name}
      {...other}
    />
  )
})
