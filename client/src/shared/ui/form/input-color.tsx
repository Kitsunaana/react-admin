import { MuiColorInput, MuiColorInputProps } from "mui-color-input"
import { forwardRef } from "react"

type ColorInputProps = {} & MuiColorInputProps

export const ColorInput = forwardRef<HTMLDivElement, ColorInputProps>((props, ref) => {
  const { sx, ...other } = props

  return (
    <MuiColorInput
      ref={ref}
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
      isAlphaHidden={false}
      format="rgb"
      size="small"
      sx={{
        "& .MuiInputBase-root": {
          borderRadius: 2,
          pl: 1,
        },
        "& .MuiInputBase-input": {
          padding: "8.5px 5px",
          height: 18,
        },
        "& .MuiColorInput-Button": {
          height: 16,
          width: 24,
          p: 0,
        },
        "& .MuiFormLabel-root": {
          fontSize: 12,
          top: 3,
        },
        "& legend": {
          fontSize: 8,
        },
        ...sx,
      }}
      {...other}
    />
  )
})
