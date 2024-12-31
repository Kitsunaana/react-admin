import { CharacteristicRow } from "entities/characteristic"
import { observer } from "mobx-react-lite"
import { EmptyList } from "shared/ui/empty-list"
import { altCtrlKey, useKeyboard } from "shared/lib/keyboard-manager"
import { useState } from "react"
import {
  startEditCharacteristic, startRemoveCharacteristic,
} from "../../../../model/characteristic/characteristic-events"
import { useCharacteristicStore } from "../../../../model/characteristic/use-characteristic-store"
import { CharacteristicsContainer } from "./styles"
import { createSelectionItem } from "../../../../view-model/selection-item-store"

export const List = observer(() => {
  const [selectionItem] = useState(createSelectionItem)

  const characteristics = useCharacteristicStore((store) => store.list.array)
  const isEmpty = useCharacteristicStore((store) => store.list.isEmpty)
  const count = useCharacteristicStore((store) => store.list.count)

  const getState = useCharacteristicStore((store) => store.getState)

  useKeyboard({
    key: "ArrowDown",
    callback: () => selectionItem.nextItem(count),
  })

  useKeyboard({
    key: "ArrowUp",
    callback: () => selectionItem.prevItem(count),
  })

  useKeyboard({
    key: "q",
    callback: altCtrlKey(selectionItem.unselect),
  })

  if (isEmpty) return <EmptyList />

  return (
    <CharacteristicsContainer>
      {characteristics.map((characteristic, index) => (
        <CharacteristicRow
          key={characteristic.id}
          data={characteristic}
          onEdit={startEditCharacteristic}
          onRemove={startRemoveCharacteristic}
          active={selectionItem.isSelection(index)}
          state={getState(characteristic)}
        />
      ))}
    </CharacteristicsContainer>
  )
})
