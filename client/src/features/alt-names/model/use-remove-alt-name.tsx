import { useGetConfirmation } from "shared/lib/confirmation"
import { Common } from "shared/types/common"
import { Text } from "shared/ui/text"
import { RowItem } from "shared/ui/row-item"
import { Mark } from "shared/ui/mark"
import { Box } from "shared/ui/box"

export const useRemoveAltName = () => {
  const langBase = "altNames.confirm.remove"
  const getConfirmation = useGetConfirmation()

  return async (altName: Common.AltNameCreate, remove: (id: number | string) => void) => {
    const confirmation = await getConfirmation({
      langBase,
      confirmText: "confirm",
      description: (
        <Box flex gap>
          <Text
            langBase={langBase}
            name="description"
            value={String(altName.id)}
            translateOptions={{
              components: {
                strong: <Mark />,
              },
            }}
          />
          <RowItem>
            <Text caption={altName.caption} />
            <Mark>{altName.locale.caption}</Mark>
          </RowItem>
        </Box>
      ),
    })

    if (confirmation) remove(altName.id)
  }
}
