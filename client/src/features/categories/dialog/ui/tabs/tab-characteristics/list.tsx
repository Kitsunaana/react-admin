import { styled } from "@mui/material/styles"
import {
  Characteristic,
  openEditCharacteristicDialog,
} from "entities/characteristic"
import { useRemoveCharacteristic } from "features/characteristics"
import { observer } from "mobx-react-lite"
import { nanoid } from "nanoid"
import { forwardRef, MutableRefObject, useCallback } from "react"
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
  indexSelected: number | null
  showSelected: boolean
  refBox: MutableRefObject<HTMLDivElement | null>
}

export const CharacteristicsList = observer((props: CharacteristicsListProps) => {
  const {
    tab,
    indexSelected,
    showSelected,
    refBox,
  } = props

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

  const onEdit = useCallback((payload: Common.CharacteristicCreate) => {
    eventBus.emit(openEditCharacteristicDialog(payload))
  }, [])

  return (
    <CharacteristicsContainer
      ref={refBox}
      fullScreen={createDialogStore.fullScreen || editDialogStore.fullScreen}
    >
      {characteristicsStore.filteredItems.map((item, index) => (
        <Characteristic
          active={(indexSelected === index) && showSelected}
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
