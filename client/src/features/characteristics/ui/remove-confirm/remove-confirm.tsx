import { Characteristic } from "shared/types/new_types/types"
import { Mark } from "shared/ui/mark"
import { Text } from "shared/ui/text"
import { Row, Container } from "./styles"

export const RemoveConfirm = ({
  data,
  langBase,
}: {
  data: Characteristic,
  langBase: string
}) => (
  <>
    <Text langBase={langBase} name="description" />
    <Row>
      <Container>
        {data.hideClient}
        {data.caption}
        <Mark>{data.value}</Mark>
        {data.unit}
      </Container>
    </Row>
  </>
)