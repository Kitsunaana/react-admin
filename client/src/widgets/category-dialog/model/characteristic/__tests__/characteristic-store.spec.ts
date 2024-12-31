import { expect, test, describe } from "vitest"
import { eventBus } from "shared/lib/event-bus"
import {
  characteristicCreateEvent,
  characteristicEditEvent,
  characteristicRemoveEvent,
} from "../characteristic-events"
import {
  withoutIds,
  replacedCharacteristics,
  createCharacteristicStore,
  characteristics,
  addedCharacteristics,
  characteristicShouldBeErrorState,
  characteristicShouldBeSuccessState, createdCharacteristic, editedCharacteristic,
} from "./characteristic-stub"

describe("features/category/model/characteristic/characteristic-store", () => {
  test("getState() should return an error status for the created characteristic", () => {
    const store = createCharacteristicStore()

    store.list.add(characteristicShouldBeErrorState)

    expect(store.getState(characteristicShouldBeErrorState))
      .toBe("error")
  })

  test("getState() should return an success status for the created characteristic", () => {
    const store = createCharacteristicStore()

    store.list.add(characteristicShouldBeSuccessState)

    expect(store.getState(characteristicShouldBeSuccessState))
      .toBe("success")
  })

  test("setCopiedCharacteristics() should add new characteristics to existing ones", () => {
    const store = createCharacteristicStore()

    store.setCopiedCharacteristics("add", addedCharacteristics)

    expect(withoutIds(store.array))
      .toEqual(withoutIds([...characteristics, ...addedCharacteristics]))
  })

  test("setCopiedCharacteristics() should replace existing characteristics with new ones", () => {
    const store = createCharacteristicStore()

    store.setCopiedCharacteristics("replace", replacedCharacteristics)

    expect(withoutIds(store.array))
      .toEqual(withoutIds(replacedCharacteristics))
  })

  test("Check that all events for which there are subscriptions are triggered", () => {
    const store = createCharacteristicStore()

    eventBus.emit(characteristicCreateEvent(createdCharacteristic))
    expect(store.array).toEqual([...characteristics, createdCharacteristic])

    eventBus.emit(characteristicEditEvent(editedCharacteristic))
    expect(store.array).toEqual([...characteristics, editedCharacteristic])

    eventBus.emit(characteristicRemoveEvent({ id: editedCharacteristic.id }))
    expect(store.array).toEqual([...characteristics])
  })
})
