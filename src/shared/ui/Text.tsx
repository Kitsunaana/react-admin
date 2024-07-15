import { Typography, TypographyProps } from "@mui/material"
import { Trans, useTranslation } from "react-i18next"
import { useLang } from "shared/context/Lang"
import { useEffect, useState } from "react"
import { addEvent } from "shared/lib/event"
import i18n from "i18next"
import { useAppSelector } from "shared/lib/hooks"
import { RootState } from "app/providers/Store"

interface TextProps extends TypographyProps {
  name?: string
  caption?: string
  values?: {}
  value?: string
  langBase?: string
  onlyText?: boolean
}

export const Text = (props: TextProps) => {
  const {
    name, caption, sx, values, value, langBase: langBaseProps, onlyText, ...other
  } = props

  useTranslation()
  useAppSelector((state: RootState) => state.settings.language)

  const lang = useLang()
  const langBase = langBaseProps ?? lang?.lang

  const translate = !!name && (
    <Trans
      i18nKey={`${langBase ? `${langBase}.` : ""}${name}`}
      values={values ?? { value }}
    />
  )

  if (onlyText) return translate

  return (
    <Typography sx={{ ...sx }} {...other}>
      {caption}
      {translate}
    </Typography>
  )
}
