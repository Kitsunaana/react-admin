import {
  openCreateCharacteristicDialog,
  openEditCharacteristicDialog,
} from "entities/characteristic"
import { useKeyboardEvents } from "features/categories/dialog/model/use-keyboard-events"
import { useRemoveCharacteristic } from "features/characteristics"
import { observer } from "mobx-react-lite"
import { nanoid } from "nanoid"
import { useCallback } from "react"
import { useLang } from "shared/context/lang"
import { useGetConfirmation } from "shared/lib/confirmation"
import { eventBus } from "shared/lib/event-bus"
import { Common } from "shared/types/common"
import { Box } from "shared/ui/box"
import { IconButton } from "shared/ui/buttons/icon-button"
import { EmptyList } from "shared/ui/empty-list"
import { Mark } from "shared/ui/mark"
import { Text } from "shared/ui/text"
import { useCategoryStores } from "../../context"
import { TabCharacteristicsLayout } from "./layout"
import { CharacteristicsList } from "./list"

const keyboardInfo = [
  {
    id: 1,
    control: "Ctrl+ArrowDown",
    caption: "Выбрать следующую характеристику",
  },
  {
    id: 2,
    control: "Ctrl+ArrowUp",
    caption: "Выбрать предыдущую характеристику",
  },
  {
    id: 3,
    control: "Ctrl+Alt+A",
    caption: "Создать характеристику",
  },
  {
    id: 4,
    control: "Ctrl+Alt+E",
    caption: "Редактировать характеристику, если она выбрана или на неё наведен курсор",
  },
  {
    id: 5,
    control: "Ctrl+Alt+D",
    caption: "Удалить характеристику, если она выбрана или на неё наведен курсор",
  },
]

interface TabCharacteristicsProps {
  tab: number
}

export const TabCharacteristics = observer((props: TabCharacteristicsProps) => {
  const { tab } = props

  const langBase = useLang()
  const handleRemoveConfirm = useRemoveCharacteristic(langBase)
  const { characteristicsStore, historyStore } = useCategoryStores()
  const getConfirmation = useGetConfirmation()

  const getKeyboardInfo = useCallback(() => getConfirmation({
    langBase: "global.dialog.confirm.keyboard",
    closeText: "close",
    confirmText: "ok",
    title: "keyboardControl",
    description: (
      <Box flex gap>
        {keyboardInfo.map((info) => (
          <Box key={info.id} ai="start" flex row gap>
            <Mark fontSize={12}>{info.control}</Mark>
            <span>—</span>
            <Text caption={info.caption} />
          </Box>
        ))}
      </Box>
    ),
  }), [])

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
      getNodes: (ref) => ref.current?.children ?? [] as unknown as HTMLCollection,
      itemsCount: characteristicsStore.filteredItems.length - 1,
    },
    {
      onGetKeyboardInfo: getKeyboardInfo,
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

  const isEmptyList = characteristicsStore.filteredItems.length === 0

  return (
    <TabCharacteristicsLayout
      emptyList={isEmptyList && <EmptyList />}
      list={!isEmptyList && (
        <CharacteristicsList
          tab={tab}
          indexSelected={selected.index}
          showSelected={selected.show}
          refBox={selected.refBox}
        />
      )}
      actions={(
        <>
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
          <IconButton
            name="keyboard"
            onClick={getKeyboardInfo}
            help={{
              title: (
                <Text
                  onlyText
                  name="actions.keyboard"
                />
              ),
            }}
          />
        </>
      )}
    />
  )
})
