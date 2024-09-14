import queryString from "query-string"
import { makeAutoObservable } from "mobx"

class UrlStore {
  searchParams = queryString.stringify(queryString.parseUrl(window.location.search).query)
  page = 1

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setPage(page: number) {
    this.page = page
  }

  setSearchParams<T extends {}>(data: T) {
    console.log(data)
    this.searchParams = queryString.stringify(data)
    console.log(this.searchParams)
  }
}

export const createUrlStore = () => new UrlStore()
