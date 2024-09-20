import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { FormProvider, useForm } from "react-hook-form"
import { DialogEdit } from "shared/ui/dialog/dialog-edit"
import React from "react"
import { LangContext } from "shared/context/Lang"
import { TagsStore } from "entities/tag"
import { TagEditForm } from "./tag-edit-form"

export const TagEditDialog = ({ tags }: { tags: TagsStore }) => {
  const store = useEditDialogStore()

  const methods = useForm({
    defaultValues: {
      tag: { caption: null },
      icon: null,
      tagColor: "rgb(255, 183, 77)",
    },
  })

  return (
    <LangContext lang="tag.dialog">
      <FormProvider {...methods}>
        <DialogEdit
          hideActions
          height="auto"
          size="auto"
          langBase="tags"
          onSave={tags.create}
          onEdit={tags.edit}
          container={<TagEditForm />}
          PaperProps={{
            sx: {
              maxWidth: store.fullScreen ? "95%" : 840,
              maxHeight: "95%",
            },
          }}
        />
      </FormProvider>
    </LangContext>
  )
}
