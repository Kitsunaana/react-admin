import { formLabelClasses, inputBaseClasses } from "@mui/material"
import { styled } from "@mui/material/styles"
import { MuiColorInput, MuiColorInputProps } from "mui-color-input"
import { forwardRef } from "react"

const StyledColorInput = styled(MuiColorInput)(() => ({
  [`& .${inputBaseClasses.root}`]: {
    borderRadius: 8,
    paddingLeft: 8,
  },

  [`& .${inputBaseClasses.input}`]: {
    padding: "8.5px 5px",
    height: 18,
  },

  [`& .${formLabelClasses.root}`]: {
    fontSize: 12,
    top: 3,
  },

  "& .MuiColorInput-Button": {
    height: 16,
    width: 24,
    padding: 0,
  },

  "& legend": {
    fontSize: 8,
  },
}))

type ColorInputProps = {} & MuiColorInputProps

export const ColorInput = forwardRef<HTMLDivElement, ColorInputProps>((props, ref) => {
  const { sx, ...other } = props

  return (
    <StyledColorInput
      ref={ref}
      isAlphaHidden={false}
      format="rgb"
      size="small"
      PopoverProps={{
        anchorOrigin: {
          vertical: "top",
          horizontal: "left",
        },
        transformOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
      }}
      {...other}
    />
  )
})
