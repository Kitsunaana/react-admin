import { useCreateDialogStore } from "shared/context/dialog-create-context"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Text } from "shared/ui/text"

export const CreateButton = () => {
  const { openDialog } = useCreateDialogStore()

  return (
    <IconButton
      help={{ title: <Text onlyText name="add" /> }}
      name="add"
      color="success"
      fontSize={20}
      onClick={() => openDialog(null)}
    />
  )
}
