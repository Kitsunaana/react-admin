import { Box } from "shared/ui/box"
import { Text } from "shared/ui/text"
import { Divider } from "shared/ui/divider"
import { ChangeLanguage } from "features/settings/ui/change-language"
import { ChangeTheme } from "features/settings/ui/change-theme"
import { ChangeIconSettingWeight } from "features/settings/ui/change-icon-setting-weight"
import { ChangeIconSettingFill } from "features/settings/ui/change-icon-setting-fill"

const SettingsPage = () => (
  <Box flex gap={2} sx={{ p: 1 }}>
    <ChangeLanguage />
    <ChangeTheme />

    <Divider><Text name="iconSettings" /></Divider>

    <Box sx={{ px: 2.5 }}>
      <Text name="changeIconThickness" />

      <ChangeIconSettingWeight />
      <ChangeIconSettingFill />
    </Box>
  </Box>
)

export default SettingsPage
