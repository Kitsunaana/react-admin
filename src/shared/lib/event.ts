export const dispatch = <T>(name: string, data: T, object = document) => {
  const event = new CustomEvent(name, {
    bubbles: true,
    detail: data,
  })

  object.dispatchEvent(event)
}

export const addEvent = <T>(name: string, event: (event: T) => void, object = document, ...args) => {
  const localEvent = (data: CustomEvent<T>) => {
    if (typeof event === "function") event(data.detail)
  }

  object.addEventListener(name, localEvent, ...args)

  return () => object.removeEventListener(name, localEvent)
}
