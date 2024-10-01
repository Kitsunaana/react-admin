import { Box } from "shared/ui/box"
import { Table } from "shared/ui/table"
import { CreateButton } from "shared/ui/buttons/create-button"
import { Text } from "shared/ui/text"
import { Mark } from "shared/ui/mark"
import { RootDialogProvider } from "shared/ui/dialog/context/dialog-context"
import { observer } from "mobx-react-lite"
import { CategoryHeader } from "pages/categories/ui/header"
import { EmptyList } from "shared/ui/empty-list"
import { CategoryRow } from "entities/category"
import { Spinner } from "shared/ui/spinner"
import { RefetchButton } from "shared/ui/buttons/refresh-button"
import { Pagination } from "shared/ui/pagination"
import { CategoryDialog } from "features/categories"
import { useTheme } from "@mui/material"
import { BackButton } from "shared/ui/back-button"
import { LangContext, useLang } from "shared/context/lang"
import { useCategories } from "entities/category/queries/use-categories"
import { CategoryDto } from "shared/types/category"
import { Common } from "shared/types/common"

const CategoriesPage = observer(() => {
  const { categories, refetchCategories, isLoadingCategories } = useCategories()

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

    const readLocale = localStorage.getItem("lngAdmin")

    const findCaption = (category: CategoryDto.CategoryPreview): Common.AltName | undefined => (
      category.altNames?.find((altName) => {
        if (altName.locale.code === readLocale) return altName

        return null
      })
    )

    return categories.rows.map((category) => (
      <CategoryRow
        key={category.id}
        images={category?.media}
        {...category}
        caption={findCaption(category)?.caption ?? category.caption}
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
      <CategoryDialog />
    </RootDialogProvider>
  )
})

export default CategoriesPage
