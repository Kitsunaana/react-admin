import { Box, BoxProps } from "shared/ui/box"
import { observer } from "mobx-react-lite"
import { Vertical } from "shared/ui/divider"
import styled from "styled-components"
import { EmptyList } from "shared/ui/empty-list"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { IconButton } from "shared/ui/buttons/icon-button"
import { 
  CharacteristicEditDialog,
  CharacteristicCreateDialog,
  useRemoveCharacteristic
} from "features/characteristics"
import { Text } from "shared/ui/text"
import { Characteristic } from "entities/characteristic"
import { useCreateDialogStore } from "shared/ui/dialog/context/dialog-create-context"
import { Common } from "shared/types/common"
import { useStores } from "../../model/context"

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
  const { characteristics } = useStores()
  const { fullScreen } = useEditDialogStore()

  const handleRemove = useRemoveCharacteristic(characteristics.remove)
  const createStore = useCreateDialogStore()
  const editStore = useEditDialogStore()

  return (
    <>
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
                onEdit={editStore.openDialog}
                getConflict={characteristics.getConflict}
                isRecordCreatedOrUpdated={characteristics.isRecordCreatedOrUpdated}
              />
            ))}
          </CharacteristicsContainer>
        ) : <EmptyList />}
        <Vertical />
        <Box sx={{ pt: 1 }}>
          <IconButton
            name="add"
            onClick={() => createStore.openDialog(null)}
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

      <CharacteristicEditDialog onEdit={characteristics.edit} />
      <CharacteristicCreateDialog onCreate={characteristics.create} />
    </>
  )
})
