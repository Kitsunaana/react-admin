import { Tab as MUITab, useTheme } from "@mui/material"
import { TabProps as BaseTabProps } from "@mui/material/Tab/Tab"
import { observer } from "mobx-react-lite"
import { useMemo } from "react"
import { useLang } from "shared/context/lang"
import { TabLabel } from "shared/ui/tabs/tab-label"

interface TabProps extends Omit<BaseTabProps, "id"> {
  id: number
  caption: string
  icon?: string
  isError?: boolean
  isActive: boolean
  changeTab: (tab: number) => void
  langBase?: string
}

export const Tab = observer((props: TabProps) => {
  const {
    id,
    caption,
    icon,
    isError,
    isActive,
    sx,
    changeTab,
    langBase: langBaseProps,
    ...other
  } = props

  const lang = useLang()
  const langBase = langBaseProps ?? lang

  const {
    palette,
    background:
      {
        gradient: {
          warning,
          primary,
        },
      },
  } = useTheme()

  const memoizedIconSx = useMemo(() => ({
    color: icon === "done" && !isError ? palette.success.main : undefined,
  }), [icon, isError, palette])

  return (
    <MUITab
      onClick={() => changeTab(id)}
      {...other}
      value={id}
      sx={{
        p: 1.2,
        textWrap: "nowrap",
        position: "relative",
        minHeight: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,

        backgroundImage: isError ? warning : null,
        color: isError ? palette.warning.main : null,

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
          backgroundColor: isError ? palette.warning.main : palette.primary.main,
          top: 0,
          borderRadius: 2,
        },
        ...sx,
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
