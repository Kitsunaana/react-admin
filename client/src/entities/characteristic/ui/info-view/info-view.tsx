import { memo } from "react"
import { Mark } from "shared/ui/mark"
import { HiddenIndicator } from "../hidden-indicator"
import { Container } from "./styles"

export const InfoView = memo(({
  caption,
  unit,
  value,
  hideClient,
}: {
  caption: string
  unit: string | null
  value: string
  hideClient: boolean
}) => (
  <Container>
    <HiddenIndicator hidden={hideClient} />
    <span>
      {caption}
      {": "}
      <Mark>{value}</Mark>
      {" "}
      {unit}
    </span>
  </Container>
))
