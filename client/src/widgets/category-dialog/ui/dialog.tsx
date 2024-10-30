import { TagCreateDialog, TagEditDialog } from "features/tag"
import { AltNameCreateDialog } from "features/alt-names"
import { AltNameEditDialog } from "features/alt-names/ui/alt-name-edit-dialog"
import { CharacteristicCreateDialog, CharacteristicEditDialog } from "features/characteristics"
import { CategoryStoreProvider } from "features/categories/dialog/ui/context"
import { CategoryDialog } from "widgets/category-dialog/ui/category-dialog"
import { AltNamesStore } from "entities/alt-name"
import { CharacteristicsStore } from "entities/characteristic/model/characteristics-store"
import { PhotosStore } from "features/categories/dialog/model/photos.store"
import { HistoryStore } from "features/categories/history/model/category-history.store"
import { PhotoPositionStore } from "features/categories/dialog/model/photo-position.store"
import { TagsStore } from "entities/tag"
import { RootDialogProvider } from "shared/context/dialog-context"
import { LangContext } from "shared/context/lang"

export const RootCategoryDialog = () => (
  <LangContext lang="catalog">
    <RootDialogProvider>
      <CategoryStoreProvider
        stores={{
          TagsStore,
          PhotosStore,
          AltNamesStore,
          PhotoPositionStore,
          CharacteristicsStore,
          HistoryStore,
        }}
      >
        <CategoryDialog
          renderTagCreateDialog={(handleCreate) => (
            <TagCreateDialog onCreate={handleCreate} />
          )}
          renderTagEditDialog={(handleEdit) => (
            <TagEditDialog onEdit={handleEdit} />
          )}
          renderAltNameCreateDialog={(handleCreate) => (
            <AltNameCreateDialog onCreate={handleCreate} />
          )}
          renderAltNameEditDialog={(handleEdit) => (
            <AltNameEditDialog onEdit={handleEdit} />
          )}
          renderCharacteristicCreateDialog={(handleCreate) => (
            <CharacteristicCreateDialog onCreate={handleCreate} />
          )}
          renderCharacteristicEditDialog={(handleEdit) => (
            <CharacteristicEditDialog onEdit={handleEdit} />
          )}
        />
      </CategoryStoreProvider>
    </RootDialogProvider>
  </LangContext>
)
