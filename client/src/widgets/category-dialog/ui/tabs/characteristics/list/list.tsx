import { observer } from "mobx-react-lite"
import { CharacteristicRow } from "entities/characteristic"
import { useListKeyboardEvents } from "shared/hooks/use-tab-keyboard-events"
import { useCharacteristics } from "../../../../facade/use-characteristics"
import { useCharacteristicStore } from "../../../../model/use-characteristic-store"
import { CharacteristicsContainer } from "./styles"
import { useDeferredCharacteristics } from "../../../../view-model/use-deffered-characteristic"

export const List = observer(() => {
  const characteristics = useCharacteristics()

  const isEmpty = useCharacteristicStore((store) => store.isEmpty)
  const deferredCharacteristics = useDeferredCharacteristics(characteristics)

  const selected = useListKeyboardEvents()

  if (isEmpty) return null

  return (
    <CharacteristicsContainer ref={selected.refBox}>
      {deferredCharacteristics.map((characteristic, index) => (
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
