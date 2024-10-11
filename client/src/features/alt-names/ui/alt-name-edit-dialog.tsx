import { openEditAltNameDialog } from "entities/alt-name"
import { CreateEditForm } from "features/alt-names/ui/alt-name-edit-form"
import { observer } from "mobx-react-lite"
import { FormProvider, useForm } from "react-hook-form"
import { useEditDialogStore } from "shared/context/dialog-edit-context"
import { LangContext, useLang } from "shared/context/lang"
import { useEventBusListen } from "shared/hooks/use-event-bus-listen"
import { useSetDialogValues } from "shared/hooks/use-set-dialog-values"
import { Common } from "shared/types/common"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { UpsertDialog } from "shared/ui/dialog/upsert-dialog"

interface AltNameEditDialogProps {
  onEdit: (payload: Common.AltNameCreate) => void
}

export const AltNameEditDialog = observer(({ onEdit } : AltNameEditDialogProps) => {
  const editStore = useEditDialogStore()
  const methods = useForm()
  const langBase = useLang()

  useSetDialogValues({
    data: editStore.localData as Common.AltNameCreate,
    shouldHandle: [editStore.open],
    setData: [methods.reset],
    clearData: [methods.reset],
  })

  useEventBusListen(openEditAltNameDialog, ({ payload }) => {
    editStore.openDialogV2(payload)
  })

  const handleSubmit = (data: Common.AltNameCreate) => {
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
          container={<CreateEditForm />}
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
