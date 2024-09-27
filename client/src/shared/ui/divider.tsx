import { Divider as MUIDivider, DividerProps as MUIDividerProps } from "@mui/material"

interface DividerProps extends MUIDividerProps {
}

export const Divider = (props: DividerProps) => (
  <MUIDivider {...props} />
)

interface VerticalProps extends MUIDividerProps{
  disableMargin?: boolean
}

export const Vertical = (props: VerticalProps) => {
  const { sx, disableMargin, ...other } = props

  return (
    <Divider
      orientation="vertical"
      flexItem
      sx={{ mx: 0.75, ...(disableMargin ? { m: 0 } : {}), ...sx }}
      {...other}
    />
  )
}
