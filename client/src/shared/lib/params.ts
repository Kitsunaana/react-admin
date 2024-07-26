import queryString from "query-string"

interface IActionParams {
  history: string[]
  push(name: string, value: number | string): this
  replace(path: string): this
  back(): void
  index: number
}

export const actionParams: IActionParams = {
  history: [window.location.href],
  index: 0,

  push(name: string, value: number | string) {
    const queries = queryString.parseUrl(window.location.href).query

    if (value === null) delete queries[name]
    else queries[name] = String(value)

    const path = window.location.pathname.replace("/", "")
    const stringified = queryString.stringify(queries)

    window.history.pushState({ page: this.index, name: path, params: stringified }, path, `?${stringified}`)

    this.history.push(window.location.href)
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
      // console.log(this.history[this.index - 1])
      this.index -= 1
    }
  },
}
