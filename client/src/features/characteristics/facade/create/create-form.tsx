import { useGetAllCharacteristics, useGetAllUnits } from "entities/characteristic"
import { FormProvider } from "react-hook-form"
import { useModalKeyboardManage } from "shared/hooks/use-modal-keyboard-manage"
import { characteristicCreateStore } from "../../model/characteristic-create-store"
import { DefaultFields } from "../../ui/default-fields"
import { RootForm } from "../../ui/root-form"
import { useCharacteristicForm } from "../../view-model/use-characteristic-form"

export const CharacteristicCreateForm = ({ formId }: { formId: string }) => {
  const characteristics = useGetAllCharacteristics()
  const units = useGetAllUnits()

  const createForm = useCharacteristicForm({
    onSubmit: characteristicCreateStore.submitCreate,
  })

  useModalKeyboardManage({ submit: createForm.handleKeyDownSubmit })

  return (
    <FormProvider {...createForm.form}>
      <RootForm id={formId} onSubmit={createForm.handleFormSubmit}>
        <DefaultFields
          defaultValue={createForm.defaultValue}
          characteristics={characteristics.captions}
          units={units.captions}
        />
      </RootForm>
    </FormProvider>
  )
}
