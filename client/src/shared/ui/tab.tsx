import { memo, useMemo } from "react"
import { Box } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import * as React from "react"
import { SxProps, Tab as MUITab, useTheme } from "@mui/material"
import { TabProps as BaseTabProps } from "@mui/material/Tab/Tab"
import { dispatch } from "shared/lib/event"
import { useLang } from "shared/context/Lang"

interface TabLabelProps {
  icon: string
  caption: string
  sx?: SxProps
  sxIcon?: SxProps
  sxText?: SxProps
}

export const TabLabel = memo((props: TabLabelProps) => {
  const {
    icon, caption, sx, sxIcon, sxText,
  } = props

  return (
    <Box flex ai gap row sx={sx}>
      <Icon name={icon} sx={{ fontSize: 20, ...sxIcon }} />
      <Text caption={caption} sx={{ fontSize: 14, textTransform: "none", ...sxText }} />
    </Box>
  )
})

interface TabProps extends Omit<BaseTabProps, "id"> {
  isError: boolean
  caption: string
  icon?: string
  id: number
  langBase?: string
}

export const Tab = memo((props: TabProps) => {
  const {
    id, isError, icon, caption, langBase: langBaseProps, ...other
  } = props

  const lang = useLang()
  const langBase = langBaseProps ?? lang?.lang

  const { palette, background: { gradient: { warning, primary } } } = useTheme()

  const memoizedIconSx = useMemo(() => ({
    color: icon === "done" && !isError ? palette.success.main : undefined,
  }), [icon, isError, palette])

  return (
    <MUITab
      onClick={() => dispatch(`${langBase}.changeTab` as any, { tab: id })}
      {...other}
      value={id}
      key={id}
      sx={{
        p: 1.2,
        minHeight: 0,
        backgroundImage: isError ? warning : null,
        color: isError ? palette.warning.main : null,
        "&.Mui-selected": {
          backgroundImage: isError ? warning : primary,
          color: isError ? palette.warning.main : null,
        },
      }}
      label={(
        <TabLabel
          icon={isError ? "warning" : icon ?? ""}
          caption={`${langBase ?? "global"}.${caption}`}
          sxIcon={memoizedIconSx}
        />
      )}
    />
  )
})