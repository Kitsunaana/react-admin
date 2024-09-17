import { Typography, TypographyProps } from "@mui/material"
import { Trans, TransProps, useTranslation } from "react-i18next"
import { useLang } from "shared/context/Lang"
import { memo, ReactNode } from "react"
import { useAppSelector } from "shared/lib/hooks"
import { RootState } from "app/providers/store"

interface TextProps extends TypographyProps {
  name?: string
  caption?: string | ReactNode
  values?: {}
  value?: string
  langBase?: string
  onlyText?: boolean

  translateOptions?: TransProps<string>
}

export const Text = memo((props: TextProps) => {
  const {
    name, caption, sx, values, value, langBase: langBaseProps, onlyText, translateOptions, ...other
  } = props

  useTranslation()
  useAppSelector((state: RootState) => state.settings.language)

  const lang = useLang()
  const langBase = langBaseProps ?? lang

  const translate = !!name && (
    <Trans
      i18nKey={`${langBase ? `${langBase}.` : ""}${name}`}
      values={values ?? { value }}
      {...translateOptions}
    />
  )

  if (onlyText && translate) {
    return translate
  }

  return (
    <Typography sx={{ fontSize: "inherit", ...sx }} {...other}>
      {caption}
      {translate}
    </Typography>
  )
})
