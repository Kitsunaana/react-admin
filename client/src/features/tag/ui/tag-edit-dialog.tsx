import { openEditTagDialog } from "entities/tag/model/event"
import { observer } from "mobx-react-lite"
import { FormProvider, useForm } from "react-hook-form"
import { useEditDialogStore } from "shared/context/dialog-edit-context"
import { LangContext } from "shared/context/lang"
import { useEventBusListen } from "shared/hooks/use-event-bus-listen"
import { useSetDialogValues } from "shared/hooks/use-set-dialog-values"
import { CategoryDto } from "shared/types/category"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { UpsertDialog } from "shared/ui/dialog/upsert-dialog"
import { defaultValues } from "../model/const"
import { TagForm } from "./tag-form"

interface TagEditDialogProps {
  onEdit: (data: CategoryDto.TagCreate) => void
}

export const TagEditDialog = observer(({ onEdit }: TagEditDialogProps) => {
  const methods = useForm<CategoryDto.TagBase>()
  const editStore = useEditDialogStore()

  useSetDialogValues({
    data: editStore.localData as CategoryDto.TagCreate,
    defaults: defaultValues,
    shouldHandle: [editStore.open],
    setData: [methods.reset],
    clearData: [methods.reset],
  })

  useEventBusListen(openEditTagDialog, ({ payload }) => editStore.openDialogV2(payload))

  const handleSubmit = (payload: CategoryDto.TagCreate) => {
    onEdit(payload)
    editStore.closeDialog()
  }

  return (
    <FormProvider {...methods}>
      <LangContext lang="tag.dialog">
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
