import { useGetAllCharacteristics, useGetAllUnits } from "entities/characteristic"
import { FormProvider } from "react-hook-form"
import { useModalKeyboardManage } from "shared/hooks/use-modal-keyboard-manage"
import { characteristicEditStore } from "../../model/characteristic-edit-store"
import { DefaultFields } from "../../ui/default-fields"
import { RootForm } from "../../ui/root-form"
import { useCharacteristicForm } from "../../view-model/use-characteristic-form"

export const CharacteristicEditForm = ({ formId }: { formId: string }) => {
  const characteristics = useGetAllCharacteristics()
  const units = useGetAllUnits()

  const editForm = useCharacteristicForm({
    defaultFields: characteristicEditStore.characteristic,
    onSubmit: (data) => {
      characteristicEditStore.submitEdit({
        ...characteristicEditStore.characteristic!,
        ...data,
      })
    },
  })

  useModalKeyboardManage({ submit: editForm.handleKeyDownSubmit })

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
