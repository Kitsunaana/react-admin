import { ChangeSettingLanguage } from "../ui/language"
import { ChangeSettingTheme } from "../ui/theme"
import { ChangeSettingIconFill } from "../ui/icon-fill"
import { ChangeSettingIconWeight } from "../ui/icon-weight"
import { Root } from "../ui/root"

const Page = () => (
  <Root
    language={<ChangeSettingLanguage />}
    theme={<ChangeSettingTheme />}
    iconWeight={<ChangeSettingIconWeight />}
    iconFill={<ChangeSettingIconFill />}
  />
)

export default Page
