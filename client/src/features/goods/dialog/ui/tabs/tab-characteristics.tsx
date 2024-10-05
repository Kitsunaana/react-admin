import { Box, BoxProps } from "shared/ui/box"
import { observer } from "mobx-react-lite"
import { Vertical } from "shared/ui/divider"
import styled from "styled-components"
import { EmptyList } from "shared/ui/empty-list"
import { useEditDialogStore } from "shared/ui/dialog/context/dialog-edit-context"
import { IconButton } from "shared/ui/buttons/icon-button"
import { CharacteristicEditDialog } from "features/characteristics"
import { Text } from "shared/ui/text"
import { Characteristic } from "entities/characteristic"
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
  const editStore = useEditDialogStore()

  const { characteristics } = useStores()
  const { fullScreen } = useEditDialogStore()

  return (
    <Box flex row grow sx={{ height: 1 }}>
      {characteristics.filteredItems.length > 0 ? (
        <CharacteristicsContainer fullScreen={fullScreen}>
          {characteristics.filteredItems.map((characteristic) => (
            <Characteristic
              key={characteristic.id}
              {...characteristic}
            />
          ))}
        </CharacteristicsContainer>
      ) : <EmptyList />}
      <Vertical />
      <Box sx={{ pt: 1 }}>
        <IconButton
          name="add"
          onClick={() => editStore.openDialog(null)}
          help={{
            arrow: true,
            title: <Text onlyText name="add" />,
          }}
        />
      </Box>
    </Box>
  )
})
