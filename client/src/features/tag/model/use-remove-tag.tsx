import { useGetConfirmation } from "shared/lib/confirmation"
import { CategoryDto } from "shared/types/category"
import { RowItem } from "shared/ui/row-item"
import { Text } from "shared/ui/text"
import { Tag } from "entities/tag"
import { Box } from "shared/ui/box"
import { Mark } from "shared/ui/mark"

export const useRemoveTag = () => {
  const langBase = "tag.confirm.remove"
  const getConfirmation = useGetConfirmation()

  return async (tag: CategoryDto.TagCreate, handleRemove: (id: number | string) => void) => {
    const confirmation = await getConfirmation({
      langBase,
      confirmText: "confirm",
      description: (
        <Box flex gap>
          <Text
            langBase={langBase}
            name="description"
            value={String(tag.id)}
            translateOptions={{
              components: {
                strong: <Mark />,
              },
            }}
          />
          <RowItem>
            <Tag
              caption={tag.caption}
              color={tag.color}
              icon={tag.icon}
            />
          </RowItem>
        </Box>
      ),
    })

    if (confirmation) handleRemove(tag.id)
  }
}
