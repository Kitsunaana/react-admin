import { memo, useMemo } from "react"
import * as React from "react"
import { Tab as MUITab, useTheme } from "@mui/material"
import { TabProps as BaseTabProps } from "@mui/material/Tab/Tab"
import { dispatch } from "shared/lib/event"
import { useLang } from "shared/context/Lang"
import { TabLabel } from "shared/ui/tabs/tab-label"

interface TabProps extends Omit<BaseTabProps, "id"> {
  isError: boolean
  caption: string
  icon?: string
  id: number
  langBase?: string
  isActive: boolean
}

export const Tab = memo((props: TabProps) => {
  const {
    id, isError, icon, caption, langBase: langBaseProps, isActive, ...other
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
        position: "relative",
        p: 1.2,
        minHeight: 0,
        backgroundImage: isError ? warning : null,
        color: isError ? palette.warning.main : null,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        "&.Mui-selected": {
          backgroundImage: isError ? warning : primary,
          color: isError ? palette.warning.main : null,
        },
        "&::before": {
          position: "absolute",
          content: "''",
          width: isActive ? "calc(100% - 16px)" : 0,
          height: 3,
          transition: ".3s",
          backgroundColor: ({ palette }) => (isError ? palette.warning.main : palette.primary.main),
          top: 0,
          borderRadius: 2,
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