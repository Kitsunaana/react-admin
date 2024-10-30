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
import { useLang } from "shared/context/lang"
import { nanoid } from "nanoid"
import { useCategoryStores } from "../context"

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

interface TabCharacteristicsProps {
  tab: number
}

export const TabCharacteristics = observer(({ tab }: TabCharacteristicsProps) => {
  const { characteristicsStore, historyStore } = useCategoryStores()
  const { fullScreen } = useEditDialogStore()
  const langBase = useLang()

  const handleRemove = useRemoveCharacteristic(langBase)

  return (
    <Box flex row grow sx={{ height: 1 }}>
      {characteristicsStore.filteredItems.length > 0 ? (
        <CharacteristicsContainer fullScreen={fullScreen}>
          {characteristicsStore.filteredItems.map((item: Common.CharacteristicCreate) => (
            <Characteristic
              id={item.id}
              key={item.id}
              value={item.value}
              unit={item.unit}
              hideClient={item.hideClient}
              caption={item.caption}
              onRemove={() => {
                handleRemove(item, characteristicsStore.remove)

                historyStore.recordEvent({
                  id: nanoid(),
                  tab,
                  type: "removeCharacteristic",
                  value: item.id,
                })
              }}
              onEdit={(payload) => eventBus.emit(openEditCharacteristicDialog(payload))}
              hasConflict={characteristicsStore.getConflict({ caption: item.caption, id: item.id })}
              isCreatedOrUpdated={characteristicsStore.isCreatedOrUpdated(item.id)}
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
