import { openEditTagDialog } from "entities/tag/model/event"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useEditDialogStore } from "shared/context/dialog-edit-context"
import { LangContext, useLang } from "shared/context/lang"
import { useSetDialogValues } from "shared/hooks/use-set-dialog-values"
import { eventBus } from "shared/lib/event-bus"
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
  const langBase = useLang()

  useSetDialogValues({
    data: editStore.localData,
    defaults: defaultValues,
    shouldHandle: [editStore.open],
    setData: [methods.reset],
    clearData: [methods.reset],
  })

  useEffect(() => {
    const event = (payload: CategoryDto.TagCreate) => editStore.openDialogV2(payload)

    eventBus.on(openEditTagDialog, ({ payload }) => event(payload))
    return () => eventBus.off(openEditTagDialog, ({ payload }) => event(payload))
  }, [])

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
