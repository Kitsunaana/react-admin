import { openCreateCharacteristicDialog } from "entities/characteristic"
import { observer } from "mobx-react-lite"
import { FormProvider, useForm } from "react-hook-form"
import { useCreateDialogStore } from "shared/context/dialog-create-context"
import { LangContext } from "shared/context/lang"
import { useEventBusListen } from "shared/hooks/use-event-bus-listen"
import { useSetDialogValues } from "shared/hooks/use-set-dialog-values"
import { Common } from "shared/types/common"
import { DialogHeader, DialogHeaderCaption } from "shared/ui/dialog/dialog-header"
import { UpsertDialog } from "shared/ui/dialog/upsert-dialog"
import { useKeyboard } from "shared/lib/keyboard-manager"
import { defaultValues } from "../model/const"
import { CharacteristicForm } from "./characteristic-form"

interface CharacteristicEditDialogProps {
  onCreate: (data: Common.CharacteristicCreate) => void
}

export const CharacteristicCreateDialog = observer(({ onCreate }: CharacteristicEditDialogProps) => {
  const createStore = useCreateDialogStore()
  const methods = useForm({ defaultValues })

  useSetDialogValues({
    data: defaultValues,
    defaults: defaultValues,
    shouldHandle: [createStore.open],
    setData: [methods.reset],
    clearData: [methods.reset],
  })

  useEventBusListen(openCreateCharacteristicDialog, createStore.openDialogV2)

  useKeyboard({
    key: "Escape",
    disabled: !createStore.open,
    callback: createStore.closeDialog,
  })

  const handleSubmit = (data: Common.CharacteristicCreate) => {
    onCreate(data)
    createStore.closeDialog()
  }

  return (
    <FormProvider {...methods}>
      <LangContext lang="characteristic.dialog">
        <UpsertDialog
          header={(
            <DialogHeader
              store={createStore}
              title={(
                <DialogHeaderCaption
                  name="title.create"
                />
              )}
            />
          )}
          height="auto"
          size="auto"
          store={createStore}
          handleSubmit={handleSubmit}
          isLoading={false}
          container={<CharacteristicForm />}
          PaperProps={{
            sx: {
              maxWidth: createStore.fullScreen
                ? "95% !important"
                : "840px !important",
              maxHeight: "95%",
            },
          }}
        />
      </LangContext>
    </FormProvider>
  )
})
