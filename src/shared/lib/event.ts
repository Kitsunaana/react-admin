interface IEvents {
  selected: {
    selectedId: number
    selectedOptionId: number | null
  },
  hashchange: HashChangeEvent,
  route: {
    route: string
  },
  changeLanguage: {
    language: "en" | "ru"
  }
  theme: string
  changeIconsSettings: {
    fill?: number
    weight?: number
  }
}

export const dispatch = <Key extends keyof IEvents>(name: Key, data?: IEvents[Key], object = document) => {
  const event = new CustomEvent(name, {
    bubbles: true,
    detail: data,
  })

  object.dispatchEvent(event)
}

export const addEvent = <Key extends keyof IEvents>(
  name: Key,
  event: (data: IEvents[Key]) => void,
  object: Document | Window = document,
  ...args: any[]
) => {
  const localEvent = (data: CustomEvent<IEvents[Key]>) => {
    if (typeof event === "function") event(data.detail)
  }

  // @ts-ignore
  object.addEventListener(name, localEvent, ...args)

  // @ts-ignore
  return () => object.removeEventListener(name, localEvent)
}
