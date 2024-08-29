import { DialogEdit } from "shared/ui/dialog/dialog-edit"
import {
  FormProvider, useForm,
} from "react-hook-form"
import * as React from "react"
import { observer } from "mobx-react-lite"
import { CreateEditForm } from "features/characteristics/edit/ui/create-edit-form"
import { UseCharacteristicsFormProps } from "features/characteristics/edit/model/types"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { useStores } from "features/categories/edit/model/context"
import { useLang } from "shared/context/Lang"

export const CharacteristicEditDialog = observer(() => {
  const store = useEditDialogStore()
  const { characteristics } = useStores()

  const langBase = useLang()?.lang ?? ""

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
        height="auto"
        size="auto"
        hideActions
        onSave={characteristics.create}
        onEdit={characteristics.edit}
        container={<CreateEditForm langBase={langBase} />}
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
