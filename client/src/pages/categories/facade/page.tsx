import { observer } from "mobx-react-lite"
import { useCategoryStartCreate, useGetAllCategories } from "widgets/category-dialog"
import { Table } from "shared/ui/table"
import { RefetchButton } from "shared/ui/buttons/refresh-button"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Text } from "shared/ui/text"
import { BackButton } from "shared/ui/buttons/back-button"
import { List } from "../ui/list"
import { Footer } from "../ui/footer"
import { Header } from "../ui/header"

const CategoriesPage = observer(() => {
  const getAllCategories = useGetAllCategories()
  const categoryStartCreate = useCategoryStartCreate()

  return (
    <Table
      header={(
        <Header
          actions={(
            <>
              <RefetchButton onRefetch={getAllCategories.refetch} />
              <IconButton
                name="add"
                color="success"
                fontSize={20}
                onClick={categoryStartCreate}
                help={{
                  title: (
                    <Text
                      onlyText
                      name="add"
                    />
                  ),
                }}
              />
              <BackButton />
            </>
          )}
        />
      )}
      content={(
        <List
          categories={getAllCategories.categories.rows}
          isLoading={getAllCategories.isLoading}
        />
      )}
      bottom={(
        <Footer
          count={getAllCategories.categories.count}
        />
      )}
    />
  )
})

export default CategoriesPage
