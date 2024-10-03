import { observer } from "mobx-react-lite"
import { useCreateDialogStore } from "shared/ui/dialog/context/dialog-create-context"
import { FormProvider, useForm } from "react-hook-form"
import { LangContext, useLang } from "shared/context/lang"
import { useSetDialogValues } from "shared/hooks/use-set-dialog-values"
import { UpsertDialog } from "shared/ui/dialog/dialog-edit-v3"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { CategoryDto } from "shared/types/category"
import { defaultValues } from "../model/const"
import { TagForm } from "./tag-form"

interface TagCreateDialogProps {
  onCreate: (data: CategoryDto.TagBase) => void
}

export const TagCreateDialog = observer(({ onCreate }: TagCreateDialogProps) => {
  const methods = useForm<CategoryDto.TagBase>()
  const createStore = useCreateDialogStore()
  const langBase = useLang()

  useSetDialogValues({
    data: defaultValues,
    defaults: defaultValues,
    shouldHandle: [createStore.open],
    setData: [methods.reset],
    clearData: [methods.reset],
  })

  const handleSubmit = (data: CategoryDto.TagBase) => {
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
          container={<TagForm />}
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
