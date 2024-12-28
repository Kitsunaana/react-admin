import { useTheme } from "@mui/material"
import { Box } from "shared/ui/box"
import { Spinner } from "shared/ui/spinner"
import { EmptyList } from "shared/ui/empty-list"
import { CategoryRow, openEditCategoryDialog } from "entities/category"
import { eventBus } from "shared/lib/event-bus"
import { openGallery } from "shared/events/open-gallery"
import { CategoryView } from "shared/types/new_types/types"
import { useRemoveCategory } from "widgets/category-dialog/queries/use-remove"
import { useChangeCategoryOrder } from "widgets/category-dialog/queries/use-change-order"
import { findCaption } from "../lib/find-caption"

interface CategoryListProps {
  categories: CategoryView[]
  isLoading: boolean
}

export const CategoryList = (props: CategoryListProps) => {
  const { categories, isLoading } = props

  const { palette } = useTheme()
  const onRemoveCategory = useRemoveCategory()
  const mutateChangeOrder = useChangeCategoryOrder()

  const categoriesIsEmpty = categories.length === 0
  const isShowEmptyList = categoriesIsEmpty && !isLoading

  if (isLoading) {
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

  return (
    <>
      {categories.map((category) => (
        <CategoryRow
          key={category.id}
          id={category.id}
          caption={findCaption(category.altNames, category.caption)}
          images={category?.media}
          order={category.order}
          isLoading={mutateChangeOrder.isLoading}
          onOpenEditDialog={(id: string) => eventBus.emit(openEditCategoryDialog({ id }))}
          onOpenGallery={(data) => eventBus.emit(openGallery(data))}
          onRemoveCategory={() => onRemoveCategory(category)}
          onChangeOrder={mutateChangeOrder.onChangeOrder}
        />
      ))}
    </>
  )
}
