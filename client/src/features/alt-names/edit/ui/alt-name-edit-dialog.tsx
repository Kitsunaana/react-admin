import { observer } from "mobx-react-lite"
import { FormProvider, useForm } from "react-hook-form"
import { LangContext, useLang } from "shared/context/lang"
import { useSetDialogValues } from "shared/hooks/use-set-dialog-values"
import { UpsertDialog } from "shared/ui/dialog/dialog-edit-v3"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { CreateEditForm } from "features/alt-names/edit/ui/alt-name-edit-form"
import { useStores } from "features/categories/model/context"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { Common } from "shared/types/common"

export const AltNameEditDialog = observer(() => {
  const { altNames } = useStores()
  const editStore = useEditDialogStore()
  const methods = useForm()
  const langBase = useLang()

  const findAltName = altNames.filteredItems
    .find((item) => item.id === editStore.id) as Common.AltNameCreate

  useSetDialogValues({
    data: findAltName,
    shouldHandle: [editStore.open],
    setData: [methods.reset],
    clearData: [methods.reset],
  })

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
          handleSubmit={(data) => {
            altNames.edit(data)
            editStore.closeDialog()
          }}
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
