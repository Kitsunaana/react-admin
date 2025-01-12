import { useGetAllCategories } from "widgets/category-dialog"
import { Table } from "shared/ui/table"
import { useMemo } from "react"
import { List } from "../ui/list"
import { Footer } from "../ui/footer"
import { Header } from "../ui/header/root"

const CategoriesPage = () => {
  const getAllCategories = useGetAllCategories()

  const headerDeps = [getAllCategories.refetch]
  const contentDeps = [getAllCategories.categories.rows, getAllCategories.isLoading]
  const bottomDeps = [getAllCategories.categories.count]

  return (
    <Table
      header={useMemo(() => <Header onRefetch={getAllCategories.refetch} />, headerDeps)}
      bottom={useMemo(() => <Footer count={getAllCategories.categories.count} />, bottomDeps)}
      content={useMemo(() => (
        <List
          categories={getAllCategories.categories.rows}
          isLoading={getAllCategories.isLoading}
        />
      ), contentDeps)}
    />
  )
}

export default CategoriesPage
