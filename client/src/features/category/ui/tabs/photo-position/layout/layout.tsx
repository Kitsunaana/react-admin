import { ReactNode } from "react"
import { Container, Title } from "./styles"

export const Layout = ({
  form,
  slider,
}: {
  form: ReactNode
  slider: ReactNode
}) => (
  <Container>
    {form}
    <Title name="positionInContainer" />
    {slider}
  </Container>
)
