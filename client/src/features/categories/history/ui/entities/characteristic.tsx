import {
  AddCharacteristicEvent,
  RemoveCharacteristicEvent,
  UpdateCharacteristicEvent,
} from "features/categories/@history/domain/events"
import { Box } from "shared/ui/box"
import { Text } from "shared/ui/text"
import { Category } from "features/categories/@history/model/category-history.store"
import { Icon } from "shared/ui/icon"
import { Common } from "shared/types/common"
import { MarkEvent, TemplateEvent } from "features/categories/@history/ui/base"

interface CharacteristicAddEventProps {
  event: AddCharacteristicEvent
}

export const CharacteristicAddEvent = (props: CharacteristicAddEventProps) => {
  const { event } = props

  return (
    <TemplateEvent selected={false} onClick={() => {}}>
      <Box flex row gap ai fontSize={12}>
        <Text caption="Добавлена характеристика" />
        <MarkEvent color="success">
          {event.value.caption}
          {" "}
          {event.value.value}
          {" "}
          {event.value.unit ?? ""}
        </MarkEvent>
      </Box>
    </TemplateEvent>
  )
}

interface CharacteristicUpdateEventProps {
  prev: Category
  event: UpdateCharacteristicEvent
}

export const CharacteristicUpdateEvent = (props: CharacteristicUpdateEventProps) => {
  const { event, prev } = props

  const findCharacteristic = (prev.characteristics as (Common.CharacteristicCreate | Common.Characteristic)[])
    .find((characteristic) => characteristic.id === event.value.id)

  return (
    <TemplateEvent selected={false} onClick={() => {}}>
      <Box flex row gap={0.5} ai fontSize={12}>
        <Text caption="Характеристика обновлена" />
        <MarkEvent color="warning">
          {findCharacteristic?.caption}
          {": "}
          {findCharacteristic?.value}
          {" "}
          {findCharacteristic?.unit ?? ""}
        </MarkEvent>
        <Icon name="arrowRight" />
        <MarkEvent color="success">
          {event.value.caption}
          {" "}
          {event.value.value}
          {" "}
          {event.value.unit ?? ""}
        </MarkEvent>
      </Box>
    </TemplateEvent>
  )
}

interface CharacteristicRemoveEventProps {
  event: RemoveCharacteristicEvent
  prev: Category
}

export const CharacteristicRemoveEvent = (props: CharacteristicRemoveEventProps) => {
  const { event, prev } = props

  const findCharacteristic = (
    prev.characteristics as (Common.CharacteristicCreate | Common.Characteristic)[]
  )
    .find((characteristic) => characteristic.id === event.value)

  return (
    <TemplateEvent selected={false} onClick={() => {}}>
      <Box flex row gap ai fontSize={12}>
        <Text caption="Характеристика удалена" />
        <Box flex row gap={0.25}>
          <MarkEvent color="success">
            {findCharacteristic?.caption}
            {": "}
            {findCharacteristic?.value}
            {" "}
            {findCharacteristic?.unit ?? ""}
          </MarkEvent>
        </Box>
      </Box>
    </TemplateEvent>
  )
}
