import { CategoryLocal } from "shared/types/new_types/types"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"
import {
  AddCharacteristicEvent,
  RemoveCharacteristicEvent,
  UpdateCharacteristicEvent,
} from "../../../model/history/events"
import { MarkEvent, TemplateEvent, TemplateEventProps } from "../base"
import { CharacteristicEventsBox, CharacteristicEventContainer } from "./styles"

export const CharacteristicAddEvent = ({
  event,
  ...other
}: TemplateEventProps & {
  event: AddCharacteristicEvent
}) => (
  <TemplateEvent {...other}>
    <CharacteristicEventContainer>
      <Text caption="Добавлена характеристика" />
      <MarkEvent color="success">
        {event.value.caption}
        {" "}
        {event.value.value}
        {" "}
        {event.value.unit ?? ""}
      </MarkEvent>
    </CharacteristicEventContainer>
  </TemplateEvent>
)

export const CharacteristicUpdateEvent = ({
  event,
  prev,
  ...other
}: TemplateEventProps & {
  prev: CategoryLocal
  event: UpdateCharacteristicEvent
}) => {
  const findCharacteristic = prev.characteristics.find((c) => c.id === event.value.id)

  return (
    <TemplateEvent {...other}>
      <CharacteristicEventContainer>
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
      </CharacteristicEventContainer>
    </TemplateEvent>
  )
}

export const CharacteristicRemoveEvent = ({
  event,
  prev,
  ...other
}: TemplateEventProps & {
  event: RemoveCharacteristicEvent
  prev: CategoryLocal
}) => {
  const findCharacteristic = prev.characteristics.find((c) => c.id === event.value)

  return (
    <TemplateEvent {...other}>
      <CharacteristicEventContainer>
        <Text caption="Характеристика удалена" />
        <CharacteristicEventsBox>
          <MarkEvent color="error">
            {findCharacteristic?.caption}
            {": "}
            {findCharacteristic?.value}
            {" "}
            {findCharacteristic?.unit ?? ""}
          </MarkEvent>
        </CharacteristicEventsBox>
      </CharacteristicEventContainer>
    </TemplateEvent>
  )
}
