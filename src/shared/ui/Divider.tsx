import { Divider as MUIDivider, DividerProps } from "@mui/material"

export const Divider = (props: DividerProps) => (
  <MUIDivider {...props} />
)

export const Vertical = (props: DividerProps) => {
  const { sx, ...other } = props

  return (
    <Divider
      orientation="vertical"
      flexItem
      sx={{ mr: 0.5, my: 0.5, ...sx }}
      {...other}
    />
  )
}
