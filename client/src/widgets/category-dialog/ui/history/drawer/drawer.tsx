import { observer } from "mobx-react-lite"
import { ReactNode } from "react"
import { Container, EventListContainer, ActionsContainer } from "./styles"

export const DrawerHistory = observer(({
  open,
  onToggle,
  eventList,
  actions,
}: {
  open: boolean
  onToggle: () => void
  eventList: ReactNode
  actions: ReactNode
}) => (
  <Container
    anchor="right"
    open={open}
    onClose={onToggle}
  >
    <EventListContainer>{eventList}</EventListContainer>
    <ActionsContainer>{actions}</ActionsContainer>
  </Container>
))
