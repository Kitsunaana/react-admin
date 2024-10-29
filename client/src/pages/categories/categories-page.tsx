import { useCategories } from "entities/category/queries/use-categories"
import { AltNameCreateDialog } from "features/alt-names"
import { AltNameEditDialog } from "features/alt-names/ui/alt-name-edit-dialog"
import { CategoryDialog } from "features/categories"
import { CategoryStoreProvider } from "features/categories/@dialog/ui/context"
import { CharacteristicCreateDialog, CharacteristicEditDialog } from "features/characteristics"
import { TagCreateDialog, TagEditDialog } from "features/tag"
import { observer } from "mobx-react-lite"
import { CategoryHeader } from "pages/categories/ui/header"
import { RootDialogProvider } from "shared/context/dialog-context"
import { LangContext, useLang } from "shared/context/lang"
import { BackButton } from "shared/ui/buttons/back-button"
import { Box } from "shared/ui/box"
import { CreateButton } from "shared/ui/buttons/create-button"
import { RefetchButton } from "shared/ui/buttons/refresh-button"
import { Mark } from "shared/ui/mark"
import { Pagination } from "shared/ui/pagination"
import { Table } from "shared/ui/table"
import { Text } from "shared/ui/text"
import { CategoryList } from "pages/categories/ui/category-list"

const CategoriesPage = observer(() => {
  const {
    categories,
    isLoadingCategories,
    refetchCategories,
  } = useCategories()

  const langBase = useLang()

  return (
    <RootDialogProvider>
      <Table
        content={(
          <LangContext lang={`${langBase}.rows`}>
            <CategoryList
              categories={categories?.rows ?? []}
              isLoading={isLoadingCategories}
            />
          </LangContext>
        )}
        header={(
          <LangContext lang={`${langBase}.top`}>
            <CategoryHeader
              actions={(
                <>
                  <RefetchButton onRefetch={refetchCategories} />
                  <CreateButton />
                  <BackButton />
                </>
              )}
            />
          </LangContext>
        )}
        bottom={(
          <LangContext lang={`${langBase}.bottom`}>
            <Box flex ai row gap sx={{ mr: 0, ml: "auto" }}>
              <Text
                name="count"
                value={`${categories?.count ?? 0}`}
                translateOptions={{
                  components: {
                    strong: <Mark />,
                  },
                }}
              />
              <Pagination count={categories?.rows.length ?? 0} />
            </Box>
          </LangContext>
        )}
      />

    </RootDialogProvider>
  )
})

export default CategoriesPage
