type EventType <Type extends string = string, Value = unknown> = {
  type: Type
  payload: Value
}

type EventCreator<Type extends string = string, Value = any> = {
  (value: Value): EventType<Type, Value>
  type: Type,
  withParams: <Value2>() => EventCreator<Type, Value2>
  check: (eventType: EventType) => eventType is EventType<Type, Value>
}

type Listener<Type extends string = string, Value = unknown> = (arg: EventType<Type, Value>) => void

export const createRoute = <Type extends string, Value = void> (key: Type): EventCreator<Type, Value> => {
  const creator = (value: Value) => ({
    type: key,
    payload: value,
  })

  creator.type = key

  creator.withParams = <Value2>() => creator as unknown as EventCreator<Type, Value2>

  creator.check = (eventType: EventType): eventType is EventType<Type, Value> => (
    eventType.type === key
  )

  return creator
}

export class EventEmitter {
  private listeners = new Map<string, Set<Listener>>()
  private allListeners = new Set<Listener>()

  on<Type extends string, Value>(
    eventCreator: EventCreator<Type, Value>,
    callback: Listener<Type, Value>,
  ) {
    if (!this.listeners.has(eventCreator.type)) {
      this.listeners.set(eventCreator.type, new Set())
    }

    this.listeners.get(eventCreator.type)!.add(callback as Listener)
  }

  emit<Type extends string, Value>(event: EventType<Type, Value>) {
    if (this.listeners.has(event.type)) {
      this.listeners.get(event.type)!
        .forEach((callback) => callback(event))
    }
  }
}

export const eventBus = new EventEmitter()