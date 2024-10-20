import { IconButton } from "shared/ui/buttons/icon-button"
import { Text } from "shared/ui/text"

interface RefetchButtonProps {
  onRefetch: () => void
}

export const RefetchButton = (props: RefetchButtonProps) => {
  const { onRefetch } = props

  return (
    <IconButton
      help={{ arrow: true, title: <Text onlyText name="refresh" /> }}
      onClick={onRefetch}
      name="reload"
      color="primary"
      fontSize={20}
    />
  )
}
