import { DialogEdit } from "shared/ui/dialog/dialog-edit"
import { FormProvider, useForm } from "react-hook-form"
import * as React from "react"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { LangContext, useLang } from "shared/context/Lang"
import { AltNamesStore } from "entities/alt-name"
import { CreateEditForm } from "./alt-name-edit-form"

interface AltNameEditDialogProps {
  altNames: AltNamesStore
}

export const AltNameEditDialog = (props: AltNameEditDialogProps) => {
  const { altNames } = props

  const store = useEditDialogStore()
  const langBase = useLang()

  const methods = useForm({
    defaultValues: {
      caption: "",
      description: "",
    },
  })

  return (
    <LangContext lang={`${langBase}.dialog`}>
      <FormProvider {...methods}>
        <DialogEdit
          hideActions
          size="auto"
          height="auto"
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
}
