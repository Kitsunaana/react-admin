import React from "react"
import { TooltipProps } from "@mui/material"
import { IconButton } from "shared/ui/buttons/icon-button"
import { IconButtonProps } from "shared/ui/buttons/icon-button-base"
import { useLang } from "shared/context/Lang"
import { useTranslation } from "react-i18next"
import { Text } from "shared/ui/text"

interface IconButtonDeleteProps extends Omit<IconButtonProps, "name"> {
  help?: boolean | Omit<TooltipProps, "children">
}

export const IconButtonDelete = (props: IconButtonDeleteProps) => {
  const { help = true, ...other } = props

  const langBase = useLang()

  return (
    <IconButton
      fontSize={20}
      color="warning"
      name="delete"
      help={{ title: <Text onlyText name="delete" langBase={langBase} />, arrow: true }}
      {...other}
    />
  )
}
