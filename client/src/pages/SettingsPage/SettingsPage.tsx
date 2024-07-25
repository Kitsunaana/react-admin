import { Box } from "shared/ui/Box"
import { Text } from "shared/ui/Text"
import { Divider } from "shared/ui/Divider"
import { ChangeLanguage } from "features/settings/ui/ChangeLanguage"
import { ChangeTheme } from "features/settings/ui/ChangeTheme"
import { ChangeIconSettingWeight } from "features/settings/ui/ChangeIconSettingWeight"
import { ChangeIconSettingFill } from "features/settings/ui/ChangeIconSettingFill"

const SettingsPage = () => (
  <Box flex gap={2} sx={{ p: 1 }}>
    <ChangeLanguage />

    <ChangeTheme />

    <Divider><Text name="icons" /></Divider>

    <Box sx={{ px: 2.5 }}>
      <Text name="icon-thickness" />

      <ChangeIconSettingWeight />

      <ChangeIconSettingFill />
    </Box>
  </Box>
)

export default SettingsPage
