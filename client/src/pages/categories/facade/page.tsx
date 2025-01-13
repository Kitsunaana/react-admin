import { useGetAllCategories } from "widgets/category-dialog"
import { Table } from "shared/ui/table"
import { useMemo } from "react"
import { observer } from "mobx-react-lite"
import { Header } from "../ui/header/root"
import { Footer } from "../ui/footer"
import { List } from "../ui/list"

const CategoriesPage = observer(() => {
  const getAllCategories = useGetAllCategories()

  const headerDeps = [getAllCategories.refetch]
  const bottomDeps = [getAllCategories.categories.count]

  return (
    <Table
      header={useMemo(() => <Header onRefetch={getAllCategories.refetch} />, headerDeps)}
      bottom={useMemo(() => <Footer count={getAllCategories.categories.count} />, bottomDeps)}
      content={(
        <List
          categories={getAllCategories.categories.rows}
          isLoading={getAllCategories.isLoading}
        />
      )}
    />
  )
})

export default CategoriesPage
