import React from "react"
import { TooltipProps } from "@mui/material"
import { IconButton } from "shared/ui/buttons/icon-button"
import { IconButtonProps } from "shared/ui/buttons/icon-button-base"
import { useLang } from "shared/context/Lang"
import { useTranslation } from "react-i18next"

interface IconButtonDeleteProps extends Omit<IconButtonProps, "name"> {
  help?: boolean | Omit<TooltipProps, "children">
}

export const IconButtonDelete = (props: IconButtonDeleteProps) => {
  const { help = true, ...other } = props

  const langBase = useLang()?.lang ?? ""
  const { t } = useTranslation("locales", { keyPrefix: langBase })

  return (
    <IconButton
      fontSize={20}
      color="warning"
      name="delete"
      help={{ title: t("delete"), arrow: true }}
      {...other}
    />
  )
}
