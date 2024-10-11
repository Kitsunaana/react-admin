import { observer } from "mobx-react-lite"
import { ReactNode } from "react"
import { RootDialogProvider } from "shared/context/dialog-context"
import { CategoryDto } from "shared/types/category"
import { Common } from "shared/types/common"
import { useCategoryStores } from "../model/context"
import { CategoryEditDialog } from "./category-edit-dialog"
import { CategoryCreateDialog } from "./category-create-dialog"

interface CategoryDialogProps {
  renderTagCreateDialog?: (handleCreate: (payload: CategoryDto.TagBase) => void) => ReactNode
  renderTagEditDialog?: (handleEdot: (payload: CategoryDto.TagCreate) => void) => ReactNode
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

  return (
    <>
      <CategoryEditDialog />
      <CategoryCreateDialog />

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
