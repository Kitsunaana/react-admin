import { observer } from "mobx-react-lite"
import { useCreateDialogStore } from "shared/ui/dialog/context/dialog-create-context"
import { FormProvider, useForm } from "react-hook-form"
import { LangContext, useLang } from "shared/context/lang"
import { useSetDialogValues } from "shared/hooks/use-set-dialog-values"
import { UpsertDialog } from "shared/ui/dialog/dialog-edit-v3"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { CreateEditForm } from "features/alt-names/edit/ui/alt-name-edit-form"
import { useStores } from "features/categories/model/context"

const defaultValues = {
  locale: null,
  caption: "",
  description: "",
}

export const AltNameCreateDialog = observer(() => {
  const { altNames } = useStores()
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
          handleSubmit={(data) => {
            altNames.create(data)
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
