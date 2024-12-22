import { ReactNode } from "react"
import { Vertical } from "shared/ui/divider"
import { Container, Actions } from "./styles"

export const Layout = ({
  list,
  actions,
}: {
  list: ReactNode
  actions: ReactNode
}) => (
  <Container>
    {list}
    <Vertical />
    <Actions>{actions}</Actions>
  </Container>
)
