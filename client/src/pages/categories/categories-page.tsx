import { useCategories } from "entities/category/queries/use-categories"
import { observer } from "mobx-react-lite"
import { CategoryHeader } from "pages/categories/ui/header"
import { LangContext, useLang } from "shared/context/lang"
import { BackButton } from "shared/ui/buttons/back-button"
import { Box } from "shared/ui/box"
// import { CreateButton } from "shared/ui/buttons/create-button"
import { RefetchButton } from "shared/ui/buttons/refresh-button"
import { Mark } from "shared/ui/mark"
import { Pagination } from "shared/ui/pagination"
import { Table } from "shared/ui/table"
import { Text } from "shared/ui/text"
import { IconButton } from "shared/ui/buttons/icon-button"
import { eventBus } from "shared/lib/event-bus"
import { openCreateCategoryDialog } from "widgets/category-dialog"
import { CategoryList } from "./ui/category-list"

const CategoriesPage = observer(() => {
  const {
    categories,
    isLoadingCategories,
    refetchCategories,
  } = useCategories()

  const langBase = useLang()

  return (
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
                <IconButton
                  name="add"
                  color="success"
                  fontSize={20}
                  help={{ title: <Text onlyText name="add" /> }}
                  onClick={() => eventBus.emit(openCreateCategoryDialog({}))}
                />
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
  )
})

export default CategoriesPage
