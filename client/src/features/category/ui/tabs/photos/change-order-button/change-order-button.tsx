import { Text } from "shared/ui/text"
import { Button } from "./styles"

export const ChangeOrderButton = ({
  direction,
  onClick,
}: {
  direction: string
  onClick: () => void
}) => (
  <Button
    name="expand"
    fontSize={20}
    onClick={onClick}
    help={{
      title: (
        <Text
          onlyText
          name={`forms.${direction}`}
        />
      ),
    }}
  />
)
