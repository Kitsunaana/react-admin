import { useTheme } from "@mui/material"
import { Box } from "shared/ui/box"
import { Spinner } from "shared/ui/spinner"
import { EmptyList } from "shared/ui/empty-list"
import { CategoryRow } from "entities/category"
import { CategoryDto } from "shared/types/category"
import { eventBus } from "shared/lib/event-bus"
import { useRemoveCategory } from "features/categories/dialog/queries/use-remove-category"
import { useUpdatePosition } from "features/categories/dialog/queries/use-update-position-category"
import { openEditCategoryDialog, openGallery } from "features/categories/dialog/domain/event"
import { findCaption } from "../lib/find-caption"

interface CategoryListProps {
  categories: CategoryDto.CategoryPreview[]
  isLoading: boolean
}

export const CategoryList = (props: CategoryListProps) => {
  const { categories, isLoading } = props

  const { palette } = useTheme()
  const onRemoveCategory = useRemoveCategory()
  const { onUpdatePosition, isLoadingUpdate } = useUpdatePosition()

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
      {
        categories.map((category) => (
          <CategoryRow
            key={category.id}
            id={category.id}
            caption={findCaption(category.altNames, category.caption)}
            images={category?.media}
            order={category.order}
            isLoading={isLoadingUpdate}
            onOpenEditDialog={(id: number) => eventBus.emit(openEditCategoryDialog({ id }))}
            onOpenGallery={(data) => eventBus.emit(openGallery(data))}
            onRemoveCategory={() => onRemoveCategory(category)}
            onUpdatePosition={onUpdatePosition}
          />
        ))
      }
    </>
  )
}
