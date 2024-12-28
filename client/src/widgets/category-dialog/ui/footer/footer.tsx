import { ReactNode } from "react"
import { Container } from "./styles"

export const Footer = ({ children }: { children: ReactNode }) => (
  <Container>
    {children}
  </Container>
)
