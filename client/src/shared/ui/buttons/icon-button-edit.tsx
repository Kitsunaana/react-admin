import React from "react"
import { TooltipProps } from "@mui/material"
import { IconButton } from "shared/ui/buttons/icon-button"
import { IconButtonProps } from "shared/ui/buttons/icon-button-base"
import { useLang } from "shared/context/Lang"
import { useTranslation } from "react-i18next"
import { Text } from "shared/ui/text"

interface IconButtonEditProps extends Omit<IconButtonProps, "name"> {
  help?: boolean | Omit<TooltipProps, "children">
}

export const IconButtonEdit = (props: IconButtonEditProps) => {
  const { help = true, ...other } = props

  const langBase = useLang()

  return (
    <IconButton
      fontSize={20}
      color="primary"
      name="edit"
      help={{ title: <Text onlyText name="edit" langBase={langBase} />, arrow: true }}
      {...other}
    />
  )
}
