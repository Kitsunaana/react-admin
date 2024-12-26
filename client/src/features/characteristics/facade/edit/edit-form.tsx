import { useGetAllCharacteristics, useGetAllUnits } from "entities/characteristic"
import { FormProvider } from "react-hook-form"
import { useKeyboard } from "shared/lib/keyboard-manager"
import { ctrlKey } from "shared/lib/keyboard-manager/handlers"
import { editStore } from "../../model/edit-store"
import { DefaultFields } from "../../ui/default-fields"
import { RootForm } from "../../ui/root-form"
import { useCharacteristicForm } from "../../view-model/use-characteristic-form"

export const CharacteristicEditForm = ({ formId }: { formId: string }) => {
  const characteristics = useGetAllCharacteristics()
  const units = useGetAllUnits()

  const editForm = useCharacteristicForm({
    defaultFields: editStore.characteristic,
    onSubmit: (data) => {
      editStore.submitEdit({
        ...editStore.characteristic!,
        ...data,
      })
    },
  })

  useKeyboard({
    key: "Enter",
    callback: ctrlKey(editForm.handleKeyDownSubmit),
  })

  return (
    <FormProvider {...editForm.form}>
      <RootForm id={formId} onSubmit={editForm.handleFormSubmit}>
        <DefaultFields
          characteristics={characteristics.captions}
          defaultValue={editForm.defaultValue}
          units={units.captions}
        />
      </RootForm>
    </FormProvider>
  )
}
