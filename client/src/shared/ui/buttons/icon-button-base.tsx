import {
  IconButton as MUIIconButton, IconButtonProps as MUIIconButtonProps, Theme,
} from "@mui/material"
import { SxProps } from "@mui/system"
import { memo } from "react"
import { Icon } from "shared/ui/icon"

export interface IconButtonProps extends MUIIconButtonProps {
  name: string
  sxIcon?: SxProps<Theme>
  fontSize?: number
}

export const IconButtonBase = memo((props: IconButtonProps) => {
  const {
    sx, name, sxIcon, fontSize, ...otherProps
  } = props

  return (
    <MUIIconButton sx={{ p: 0.5, ...sx }} {...otherProps}>
      <Icon
        name={name}
        sx={{
          fontSize,
          ...sxIcon,
        }}
      />
    </MUIIconButton>
  )
})
