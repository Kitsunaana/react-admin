import { boolean } from "zod"

interface IEvents {
  selected: {
    selectedId: number
    selectedOptionId: number | null
  },
  hashchange: HashChangeEvent,
  route: {
    route: string
    searchParams?: string
  },
  changeLanguage: {
    language: "en" | "ru"
  }
  theme: string
  changeIconsSettings: {
    fill?: number
    weight?: number
  }
  backdrop: {
    isActive: boolean
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

export const dispatchEdit = <Key extends keyof IEvents>(langBase: string, data: IEvents[Key]) => {
  dispatch(`${langBase}.dialog.edit` as any, data)
}

export const dispatchDelete = <Key extends keyof IEvents>(langBase: string, data: IEvents[Key]) => {
  dispatch(`${langBase}.dialog.delete` as any, data)
}
