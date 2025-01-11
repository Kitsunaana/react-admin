import { memo, ReactNode } from "react"
import { Container } from "./styles"

export const Preview = memo(({
  counter,
  photoList,
}: {
  counter: ReactNode
  photoList: ReactNode
}) => (
  <Container>
    {photoList}
    {counter}
  </Container>
))
