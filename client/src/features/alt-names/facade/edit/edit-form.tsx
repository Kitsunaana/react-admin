import { useKeyboard } from "shared/lib/keyboard-manager"
import { ctrlKey } from "shared/lib/keyboard-manager/middleware"
import { FormProvider } from "react-hook-form"
import { useGetAllLocales } from "entities/alt-name"
import { altNameEditStore } from "../../model/alt-name-edit-store"
import { useAltNameForm } from "../../view-model/use-alt-name-form"
import { RootForm } from "../../ui/root-form"
import { DefaultFields } from "../../ui/default-fields"

export const AltNameEditForm = ({ formId }: { formId: string }) => {
  const editForm = useAltNameForm({
    defaultFields: altNameEditStore.altName,
    onSubmit: (data) => {
      altNameEditStore.submitEdit({
        ...altNameEditStore.altName!,
        ...data,
      })
    },
  })

  const locales = useGetAllLocales()

  useKeyboard({
    key: "Enter",
    callback: ctrlKey(editForm.handleKeyDownSubmit),
  })

  return (
    <FormProvider {...editForm.form}>
      <RootForm id={formId} onSubmit={editForm.handleFormSubmit}>
        <DefaultFields
          locales={altNameEditStore.exclude(locales.data)}
          defaultValue={editForm.defaultValue}
        />

      </RootForm>
    </FormProvider>
  )
}
