import { DialogEdit } from "shared/ui/dialog/dialog-edit"
import {
  FormProvider, useForm,
} from "react-hook-form"
import * as React from "react"
import { observer } from "mobx-react-lite"
import { useStores } from "features/categories/create-and-edit/ui/dialog"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { CreateEditForm } from "features/alt-names/create-edit-form"

export const AltNameDialog = observer(() => {
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
    <FormProvider {...methods}>
      <DialogEdit
        size="auto"
        langBase="altNames"
        onSave={() => {}}
        onEdit={() => {}}
        container={<CreateEditForm />}
        PaperProps={{
          sx: {
            maxWidth: store.fullScreen ? "95%" : 840,
            maxHeight: "95%",
          },
        }}
      />
    </FormProvider>
  )
})
