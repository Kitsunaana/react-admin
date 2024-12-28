import { observer } from "mobx-react-lite"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Text } from "shared/ui/text"
import { useClearModal } from "../../view-model/use-clear-modal"
import { useCategoryHistory } from "../../facade/use-category-history"
import { useCategoryFormContext } from "../../view-model/form/use-category-form"

export const CreateClearButton = observer(() => {
  const categoryForm = useCategoryFormContext()
  const categoryHistory = useCategoryHistory()

  const onClear = useClearModal(categoryForm.clear)

  if (categoryHistory.noOneEvent) return null

  return (
    <IconButton
      key="clear"
      name="delete"
      color="warning"
      onClick={onClear}
      help={{
        title: (
          <Text
            onlyText
            langBase="global.dialog"
            name="clear"
          />
        ),
      }}
    />
  )
})
