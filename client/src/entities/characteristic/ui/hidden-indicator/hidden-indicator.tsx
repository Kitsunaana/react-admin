import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import { Root } from "./styles"

export const HiddenIndicator = ({
  hidden,
}: {
  hidden: boolean
}) => {
  if (!hidden) return null

  return (
    <Root
      help={{ title: <Text name="hiddenForClient" /> }}
    >
      <Icon
        name="invisible"
        fontSize="small"
        color="warning"
      />
    </Root>
  )
}
