import { IconButton } from "shared/ui/buttons/icon-button"
import { IconButtonProps } from "shared/ui/buttons/icon-button-base"
import { Text } from "shared/ui/text"

export const IconButtonDelete = ({ langBase, ...other }: Omit<IconButtonProps, "name"> & {
  langBase: string
}) => (
  <IconButton
    fontSize={20}
    color="warning"
    name="delete"
    help={{
      title: (
        <Text
          onlyText
          name="delete"
          langBase={langBase}
        />
      ),
    }}
    {...other}
  />
)
