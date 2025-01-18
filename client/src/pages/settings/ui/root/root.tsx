import { Text } from "shared/ui/text"
import { Divider } from "shared/ui/divider"
import { ReactNode } from "react"
import { Container, IconSettingsContainer } from "./styles"

export const Root = ({
  language,
  theme,
  iconWeight,
  iconFill,
}: {
  language: ReactNode
  theme: ReactNode
  iconWeight: ReactNode
  iconFill: ReactNode
}) => (
  <Container>
    {language}
    {theme}

    <Divider><Text name="iconSettings" /></Divider>

    <IconSettingsContainer>
      <Text name="changeIconThickness" />

      {iconWeight}
      {iconFill}
    </IconSettingsContainer>
  </Container>
)
