import {
  IconButton, styled, TextField, TextFieldProps,
} from "@mui/material"
import { forwardRef } from "react"

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

/**
 * <Input
 *         fullWidth
 *         value={option.value}
 *         onChange={handleOnChange}
 *         onFocus={() => setVisible(true)}
 *         InputProps={{
 *           startAdornment: ((option.value !== "" && option.icon) && (
 *           <Icon
 *             name={option.icon}
 *             sx={{ fontSize: 20 }}
 *           />
 *           )),
 *           endAdornment: (
 *             <>
 *               {(option.value !== "" && clear) && (
 *               <IconButton
 *                 sx={{ p: 0.25 }}
 *                 onClick={() => {
 *                   setValue(name, "")
 *                   setOption((prevState) => ({
 *                     ...prevState,
 *                     value: "",
 *                   }))
 *                 }}
 *               >
 *                 <Icon sx={{ fontSize: 20 }} name="clear" />
 *               </IconButton>
 *               )}
 *               <IconButton sx={{ p: 0.25 }} onClick={() => setVisible((prevState) => !prevState)}>
 *                 <Icon
 *                   sx={{
 *                     fontSize: 20,
 *                     transition: ".3s",
 *                     transform: `rotate(${visible ? 180 : 0}deg)`,
 *                   }}
 *                   name="expand"
 *                 />
 *               </IconButton>
 *             </>
 *           ),
 *         }}
 *         {...otherInputProps}
 *         {...otherRegister}
 *       />
 */

type InputProps = {
  clear?: boolean
  name?: string
  setValue?: (name: string, value: string) => void
} & TextFieldProps

export const Input = forwardRef<HTMLDivElement, InputProps>((props, ref) => {
  const {
    clear, name, setValue, ...other
  } = props

  /* const clearButton = clear && (
    <IconButton
      sx={{ p: 0.25 }}
      onClick={() => {
        if (typeof setValue === "function") setValue(name, "")
        setOption((prevState) => ({
          ...prevState,
          value: "",
        }))
      }}
    >
      <Icon sx={{ fontSize: 20 }} name="clear" />
    </IconButton>
  ) */

  return (
    <CustomInput ref={ref} {...other} />
  )
})
