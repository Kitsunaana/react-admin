import { FormProvider, useForm } from "react-hook-form"
import { LangContext, useLang } from "shared/context/lang"
import { useCreateDialogStore } from "shared/ui/dialog/context/dialog-create-context"
import { UpsertDialog } from "shared/ui/dialog/dialog-edit-v3"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { observer } from "mobx-react-lite"
import { Common } from "shared/types/common"
import { useSetDialogValues } from "shared/hooks/use-set-dialog-values"
import { CharacteristicForm } from "./characteristic-form"
import { defaultValues } from "../model/const"

interface CharacteristicEditDialogProps {
  onCreate: (data: Common.CharacteristicCreate) => void
}

export const CharacteristicCreateDialog = observer(({ onCreate }: CharacteristicEditDialogProps) => {
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

  const handleSubmit = (data: Common.CharacteristicCreate) => {
    onCreate(data)
    createStore.closeDialog()
  }

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
          handleSubmit={handleSubmit}
          isLoading={false}
          container={<CharacteristicForm />}
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
