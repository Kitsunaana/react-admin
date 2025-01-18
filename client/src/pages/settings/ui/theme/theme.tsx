import { observer } from "mobx-react-lite"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { useAppSettings, Theme as ITheme } from "shared/lib/app-settings"
import { VariantThemeButton, WrapperButtons } from "./styles"

const themes: ITheme[] = ["dark", "system", "light"]

export const Theme = observer(() => {
  const theme = useAppSettings((store) => store.theme)
  const changeTheme = useAppSettings((store) => store.changeTheme)

  return (
    <div>
      <Text name="changeTheme" />

      <WrapperButtons>
        {themes.map((variant) => (
          <VariantThemeButton
            key={variant}
            isActive={variant === theme}
            onClick={() => changeTheme(variant)}
          >
            <Icon name={variant} />
            <Text name={`themes.${variant}`} onlyText />
          </VariantThemeButton>
        ))}
      </WrapperButtons>
    </div>
  )
})
