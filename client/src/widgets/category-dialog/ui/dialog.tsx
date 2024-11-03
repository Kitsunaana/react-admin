import { AltNamesStore } from "entities/alt-name"
import { CharacteristicsStore } from "entities/characteristic/model/characteristics-store"
import { TagsStore } from "entities/tag"
import { AltNameCreateDialog } from "features/alt-names"
import { AltNameEditDialog } from "features/alt-names/ui/alt-name-edit-dialog"
import { PhotoPositionStore } from "features/categories/dialog/model/photo-position.store"
import { PhotosStore } from "features/categories/dialog/model/photos.store"
import { CategoryStoreProvider } from "features/categories/dialog/ui/context"
import { HistoryStore } from "features/categories/history/model/category-history.store"
import { CharacteristicCreateDialog, CharacteristicEditDialog } from "features/characteristics"
import { TagCreateDialog, TagEditDialog } from "features/tag"
import { LangContext } from "shared/context/lang"
import { CategoryDialog } from "widgets/category-dialog/ui/category-dialog"

export const RootCategoryDialog = () => (
  <LangContext lang="catalog">
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
  </LangContext>
)
