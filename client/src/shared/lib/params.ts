import queryString from "query-string"
import { useEffect, useState } from "react"
import { addEvent, dispatch } from "shared/lib/event"
import { ObjectPattern } from "copy-webpack-plugin"

interface IActionParams {
  history: string[]
  push(name: string, value: number | string | null): this
  replace(path: string): this
  back(): void
  _index: number
  get index(): number
}

export const actionParams: IActionParams = {
  history: [window.location.href],
  _index: 0,

  push(name: string, value: number | string) {
    const { location } = window

    const queries = queryString.parseUrl(location.href).query

    if (value === null) delete queries[name]
    else queries[name] = String(value)

    const path = location.pathname.replace("/", "")
    const stringified = queryString.stringify(queries)

    const { origin } = location
    const data = { page: this._index, name: path, params: stringified }
    const url = stringified ? `?${stringified}` : `${origin}/${path}`

    window.history.pushState(data, path, url)

    this.history.push(location.href)
    this._index += 1

    return this
  },

  replace(path: string) {
    const { origin } = window.location
    window.history.pushState({ page: this._index, name: path }, path, `${origin}/${path}`)
    this.history.push(window.location.href)
    this._index += 1

    return this
  },

  back() {
    if (this.history[this._index - 1]) {
      window.history.pushState({}, "", this.history[this._index - 1])
      this._index -= 1
    }
  },

  get index() {
    this._index += 1
    return this._index
  },
}

export const useHref = () => {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => addEvent("route", ({ route }) => {
    setPathname(route)
  }))

  return pathname
}

export const useNavigate = () => {
  const pathname = useHref()

  return (url: string, searchParams?: Record<string, any>) => {
    const { origin } = window.location

    let stringSearchParams
    if (searchParams) {
      stringSearchParams = Object.entries(searchParams)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")
    }

    window.history.pushState(
      { page: actionParams.index, name: url },
      url,
      `${origin}/${url}?${stringSearchParams}`,
    )

    dispatch("route", { route: url, searchParams: stringSearchParams })
  }
}
