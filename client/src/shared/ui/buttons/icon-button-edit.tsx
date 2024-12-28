import { IconButton } from "shared/ui/buttons/icon-button"
import { IconButtonProps } from "shared/ui/buttons/icon-button-base"
import { Text } from "shared/ui/text"

export const IconButtonEdit = ({ langBase, ...other }: Omit<IconButtonProps, "name"> & {
  langBase: string
}) => (
  <IconButton
    fontSize={20}
    color="primary"
    name="edit"
    help={{
      arrow: true,
      title: (
        <Text
          onlyText
          name="edit"
          langBase={langBase}
        />
      ),
    }}
    {...other}
  />
)
