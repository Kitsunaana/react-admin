import { CharacteristicRow } from "entities/characteristic"
import { observer } from "mobx-react-lite"
import { useListKeyboardEvents } from "shared/hooks/use-tab-keyboard-events"
import { EmptyList } from "shared/ui/empty-list"
import { altCtrlKey, useKeyboard } from "shared/lib/keyboard-manager"
import { openCreateCharacteristicModal } from "widgets/category-dialog/model/characteristic/characteristic"
import { useCharacteristicStore } from "widgets/category-dialog/model/characteristic/use-characteristic-store"
import { useCharacteristics } from "../../../../facade/use-characteristics"
import { CharacteristicsContainer } from "./styles"

export const List = observer(() => {
  const isEmpty = useCharacteristicStore((store) => store.isEmpty)
  const characteristics = useCharacteristics()

  const selected = useListKeyboardEvents()

  useKeyboard({
    key: "a",
    callback: altCtrlKey(openCreateCharacteristicModal),
  })

  if (isEmpty) return <EmptyList />

  return (
    <CharacteristicsContainer ref={selected.refBox}>
      {characteristics.map((characteristic, index) => (
        <CharacteristicRow
          {...characteristic}
          key={characteristic.data.id}
          onEdit={characteristic.edit}
          onRemove={characteristic.remove}
          active={(selected.index === index) && selected.show}
        />
      ))}
    </CharacteristicsContainer>
  )
})
