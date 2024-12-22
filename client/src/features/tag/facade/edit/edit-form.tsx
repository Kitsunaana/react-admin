import { FormProvider } from "react-hook-form"
import { useKeyboard } from "shared/lib/keyboard-manager"
import { ctrlKey } from "shared/lib/keyboard-manager/middleware"
import { useGetAllTags } from "entities/tag"
import { tagEditStore } from "../../model/tag-edit-store"
import { DefaultFields } from "../../ui/default-fields"
import { RootForm } from "../../ui/root-form"
import { useTagForm } from "../../view-model/use-tag-form"
import { TagView } from "../../ui/tag-view"

export const TagEditForm = ({ formId }: { formId: string }) => {
  const tags = useGetAllTags()

  const editForm = useTagForm({
    defaultFields: tagEditStore.tag,
    onSubmit: (data) => {
      tagEditStore.submitEdit({
        ...tagEditStore.tag!,
        ...data,
      })
    },
  })

  useKeyboard({
    key: "Enter",
    callback: ctrlKey(editForm.handleKeyDownSubmit),
  })

  return (
    <FormProvider {...editForm.form}>
      <TagView defaultValue={tagEditStore.tag!} />
      <RootForm id={formId} onSubmit={editForm.handleFormSubmit}>
        <DefaultFields
          tags={tags.data}
          isLoading={tags.isLoading}
          defaultValue={editForm.defaultValue}
        />
      </RootForm>
    </FormProvider>
  )
}
