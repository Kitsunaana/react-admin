import { useKeyboard } from "shared/lib/keyboard-manager"
import { ctrlKey } from "shared/lib/keyboard-manager/handlers"
import { FormProvider } from "react-hook-form"
import { useGetAllLocales } from "entities/alt-name"
import { altNameCreateStore } from "../../model/alt-name-create-store"
import { useAltNameForm } from "../../view-model/use-alt-name-form"
import { RootForm } from "../../ui/root-form"
import { DefaultFields } from "../../ui/default-fields"

export const CreateAltNameForm = ({ formId }: { formId: string }) => {
  const createForm = useAltNameForm({ onSubmit: altNameCreateStore.submitCreate })

  const locales = useGetAllLocales()

  useKeyboard({
    key: "Enter",
    callback: ctrlKey(() => createForm.handleKeyDownSubmit()),
  })

  return (
    <FormProvider {...createForm.form}>
      <RootForm id={formId} onSubmit={createForm.handleFormSubmit}>
        <DefaultFields
          locales={altNameCreateStore.exclude(locales.data)}
          defaultValue={createForm.defaultValue}
        />
      </RootForm>
    </FormProvider>
  )
}
