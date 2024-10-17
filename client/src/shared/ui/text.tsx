import { Typography, TypographyProps } from "@mui/material"
import { observer } from "mobx-react-lite"
import { ReactNode } from "react"
import { Trans, TransProps, useTranslation } from "react-i18next"
import { useLang } from "shared/context/lang"

interface TextProps extends TypographyProps {
  name?: string
  caption?: string | ReactNode
  values?: {}
  value?: string
  langBase?: string
  onlyText?: boolean
  translateOptions?: TransProps<string>
}

export const Text = observer((props: TextProps) => {
  const {
    name,
    caption,
    sx,
    values,
    value,
    onlyText,
    translateOptions,
    langBase: langBaseProps,
    ...other
  } = props

  useTranslation()

  const lang = useLang()
  const langBase = langBaseProps ?? lang

  const translate = !!name && (
    <Trans
      i18nKey={`${langBase ? `${langBase}.` : ""}${name}`}
      values={values ?? { value }}
      {...translateOptions}
    />
  )

  if (onlyText && translate) return translate

  return (
    <Typography sx={{ fontSize: "inherit", ...sx }} {...other}>
      {caption}
      {translate}
    </Typography>
  )
})
