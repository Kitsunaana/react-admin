import { observer } from "mobx-react-lite"
import { CategoryHeader } from "pages/categories/ui/header"
import { LangContext, useLang } from "shared/context/lang"
import { BackButton } from "shared/ui/buttons/back-button"
import { Box } from "shared/ui/box"
import { RefetchButton } from "shared/ui/buttons/refresh-button"
import { Mark } from "shared/ui/mark"
import { Pagination } from "shared/ui/pagination"
import { Table } from "shared/ui/table"
import { Text } from "shared/ui/text"
import { IconButton } from "shared/ui/buttons/icon-button"
import { useGetAllCategories } from "entities/category"
import { createRoute, eventBus } from "shared/lib/event-bus"
import { CategoryList } from "./ui/category-list"

const openCategoryModalEvent = createRoute("category.create.open")
  .withParams()

const CategoriesPage = observer(() => {
  const {
    categories,
    isLoading,
    refetch,
  } = useGetAllCategories()

  const langBase = useLang()

  const startCreateCategory = () => eventBus.emit(openCategoryModalEvent({}))

  return (
    <Table
      content={(
        <LangContext lang={`${langBase}.rows`}>
          <CategoryList
            categories={categories?.rows ?? []}
            isLoading={isLoading}
          />
        </LangContext>
      )}
      header={(
        <LangContext lang={`${langBase}.top`}>
          <CategoryHeader
            actions={(
              <>
                <RefetchButton onRefetch={refetch} />
                <IconButton
                  name="add"
                  color="success"
                  fontSize={20}
                  onClick={startCreateCategory}
                  help={{ title: <Text onlyText name="add" /> }}
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
