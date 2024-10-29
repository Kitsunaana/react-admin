import { useGetConfirmation } from "shared/lib/confirmation"
import { Text } from "shared/ui/text"
import { Mark } from "shared/ui/mark"
import { CategoryDto } from "shared/types/category"
import { RowItem } from "shared/ui/row-item"
import { Box } from "shared/ui/box"
import { useRemoveCategoryMutation } from "./use-remove-category-mutation"

export const useRemoveCategory = () => {
  const langBase = "catalog.confirm.remove"

  const getConfirmation = useGetConfirmation()
  const { onRemove } = useRemoveCategoryMutation()

  return async (category: CategoryDto.CategoryPreview) => {
    const confirmation = await getConfirmation({
      langBase,
      confirmText: "confirm",
      description: (
        <Box flex gap>
          <Text
            langBase={langBase}
            name="description"
            value={String(category.id)}
            translateOptions={{
              components: {
                strong: <Mark />,
              },
            }}
          />
          <RowItem>
            <Text caption={category.caption} />
          </RowItem>
        </Box>
      ),
    })

    if (confirmation) onRemove(category.id)
  }
}
