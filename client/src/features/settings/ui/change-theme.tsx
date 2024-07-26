import { Text } from "shared/ui/text"
import { Box } from "shared/ui/box"
import { alpha, ButtonBase, useTheme } from "@mui/material"
import { Icon } from "shared/ui/icon"
import { changeTheme, Themes } from "features/settings/model/settings-slice"
import { useAppDispatch, useAppSelector } from "shared/lib/hooks"
import { RootState } from "app/providers/store"

const themes = [
  {
    value: "light",
    icon: "light",
    caption: "themes.light",
  },
  {
    value: "system",
    icon: "system",
    caption: "themes.system",
  },
  {
    value: "dark",
    icon: "dark",
    caption: "themes.dark",
  },
]

export const ChangeTheme = () => {
  const { palette: { mode } } = useTheme()

  const dispatch = useAppDispatch()

  const theme = useAppSelector((state: RootState) => state.settings.theme)

  const handleOnChangeTheme = (value: string) => {
    dispatch(changeTheme({ theme: value as Themes }))
  }

  return (
    <Box>
      <Text name="change-theme" sx={{ mb: 1 }} />

      <Box
        row
        sx={{
          border: ({ palette }) => `1px solid ${alpha(palette.grey["400"], mode === "light" ? 1 : 0.5)}`,
          p: 0.5,
          display: "inline-flex",
          borderRadius: 1,
          gap: 0.5,
        }}
      >
        {themes.map((item) => (
          <ButtonBase
            onClick={() => handleOnChangeTheme(item.value)}
            key={item.value}
            sx={{
              fontSize: 16,
              userSelect: "none",
              textTransform: "uppercase",
              borderRadius: 1,
              px: 1,
              pt: 1,
              pb: 0.25,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              "&:hover": {
                transition: ".2s",
                backgroundColor: ({ palette }) => (mode === "light" ? palette.grey["100"] : alpha(palette.common.white, 0.06)),
              },
              backgroundColor: ({ palette }) => (theme === item.value
                ? (mode === "light" ? palette.grey["300"] : alpha(palette.common.white, 0.16))
                : null),
            }}
          >
            <Icon name={item.icon} />
            <Text name={item.caption} onlyText />
          </ButtonBase>
        ))}
      </Box>
    </Box>
  )
}
