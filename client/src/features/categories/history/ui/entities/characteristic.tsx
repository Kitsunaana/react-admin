import { Common } from "shared/types/common"
import { Box } from "shared/ui/box"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import {
  AddCharacteristicEvent,
  RemoveCharacteristicEvent,
  UpdateCharacteristicEvent,
} from "../../domain/events"
import { Category } from "../../domain/types"
import { MarkEvent, TemplateEvent, TemplateEventProps } from "../base"

interface CharacteristicAddEventProps extends TemplateEventProps {
  event: AddCharacteristicEvent
}

export const CharacteristicAddEvent = (props: CharacteristicAddEventProps) => {
  const { event, ...other } = props

  return (
    <TemplateEvent {...other}>
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

interface CharacteristicUpdateEventProps extends TemplateEventProps {
  prev: Category
  event: UpdateCharacteristicEvent
}

export const CharacteristicUpdateEvent = (props: CharacteristicUpdateEventProps) => {
  const { event, prev, ...other } = props

  const findCharacteristic = (prev.characteristics as (Common.CharacteristicCreate | Common.Characteristic)[])
    .find((characteristic) => characteristic.id === event.value.id)

  return (
    <TemplateEvent {...other}>
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

interface CharacteristicRemoveEventProps extends TemplateEventProps {
  event: RemoveCharacteristicEvent
  prev: Category
}

export const CharacteristicRemoveEvent = (props: CharacteristicRemoveEventProps) => {
  const { event, prev, ...other } = props

  const findCharacteristic = (
    prev.characteristics as (Common.CharacteristicCreate | Common.Characteristic)[]
  )
    .find((characteristic) => characteristic.id === event.value)

  return (
    <TemplateEvent {...other}>
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
