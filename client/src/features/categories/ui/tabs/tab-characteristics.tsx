import {
  Characteristic,
  openCreateCharacteristicDialog,
  openEditCharacteristicDialog,
} from "entities/characteristic"
import {
  useRemoveCharacteristic,
} from "features/characteristics"
import { observer } from "mobx-react-lite"
import { useEditDialogStore } from "shared/context/dialog-edit-context"
import { eventBus } from "shared/lib/event-bus"
import { Common } from "shared/types/common"
import { Box, BoxProps } from "shared/ui/box"
import { IconButton } from "shared/ui/buttons/icon-button"
import { Vertical } from "shared/ui/divider"
import { EmptyList } from "shared/ui/empty-list"
import { Text } from "shared/ui/text"
import styled from "styled-components"
import { useCategoryStores } from "../../model/context"

const CharacteristicsContainer = styled((props: BoxProps & { fullScreen: boolean }) => {
  const { fullScreen, ...other } = props
  return <Box {...other} />
})`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 8px;
  overflow: auto;
  height: ${({ fullScreen }) => (fullScreen ? "calc(100% - 60px)" : "432px")};
`

export const TabCharacteristics = observer(() => {
  const { characteristics } = useCategoryStores()
  const { fullScreen } = useEditDialogStore()

  const handleRemove = useRemoveCharacteristic(characteristics.remove)

  return (
    <Box flex row grow sx={{ height: 1 }}>
      {characteristics.filteredItems.length > 0 ? (
        <CharacteristicsContainer fullScreen={fullScreen}>
          {characteristics.filteredItems.map((item: Common.CharacteristicCreate) => (
            <Characteristic
              id={item.id}
              key={item.id}
              value={item.value}
              unit={item.unit}
              hideClient={item.hideClient}
              caption={item.caption}
              onRemove={handleRemove}
              onEdit={(payload) => eventBus.emit(openEditCharacteristicDialog(payload))}
              getConflict={characteristics.getConflict}
              isCreatedOrUpdated={characteristics.isCreatedOrUpdated(item.id)}
            />
          ))}
        </CharacteristicsContainer>
      ) : <EmptyList />}
      <Vertical />
      <Box sx={{ pt: 1 }}>
        <IconButton
          name="add"
          onClick={() => eventBus.emit(openCreateCharacteristicDialog({}))}
          help={{
            title: (
              <Text
                onlyText
                name="actions.add"
              />
            ),
          }}
        />
      </Box>
    </Box>
  )
})
