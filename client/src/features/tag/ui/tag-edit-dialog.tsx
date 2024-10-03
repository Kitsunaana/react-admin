import { observer } from "mobx-react-lite"
import { FormProvider, useForm } from "react-hook-form"
import { LangContext, useLang } from "shared/context/lang"
import { useSetDialogValues } from "shared/hooks/use-set-dialog-values"
import { UpsertDialog } from "shared/ui/dialog/dialog-edit-v3"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { CategoryDto } from "shared/types/category"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { defaultValues } from "../model/const"
import { TagForm } from "./tag-form"

interface TagEditDialogProps {
  onEdit: (data: CategoryDto.TagCreate) => void
}

export const TagEditDialog = observer(({ onEdit }: TagEditDialogProps) => {
  const methods = useForm<CategoryDto.TagBase>()
  const editStore = useEditDialogStore()
  const langBase = useLang()

  useSetDialogValues({
    data: editStore.localData,
    defaults: defaultValues,
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
            console.log(data)
            onEdit(data)
            editStore.closeDialog()
          }}
          isLoading={false}
          container={<TagForm />}
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
