import { openCreateTagDialog } from "entities/tag"
import { observer } from "mobx-react-lite"
import { FormProvider, useForm } from "react-hook-form"
import { useCreateDialogStore } from "shared/context/dialog-create-context"
import { LangContext } from "shared/context/lang"
import { useEventBusListen } from "shared/hooks/use-event-bus-listen"
import { useSetDialogValues } from "shared/hooks/use-set-dialog-values"
import { CategoryDto } from "shared/types/category"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { UpsertDialog } from "shared/ui/dialog/upsert-dialog"
import { defaultValues } from "../model/const"
import { TagForm } from "./tag-form"

interface TagCreateDialogProps {
  onCreate: (data: CategoryDto.TagBase) => void
}

export const TagCreateDialog = observer(({ onCreate }: TagCreateDialogProps) => {
  const methods = useForm<CategoryDto.TagBase>()
  const createStore = useCreateDialogStore()

  useSetDialogValues({
    data: defaultValues,
    defaults: defaultValues,
    shouldHandle: [createStore.open],
    setData: [methods.reset],
    clearData: [methods.reset],
  })

  useEventBusListen(openCreateTagDialog, () => createStore.openDialogV2())

  const handleSubmit = (data: CategoryDto.TagBase) => {
    onCreate(data)
    createStore.closeDialog()
  }

  return (
    <FormProvider {...methods}>
      <LangContext lang="tag.dialog">
        <UpsertDialog
          header={(
            <DialogHeader
              store={createStore}
              title={(
                <DialogHeaderCaption
                  name="title.create"
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
