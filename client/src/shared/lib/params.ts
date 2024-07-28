import queryString from "query-string"

interface IActionParams {
  history: string[]
  push(name: string, value: number | string | null): this
  replace(path: string): this
  back(): void
  index: number
}

export const actionParams: IActionParams = {
  history: [window.location.href],
  index: 0,

  push(name: string, value: number | string) {
    const { location } = window

    const queries = queryString.parseUrl(location.href).query

    if (value === null) delete queries[name]
    else queries[name] = String(value)

    const path = location.pathname.replace("/", "")
    const stringified = queryString.stringify(queries)

    const { origin } = location
    const data = { page: this.index, name: path, params: stringified }
    const url = stringified ? `?${stringified}` : `${origin}/${path}`

    window.history.pushState(data, path, url)

    this.history.push(location.href)
    this.index += 1

    return this
  },

  replace(path: string) {
    const { origin } = window.location
    window.history.pushState({ page: this.index, name: path }, path, `${origin}/${path}`)
    this.history.push(window.location.href)
    this.index += 1

    return this
  },

  back() {
    if (this.history[this.index - 1]) {
      window.history.pushState({}, "", this.history[this.index - 1])
      this.index -= 1
    }
  },
}
