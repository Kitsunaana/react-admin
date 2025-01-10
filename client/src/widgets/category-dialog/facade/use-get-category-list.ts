import { useCallback } from "react"
import { useGetGallery } from "shared/lib/gallery"
import { Media } from "entities/category/domain/types"
import { CategoryView, findCaption } from "../domain/category/types"
import { useRemoveCategory } from "../queries/category/use-category-remove"
import { useChangeCategoryOrder } from "../queries/category/use-category-change-order"

export const useCategoryList = (categories: CategoryView[]) => {
  const getRemove = useRemoveCategory()
  const getChangeOrder = useChangeCategoryOrder()
  const getGallery = useGetGallery()

  const handleRemoveStart = useCallback((id: string, caption: string) => getRemove({ id, caption }), [])

  const handleEditStart = useCallback((id: string) => console.log(id), [])

  const handleChangeOrder = useCallback(
    (id: string, order: number) => getChangeOrder.mutate({ id, order }),
    [],
  )

  const handleOpenSlider = useCallback((index: number, photos: Media[]) => getGallery({
    index,
    photos,
  }), [])

  return categories.map((category) => ({
    ...category,
    isLoading: getChangeOrder.isLoading,
    caption: findCaption(category.altNames, category.caption),
    onRemove: handleRemoveStart,
    onEdit: handleEditStart,
    onOpenGallery: handleOpenSlider,
    onChangeOrder: handleChangeOrder,
  }))
}
