import { CharacteristicRow } from "entities/characteristic"
import { observer } from "mobx-react-lite"
import { useListKeyboardEvents } from "shared/hooks/use-tab-keyboard-events"
import { useCharacteristics } from "../../../../facade/use-characteristics"
import { CharacteristicsContainer } from "./styles"

export const List = observer(() => {
  const characteristics = useCharacteristics()

  const selected = useListKeyboardEvents()

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
