import { useLang } from "shared/context/lang"
import { IconButton } from "shared/ui/buttons/icon-button"
import { IconButtonProps } from "shared/ui/buttons/icon-button-base"
import { Text } from "shared/ui/text"

export const IconButtonDelete = (props: Omit<IconButtonProps, "name">) => {
  const { ...other } = props

  const langBase = useLang()

  return (
    <IconButton
      fontSize={20}
      color="warning"
      name="delete"
      help={{ title: <Text onlyText name="delete" langBase={langBase} /> }}
      {...other}
    />
  )
}
