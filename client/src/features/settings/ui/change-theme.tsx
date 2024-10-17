import {
  alpha,
  ButtonBase,
  ButtonBaseProps,
  Theme,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { Themes } from "features/settings/model/settings-slice"
import { observer } from "mobx-react-lite"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { useSettings } from "../model/context"

const themes: Array<Themes> = ["dark", "system", "light"]

interface VariantThemeButtonProps extends ButtonBaseProps {
  isActive: boolean
  theme?: Theme
}

const VariantThemeButton = styled(
  ({ isActive, ...other }: VariantThemeButtonProps) => <ButtonBase {...other} />,
)(({ isActive, theme }: VariantThemeButtonProps) => {
  if (theme === undefined) throw new Error("Theme is not defined")

  const { palette } = theme
  const { mode, grey, common } = palette

  const isLight = mode === "light"

  return {
    fontSize: 16,
    userSelect: "none",
    textTransform: "uppercase",
    borderRadius: 8,
    padding: "8px 8px 2px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    "&:hover": {
      transition: ".2s",
      backgroundColor: isLight ? grey["100"] : alpha(common.white, 0.06),
    },
    backgroundColor: isActive
      ? (isLight ? grey["300"] : alpha(common.white, 0.16))
      : undefined,
  }
})

const WrapperButtons = styled("div")(({ theme: { palette } }) => ({
  border: `1px solid ${alpha(palette.grey["400"], palette.mode === "light" ? 1 : 0.5)}`,
  padding: 4,
  display: "inline-flex",
  borderRadius: 12,
  gap: 4,
}))

export const ChangeTheme = observer(() => {
  const settings = useSettings()

  return (
    <div>
      <Text name="changeTheme" sx={{ mb: 1 }} />

      <WrapperButtons>
        {themes.map((theme) => (
          <VariantThemeButton
            key={theme}
            isActive={settings.theme === theme}
            onClick={() => settings.onChangeTheme(theme)}
          >
            <Icon name={theme} />
            <Text name={`themes.${theme}`} onlyText />
          </VariantThemeButton>
        ))}
      </WrapperButtons>
    </div>
  )
})
