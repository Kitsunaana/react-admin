import React from "react"
import { TooltipProps } from "@mui/material"
import { IconButton } from "shared/ui/buttons/icon-button"
import { IconButtonProps } from "shared/ui/buttons/icon-button-base"
import { useLang } from "shared/context/Lang"
import { useTranslation } from "react-i18next"

interface IconButtonEditProps extends Omit<IconButtonProps, "name"> {
  help?: boolean | Omit<TooltipProps, "children">
}

export const IconButtonEdit = (props: IconButtonEditProps) => {
  const { help = true, ...other } = props

  const langBase = useLang()?.lang ?? ""
  const { t } = useTranslation("locales", { keyPrefix: langBase })

  return (
    <IconButton
      fontSize={20}
      color="primary"
      name="edit"
      help={{ title: t("edit"), arrow: true }}
      {...other}
    />
  )
}
