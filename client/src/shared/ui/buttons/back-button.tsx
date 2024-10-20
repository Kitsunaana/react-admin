import { IconButton } from "shared/ui/buttons/icon-button"
import { IconButtonProps } from "shared/ui/buttons/icon-button-base"
import { Text } from "shared/ui/text"

interface BackButtonProps extends Omit<IconButtonProps, "name"> {}

export const BackButton = ({ onClick, ...other }: BackButtonProps) => (
  <IconButton
    name="back"
    color="warning"
    fontSize={20}
    help={{
      title: (
        <Text
          onlyText
          name="back"
        />
      ),
    }}
    {...other}
    onClick={(event) => {
      window.history.back()
      onClick?.(event)
    }}
  />
)
