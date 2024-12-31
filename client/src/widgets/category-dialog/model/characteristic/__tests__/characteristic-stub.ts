import { nanoid } from "nanoid"
import { CharacteristicStore } from "../characteristic-store"
import { List } from "../../list"
import { Characteristic } from "../../../domain/characteristic"

export const characteristicShouldBeErrorState: Characteristic = {
  id: nanoid(),
  caption: "should be error",
  unit: null,
  hideClient: false,
  value: "test",
  status: "create",
}

export const characteristicShouldBeSuccessState: Characteristic = {
  id: nanoid(),
  caption: "should be success",
  unit: null,
  hideClient: false,
  value: "test",
  status: "create",
}

export const createdCharacteristic: Characteristic = {
  id: nanoid(),
  caption: "createdCharacteristic",
  unit: null,
  hideClient: true,
  value: "",
  status: "create",
}

export const editedCharacteristic: Characteristic = {
  ...createdCharacteristic,
  value: "123",
  caption: "123",
}

export const characteristics: Characteristic[] = [
  {
    ...characteristicShouldBeErrorState,
    id: nanoid(),
  },
]

export const addedCharacteristics: Characteristic[] = [
  {
    id: nanoid(),
    caption: "added characteristic 1",
    unit: null,
    hideClient: false,
    value: "test",
    status: "create",
  },
  {
    id: nanoid(),
    caption: "added characteristic 2",
    unit: null,
    hideClient: false,
    value: "test",
    status: "create",
  },
]

export const replacedCharacteristics: Characteristic[] = [
  {
    id: nanoid(),
    caption: "replaced characteristic 1",
    unit: null,
    hideClient: false,
    value: "test",
    status: "create",
  },
  {
    id: nanoid(),
    caption: "replaced characteristic 2",
    unit: null,
    hideClient: false,
    value: "test",
    status: "create",
  },
]

export const createCharacteristicStore = () => {
  const list = new List<Characteristic>(characteristics)

  return new CharacteristicStore((event) => event, list)
}

export const withoutIds = <T extends { id: string }>(items: T[]): Omit<T, "id">[] => (
  items.map(({ id, ...other }) => other)
)
