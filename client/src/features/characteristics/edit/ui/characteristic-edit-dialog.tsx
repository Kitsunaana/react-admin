import { DialogEdit } from "shared/ui/dialog/dialog-edit"
import {
  FormProvider, useForm,
} from "react-hook-form"
import * as React from "react"
import { observer } from "mobx-react-lite"
import { CreateEditForm } from "features/characteristics/edit/ui/create-edit-form"
import { UseCharacteristicsFormProps } from "features/characteristics/edit/model/types"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { LangContext, useLang } from "shared/context/Lang"
import { CharacteristicsStore } from "entities/characteristic/model/store"

interface CharacteristicEditDialogProps { characteristics: CharacteristicsStore }

export const CharacteristicEditDialog = (props: CharacteristicEditDialogProps) => {
  const { characteristics } = props
  const store = useEditDialogStore()

  const langBase = useLang()

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
      <LangContext lang={`${langBase}.dialog`}>
        <DialogEdit
          height="auto"
          size="auto"
          hideActions
          onSave={characteristics.create}
          onEdit={characteristics.edit}
          container={<CreateEditForm />}
          PaperProps={{
            sx: {
              maxWidth: store.fullScreen ? "95%" : 840,
              maxHeight: "95%",
            },
          }}
        />
      </LangContext>
    </FormProvider>
  )
}
