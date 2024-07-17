import { styled, TextField, TextFieldProps } from "@mui/material"

export const CustomInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: "8.5px 12px 8.5px 4px",
    height: 18,
  },
  "& .MuiFormLabel-root": {
    fontSize: 12,
  },
  "& .MuiFormLabel-root[data-shrink='true']": {
    transform: "translate(16px, -6px) scale(0.75)",
  },
  "& legend": {
    fontSize: 10,
  },
  "& .MuiInputBase-root": {
    paddingRight: 4,
    paddingLeft: 4,
  },
}))

export const Input = (props: TextFieldProps) => <CustomInput {...props} />
