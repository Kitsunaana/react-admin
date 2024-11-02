import { styled } from "@mui/material/styles"
import {
  Characteristic,
  openCreateCharacteristicDialog,
  openEditCharacteristicDialog,
} from "entities/characteristic"
import { useKeyboardEvents } from "features/categories/dialog/model/use-keyboard-events"
import { useRemoveCharacteristic } from "features/characteristics"
import { observer } from "mobx-react-lite"
import { nanoid } from "nanoid"
import { forwardRef, useCallback } from "react"
import { useCreateDialogStore } from "shared/context/dialog-create-context"
import { useEditDialogStore } from "shared/context/dialog-edit-context"
import { useLang } from "shared/context/lang"
import { eventBus } from "shared/lib/event-bus"
import { Common } from "shared/types/common"
import { Box, BoxProps } from "shared/ui/box"
import { useCategoryStores } from "../../context"

type CharacteristicsContainerProps = BoxProps & { fullScreen: boolean }

const CharacteristicsContainer = styled(
  forwardRef(({ fullScreen, ...other }: CharacteristicsContainerProps, ref) => <Box {...other} ref={ref} />),
)(({ fullScreen }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  marginTop: 8,
  overflow: "auto",
  height: fullScreen ? "calc(100% - 60px)" : "400px",
}))

interface CharacteristicsListProps {
  tab: number
}

export const CharacteristicsList = observer(({ tab }: CharacteristicsListProps) => {
  const { characteristicsStore, historyStore } = useCategoryStores()
  const createDialogStore = useCreateDialogStore()
  const editDialogStore = useEditDialogStore()
  const langBase = useLang()

  const handleRemoveConfirm = useRemoveCharacteristic(langBase)

  const handleRemove = useCallback((payload: Common.CharacteristicCreate) => (
    handleRemoveConfirm(payload, (id) => {
      characteristicsStore.remove(id)

      historyStore.recordEvent({
        id: nanoid(),
        tab,
        type: "removeCharacteristic",
        value: payload.id,
      })
    })
  ), [])

  const selected = useKeyboardEvents(
    {
      tab,
      getNodes: (ref) => ref.current?.children ?? [] as unknown as HTMLCollection,
      itemsCount: characteristicsStore.filteredItems.length - 1,
    },
    {
      onOpenCreateDialog: () => eventBus.emit(openCreateCharacteristicDialog({})),
      onOpenEditDialog: (index) => {
        const findCharacteristic = characteristicsStore.filteredItems[index]

        if (findCharacteristic) {
          eventBus.emit(openEditCharacteristicDialog(findCharacteristic))
        }
      },
      onRemoveItem: async (index) => {
        const findCharacteristic = characteristicsStore.filteredItems[index]

        if (findCharacteristic) handleRemove(findCharacteristic)
      },
    },
  )

  const onEdit = useCallback((payload: Common.CharacteristicCreate) => {
    eventBus.emit(openEditCharacteristicDialog(payload))
  }, [])

  return (
    <CharacteristicsContainer
      ref={selected.refBox}
      fullScreen={createDialogStore.fullScreen || editDialogStore.fullScreen}
    >
      {characteristicsStore.filteredItems.map((item, index) => (
        <Characteristic
          active={(selected.index === index) && selected.show}
          id={item.id}
          key={item.id}
          value={item.value}
          unit={item.unit}
          hideClient={item.hideClient}
          caption={item.caption}
          onRemove={handleRemove}
          onEdit={onEdit}
          hasConflict={characteristicsStore.getConflict({ caption: item.caption, id: item.id })}
          isCreatedOrUpdated={characteristicsStore.isCreatedOrUpdated(item.id)}
        />
      ))}
    </CharacteristicsContainer>
  )
})
