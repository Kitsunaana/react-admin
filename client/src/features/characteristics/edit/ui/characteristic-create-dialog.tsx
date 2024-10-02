import { FormProvider, useForm } from "react-hook-form"
import { CreateEditForm } from "features/characteristics/edit/ui/create-edit-form"
import { UseCharacteristicsFormProps } from "features/characteristics/edit/model/types"
import { LangContext, useLang } from "shared/context/lang"
import { CharacteristicsStore } from "entities/characteristic/model/store"
import { useCreateDialogStore } from "shared/ui/dialog/context/dialog-create-context"
import { UpsertDialog } from "shared/ui/dialog/dialog-edit-v3"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { observer } from "mobx-react-lite"
import { Common } from "shared/types/common"
import { useSetDialogValues } from "shared/hooks/use-set-dialog-values"

interface CharacteristicEditDialogProps { characteristics: CharacteristicsStore }

const defaultValues = {
  characteristic: null,
  unit: null,
  value: "",
  hideClient: true,
}

export const CharacteristicCreateDialog = observer((props: CharacteristicEditDialogProps) => {
  const { characteristics } = props
  const createStore = useCreateDialogStore()
  const methods = useForm({ defaultValues })
  const langBase = useLang()

  useSetDialogValues({
    data: defaultValues,
    defaults: defaultValues,
    shouldHandle: [createStore.open],
    setData: [methods.reset],
    clearData: [methods.reset],
  })

  return (
    <FormProvider {...methods}>
      <LangContext lang={`${langBase}.dialog`}>
        <UpsertDialog
          header={(
            <DialogHeader
              store={createStore}
              title={(
                <DialogHeaderCaption
                  name="create"
                />
              )}
            />
          )}
          height="auto"
          size="auto"
          store={createStore}
          handleSubmit={(data: Common.CharacteristicCreate) => {
            characteristics.create(data)
            createStore.closeDialog()
          }}
          isLoading={false}
          container={<CreateEditForm />}
          PaperProps={{
            sx: {
              maxWidth: createStore.fullScreen
                ? "95% !important"
                : "840px !important",
              maxHeight: "95%",
            },
          }}
        />
      </LangContext>
    </FormProvider>
  )
})
