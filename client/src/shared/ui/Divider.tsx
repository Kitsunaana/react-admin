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
      sx={{ mx: 0.75, ...sx }}
      {...other}
    />
  )
}
