import { DialogEdit } from "shared/ui/dialog/dialog-edit"
import {
  FormProvider, useForm,
} from "react-hook-form"
import * as React from "react"
import { observer } from "mobx-react-lite"
import { CreateEditForm } from "features/characteristics/create-and-edit/ui/create-edit-form"
import { UseCharacteristicsFormProps } from "features/characteristics/create-and-edit/model/types"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { useStores } from "features/categories/create-and-edit/model/context"

export const CharacteristicsDialog = observer(() => {
  const store = useEditDialogStore()
  const { characteristics } = useStores()

  const methods = useForm<UseCharacteristicsFormProps>({
    defaultValues: {
      caption: null,
      unit: null,
      value: "",
      hideClient: true,
    },
  })

  return (
    <FormProvider {...methods}>
      <DialogEdit
        size="auto"
        langBase="characteristics"
        onSave={characteristics.create}
        onEdit={(data) => {
          console.log(data)
          return characteristics.edit(data)
        }}
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
