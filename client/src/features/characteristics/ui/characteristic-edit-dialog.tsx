import { FormProvider, useForm } from "react-hook-form"
import { LangContext, useLang } from "shared/context/lang"
import { UpsertDialog } from "shared/ui/dialog/dialog-edit-v3"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { observer } from "mobx-react-lite"
import { Common } from "shared/types/common"
import { useSetDialogValues } from "shared/hooks/use-set-dialog-values"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { CharacteristicForm } from "./characteristic-form"
import { defaultValues } from "../model/const"

interface CharacteristicEditDialogProps {
  onEdit: (data: Common.CharacteristicCreate) => void
}

export const CharacteristicEditDialog = observer(({ onEdit }: CharacteristicEditDialogProps) => {
  const editStore = useEditDialogStore()
  const methods = useForm()
  const langBase = useLang()

  useSetDialogValues({
    data: editStore.localData as Common.CharacteristicCreate,
    defaults: defaultValues,
    shouldHandle: [editStore.open],
    setData: [methods.reset],
    clearData: [methods.reset],
  })

  const handleSubmit = (data: Common.CharacteristicCreate) => {
    onEdit(data)
    editStore.closeDialog()
  }

  return (
    <FormProvider {...methods}>
      <LangContext lang={`${langBase}.dialog`}>
        <UpsertDialog
          header={(
            <DialogHeader
              store={editStore}
              title={(
                <DialogHeaderCaption
                  name="create"
                />
              )}
            />
          )}
          height="auto"
          size="auto"
          store={editStore}
          handleSubmit={handleSubmit}
          isLoading={false}
          container={<CharacteristicForm />}
          PaperProps={{
            sx: {
              maxWidth: editStore.fullScreen
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