import { FormProvider } from "react-hook-form"
import { useKeyboard } from "shared/lib/keyboard-manager"
import { ctrlKey } from "shared/lib/keyboard-manager/handlers"
import { useGetAllTags } from "entities/tag"
import { tagCreateStore } from "../../model/tag-create-store"
import { DefaultFields } from "../../ui/default-fields"
import { RootForm } from "../../ui/root-form"
import { useTagForm } from "../../view-model/use-tag-form"
import { TagView } from "../../ui/tag-view"

export const TagCreateForm = ({ formId }: { formId: string }) => {
  const tags = useGetAllTags()

  const createForm = useTagForm({
    onSubmit: tagCreateStore.submitCreate,
  })

  useKeyboard({
    key: "Enter",
    callback: ctrlKey(createForm.handleKeyDownSubmit),
  })

  return (
    <FormProvider {...createForm.form}>
      <TagView defaultValue={createForm.defaultValue} />
      <RootForm id={formId} onSubmit={createForm.handleFormSubmit}>
        <DefaultFields
          tags={tags.data}
          isLoading={tags.isLoading}
          defaultValue={createForm.defaultValue}
        />
      </RootForm>
    </FormProvider>
  )
}
