import { observer } from "mobx-react-lite"
import { ReactNode } from "react"
import { RootDialogProvider } from "shared/context/dialog-context"
import { LangContext, useLang } from "shared/context/lang"
import { CategoryDto } from "shared/types/category"
import { Common } from "shared/types/common"
import { nanoid } from "nanoid"
import { useCategoryStores } from "../context"
import { CategoryCreateDialog } from "./category-create-dialog"
import { CategoryEditDialog } from "./category-edit-dialog"

interface CategoryDialogProps {
  renderTagCreateDialog?: (handleCreate: (payload: CategoryDto.TagBase) => void) => ReactNode
  renderTagEditDialog?: (handleEdit: (payload: CategoryDto.TagCreate) => void) => ReactNode
  renderAltNameCreateDialog?: (handleCreate: (payload: Common.AltNameBase) => void) => ReactNode
  renderAltNameEditDialog?: (handleEdit: (payload: Common.AltNameCreate) => void) => ReactNode
  renderCharacteristicCreateDialog?: (handleCreate: (payload: Common.CharacteristicBase) => void) => ReactNode
  renderCharacteristicEditDialog?: (handleEdit: (payload: Common.CharacteristicCreate) => void) => ReactNode
}

export const CategoryDialog = observer((props: CategoryDialogProps) => {
  const {
    renderTagCreateDialog,
    renderTagEditDialog,
    renderAltNameCreateDialog,
    renderAltNameEditDialog,
    renderCharacteristicCreateDialog,
    renderCharacteristicEditDialog,
  } = props

  const {
    tags,
    altNames,
    characteristics,
    historyStore,
  } = useCategoryStores()

  const langBase = useLang()

  return (
    <>
      <LangContext lang={`${langBase}.dialog`}>
        <CategoryEditDialog />
        <CategoryCreateDialog />
      </LangContext>

      <RootDialogProvider>
        {renderTagCreateDialog?.((payload) => {
          const newPayload = { ...payload, id: nanoid() }
          tags.create(newPayload)

          historyStore.recordEvent({
            id: nanoid(),
            tab: 5,
            type: "addTag",
            value: newPayload,
          })
        })}
        {renderTagEditDialog?.((payload) => {
          tags.edit(payload)

          historyStore.recordEvent({
            id: nanoid(),
            tab: 5,
            type: "updateTag",
            value: payload,
          })
        })}
      </RootDialogProvider>

      <RootDialogProvider>
        {renderAltNameCreateDialog?.((payload) => {
          const newPayload = { ...payload, id: nanoid() }
          altNames.create(newPayload)

          historyStore.recordEvent({
            id: nanoid(),
            tab: 4,
            type: "addAltName",
            value: newPayload,
          })
        })}
        {renderAltNameEditDialog?.((payload) => {
          altNames.edit(payload)

          historyStore.recordEvent({
            id: nanoid(),
            tab: 4,
            type: "updateAltName",
            value: payload,
          })
        })}
      </RootDialogProvider>

      <RootDialogProvider>
        {renderCharacteristicCreateDialog?.((payload) => {
          const newPayload = { ...payload, id: nanoid() }
          characteristics.create(newPayload)

          historyStore.recordEvent({
            id: nanoid(),
            tab: 3,
            type: "addCharacteristic",
            value: newPayload,
          })
        })}
        {renderCharacteristicEditDialog?.((payload) => {
          characteristics.edit(payload)

          historyStore.recordEvent({
            id: nanoid(),
            tab: 3,
            type: "updateCharacteristic",
            value: payload,
          })
        })}
      </RootDialogProvider>
    </>
  )
})
