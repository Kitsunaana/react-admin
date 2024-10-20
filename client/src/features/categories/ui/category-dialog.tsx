import { observer } from "mobx-react-lite"
import { ReactNode } from "react"
import { RootDialogProvider } from "shared/context/dialog-context"
import { LangContext, useLang } from "shared/context/lang"
import { CategoryDto } from "shared/types/category"
import { Common } from "shared/types/common"
import { useCategoryStores } from "../model/context"
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

  const { tags, altNames, characteristics } = useCategoryStores()

  const langBase = useLang()

  return (
    <>
      <LangContext lang={`${langBase}.dialog`}>
        <CategoryEditDialog />
        <CategoryCreateDialog />
      </LangContext>

      <RootDialogProvider>
        {renderTagCreateDialog?.(tags.create)}
        {renderTagEditDialog?.(tags.edit)}
      </RootDialogProvider>

      <RootDialogProvider>
        {renderAltNameCreateDialog?.(altNames.create)}
        {renderAltNameEditDialog?.(altNames.edit)}
      </RootDialogProvider>

      <RootDialogProvider>
        {renderCharacteristicCreateDialog?.(characteristics.create)}
        {renderCharacteristicEditDialog?.(characteristics.edit)}
      </RootDialogProvider>
    </>
  )
})
