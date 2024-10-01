import {
  TextField,
  TextFieldProps,
  inputBaseClasses,
  formLabelClasses,
} from "@mui/material"
import { ChangeEvent, forwardRef } from "react"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Text } from "shared/ui/text"
import { styled as muiStyled } from "@mui/material/styles"

export const StyledInput = muiStyled(TextField)(() => ({
  [`& .${inputBaseClasses.input}`]: {
    padding: "8.5px 12px 8.5px 10px",
    height: 18,
  },

  [`& .${inputBaseClasses.root}`]: {
    paddingRight: "4px",
    paddingLeft: "4px",
    borderRadius: "8px",
  },

  [`& .${formLabelClasses.root}`]: {
    fontSize: 12,

    "&[data-shrink='true']": {
      transform: "translate(16px, -6px) scale(0.75)",
    },
  },

  "& legend": {
    fontSize: "8.5px",
  },
}))

type InputProps = {
  clear?: boolean
  setValue?: (name: any, value: any) => void
  onClear?: () => void
  name?: string
} & TextFieldProps

export const Input = forwardRef<HTMLDivElement, InputProps>((props, ref) => {
  const {
    clear = true,
    name,
    onClear,
    setValue,
    onChange,
    InputProps,
    value,
    ...other
  } = props

  const clearButton = (clear && value) ? (
    <IconButton
      help={{
        title: (
          <Text
            langBase="global.forms"
            name="clear"
            onlyText
          />
        ),
      }}
      fontSize={20}
      name="clear"
      onClick={() => {
        onClear?.()

        if (name && onChange) {
          onChange({
            target: {
              value: "",
            },
          } as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
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
