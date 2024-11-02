import { openEditAltNameDialog } from "entities/alt-name"
import { CreateEditForm } from "features/alt-names/ui/alt-name-edit-form"
import { observer } from "mobx-react-lite"
import { FormProvider, useForm } from "react-hook-form"
import { useEditDialogStore } from "shared/context/dialog-edit-context"
import { LangContext } from "shared/context/lang"
import { useEventBusListen } from "shared/hooks/use-event-bus-listen"
import { useSetDialogValues } from "shared/hooks/use-set-dialog-values"
import { Common } from "shared/types/common"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { UpsertDialog } from "shared/ui/dialog/upsert-dialog"
import { useKeyboard } from "shared/lib/keyboard-manager"

interface AltNameEditDialogProps {
  onEdit: (payload: Common.AltNameCreate) => void
}

export const AltNameEditDialog = observer(({ onEdit } : AltNameEditDialogProps) => {
  const editStore = useEditDialogStore()
  const methods = useForm()

  useSetDialogValues({
    data: editStore.localData as Common.AltNameCreate,
    shouldHandle: [editStore.open],
    setData: [methods.reset],
    clearData: [methods.reset],
  })

  useEventBusListen(openEditAltNameDialog, ({ payload }) => {
    editStore.openDialogV2(payload)
  })

  useKeyboard({
    key: "Escape",
    disabled: !editStore.open,
    callback: editStore.closeDialog,
  })

  const handleSubmit = (data: Common.AltNameCreate) => {
    onEdit(data)
    editStore.closeDialog()
  }

  return (
    <FormProvider {...methods}>
      <LangContext lang="altNames.dialog">
        <UpsertDialog
          header={(
            <DialogHeader
              store={editStore}
              title={(
                <DialogHeaderCaption
                  name="title.edit"
                  value={editStore.localData?.caption}
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
