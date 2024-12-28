import { Box } from "shared/ui/box"
import { Text } from "shared/ui/text"
import { Divider } from "shared/ui/divider"
import {
  ChangeIconSettingFill,
  ChangeIconSettingWeight,
  ChangeLanguage,
  ChangeTheme,
} from "features/settings"

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
