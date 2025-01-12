import { EmptyList } from "shared/ui/empty-list"
import { CategoryRow } from "entities/category"
import { memo } from "react"
import { CategoryView, useCategoryList } from "widgets/category-dialog"
import { LangContext, useLang } from "shared/context/lang"
import { Loader } from "../loader"

export const List = memo(({
  categories,
  isLoading,
}: {
  categories: CategoryView[]
  isLoading: boolean
}) => {
  const langBase = useLang("rows")

  const list = useCategoryList(categories)

  if (isLoading) return <Loader />
  if (!isLoading && !categories.length) return <EmptyList />

  return (
    <LangContext lang={langBase}>
      {list.map((category) => <CategoryRow key={category.id} {...category} />)}
    </LangContext>
  )
})
