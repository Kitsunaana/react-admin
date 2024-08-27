import { DialogEdit } from "shared/ui/dialog/dialog-edit"
import {
  FormProvider, useForm,
} from "react-hook-form"
import * as React from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "features/categories/create-and-edit/ui/dialog"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { LangContext } from "shared/context/Lang"
import { CreateEditForm } from "./alt-name-edit-form"

export const AltNameEditDialog = observer(() => {
  const store = useEditDialogStore()
  const { altNames } = useStores()

  const methods = useForm({
    defaultValues: {
      lang: null,
      caption: "",
      description: "",
    },
  })

  return (
    <LangContext lang="global.dialog">
      <FormProvider {...methods}>
        <DialogEdit
          size="auto"
          langBase="altNames"
          onSave={altNames.create}
          onEdit={altNames.edit}
          container={<CreateEditForm />}
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
})
