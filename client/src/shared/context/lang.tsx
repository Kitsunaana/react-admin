import { createContext, ReactNode, useContext } from "react"

class LangStore {
  private _langBase: string

  constructor(langBase: string) {
    this._langBase = langBase
  }

  get lang() {
    return this._langBase
  }

  set lang(value: string) {
    this._langBase = value
  }
}

const context = createContext<LangStore | null>(null)

const createLangStore = (lang: string) => new LangStore(lang)

export const useLang = (defaultValue: string = "global") => useContext(context)?.lang ?? defaultValue

interface LangContextProps {
  children: ReactNode
  lang: string
}

export const LangContext = (props: LangContextProps) => {
  const { lang, ...other } = props

  return (
    <context.Provider
      value={createLangStore(lang)}
      {...other}
    />
  )
}