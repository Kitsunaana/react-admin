import { makeAutoObservable } from "mobx"
import queryString from "query-string"
import { isString } from "shared/lib/utils"

class UrlStore {
  searchParams = queryString.stringify(queryString.parseUrl(window.location.search).query)
  page = 1

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setPage(page: number) {
    this.page = page
  }

  setSearchParams(data: string | object) {
    if (isString(data)) {
      const parsedUrl = queryString.parseUrl(window.location.href)
      this.searchParams = queryString.stringify(parsedUrl.query)
    } else {
      this.searchParams = queryString.stringify(data)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getSearchParamsRecord() {
    return queryString.parseUrl(window.location.search).query
  }
}

export const createUrlStore = () => new UrlStore()
