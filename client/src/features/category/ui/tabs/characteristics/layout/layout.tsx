import { ReactNode } from "react"
import { Vertical } from "shared/ui/divider"
import { ActionsContainer, Container, ListContainer } from "./styles"

export const Layout = ({
  list,
  actions,
}: {
  list: ReactNode
  actions: ReactNode
}) => (
  <Container>
    <ListContainer>{list}</ListContainer>
    <Vertical />
    <ActionsContainer>{actions}</ActionsContainer>
  </Container>
)
