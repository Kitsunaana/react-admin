import { Typography, TypographyProps } from "@mui/material"
import { Trans, useTranslation } from "react-i18next"
import { useLang } from "shared/context/Lang"

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

  const { t } = useTranslation()

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
