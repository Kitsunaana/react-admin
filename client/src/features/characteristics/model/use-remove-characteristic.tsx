import { useGetConfirmation } from "shared/lib/confirmation"
import { Common } from "shared/types/common"
import { Box } from "shared/ui/box"
import { Mark } from "shared/ui/mark"
import { RowItem } from "shared/ui/row-item"
import { Text } from "shared/ui/text"

export const useRemoveCharacteristic = (langBaseProps: string) => {
  const getConfirmation = useGetConfirmation()

  return async (characteristic: Common.CharacteristicCreate, handleRemove: (id: number | string) => void) => {
    const langBase = `${langBaseProps}.confirm.remove`

    const confirmation = await getConfirmation({
      langBase,
      confirmText: "confirm",
      description: (
        <>
          <Text
            langBase={langBase}
            name="description"
            value={String(characteristic.id)}
            translateOptions={{
              components: {
                strong: <Mark />,
              },
            }}
          />
          <RowItem sx={{ mt: 1 }}>
            <Box flex gap ai row>
              <>
                {characteristic.hideClient}
                {characteristic.caption}
                <Mark>{characteristic.value}</Mark>
                {characteristic.unit}
              </>
            </Box>
          </RowItem>
        </>
      ),
    })

    if (confirmation) handleRemove(characteristic.id)
  }
}
