import { openCreateAltNameDialog } from "entities/alt-name"
import { CreateEditForm } from "features/alt-names/ui/alt-name-edit-form"
import { observer } from "mobx-react-lite"
import { FormProvider, useForm } from "react-hook-form"
import { useCreateDialogStore } from "shared/context/dialog-create-context"
import { LangContext, useLang } from "shared/context/lang"
import { useEventBusListen } from "shared/hooks/use-event-bus-listen"
import { useSetDialogValues } from "shared/hooks/use-set-dialog-values"
import { Common } from "shared/types/common"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { UpsertDialog } from "shared/ui/dialog/upsert-dialog"

const defaultValues = {
  locale: null,
  caption: "",
  description: "",
}

interface AltNameCreateDialogProps {
  onCreate: (payload: Common.AltNameBase) => void
}

export const AltNameCreateDialog = observer(({ onCreate }: AltNameCreateDialogProps) => {
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

  useEventBusListen(openCreateAltNameDialog, () => createStore.openDialogV2({}))

  const handleSubmit = (data: Common.AltNameBase) => {
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