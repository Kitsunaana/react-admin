import { openCreateTagDialog } from "entities/tag"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useCreateDialogStore } from "shared/context/dialog-create-context"
import { LangContext, useLang } from "shared/context/lang"
import { useSetDialogValues } from "shared/hooks/use-set-dialog-values"
import { eventBus } from "shared/lib/event-bus"
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

  useEffect(() => {
    const event = () => createStore.openDialogV2()

    eventBus.on(openCreateTagDialog, event)
    return () => eventBus.off(openCreateTagDialog, event)
  }, [])

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
