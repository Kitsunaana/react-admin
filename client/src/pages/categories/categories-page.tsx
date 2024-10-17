import { useTheme } from "@mui/material"
import { CategoryRow } from "entities/category"
import { useCategories } from "entities/category/queries/use-categories"
import { AltNameCreateDialog } from "features/alt-names"
import { AltNameEditDialog } from "features/alt-names/ui/alt-name-edit-dialog"
import { CategoryDialog } from "features/categories"
import { StoreProvider } from "features/categories/model/context"
import { useRemoveCategory } from "features/categories/queries/use-remove-category"
import { CharacteristicCreateDialog, CharacteristicEditDialog } from "features/characteristics"
import { TagCreateDialog, TagEditDialog } from "features/tag"
import { observer } from "mobx-react-lite"
import { CategoryHeader } from "pages/categories/ui/header"
import { RootDialogProvider } from "shared/context/dialog-context"
import { LangContext, useLang } from "shared/context/lang"
import { Common } from "shared/types/common"
import { BackButton } from "shared/ui/back-button"
import { Box } from "shared/ui/box"
import { CreateButton } from "shared/ui/buttons/create-button"
import { RefetchButton } from "shared/ui/buttons/refresh-button"
import { EmptyList } from "shared/ui/empty-list"
import { Mark } from "shared/ui/mark"
import { Pagination } from "shared/ui/pagination"
import { Spinner } from "shared/ui/spinner"
import { Table } from "shared/ui/table"
import { Text } from "shared/ui/text"

export const findCaption = (altNames: Common.AltName[], defaultValue: string = ""): string => {
  const readLocale = localStorage.getItem("lngAdmin")

  const altName = altNames?.find((altName) => altName.locale.code === readLocale)
  console.log(readLocale)

  return altName?.caption ?? defaultValue
}

const CategoriesPage = observer(() => {
  const { categories, refetchCategories, isLoadingCategories } = useCategories()
  const onRemoveCategory = useRemoveCategory()

  const { palette } = useTheme()
  const langBase = useLang()

  const renderContent = () => {
    const categoriesIsEmpty = categories?.rows.length === 0

    const isShowEmptyList = categoriesIsEmpty && !isLoadingCategories

    if (isLoadingCategories) {
      return (
        <Box flex ai jc sx={{ height: 1 }}>
          <Spinner
            color={palette.warning.dark}
            height={100}
            width={100}
          />
        </Box>
      )
    }
    if (isShowEmptyList) return <EmptyList />
    if (!categories) return null

    return categories.rows.map((category) => (
      <CategoryRow
        key={category.id}
        id={category.id}
        caption={findCaption(category.altNames, category.caption)}
        images={category?.media}
        order={category.order}
        onRemoveCategory={onRemoveCategory}
      />
    ))
  }

  return (
    <RootDialogProvider>
      <Table
        content={(
          <LangContext lang={`${langBase}.rows`}>
            {renderContent()}
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
              <Pagination count={categories?.count} />
            </Box>
          </LangContext>
        )}
      />

      <StoreProvider>
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
      </StoreProvider>

    </RootDialogProvider>
  )
})

export default CategoriesPage
