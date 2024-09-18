import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { altNameApi } from "../api/alt-name-api"
import {
  FetchTranslateData, IAltName, IAltNameCreate, IAltNameEdit, Locale,
} from "../model/types"

export class AltNamesStore {
  items: IAltName[] = []

  constructor() {
    makeAutoObservable(this, { selectedLocale: false }, { autoBind: true })
  }

  create(data: IAltNameCreate) {
    this.items.push({
      ...data, action: "create", id: Date.now(), local: true,
    })
  }

  edit(data: IAltNameEdit) {
    this.items = this.items.map((item) => (item.id === data.id ? {
      ...item, ...data, action: "update", edited: true,
    } : item))
  }

  remove(id: number) {
    this.items = this.items
      .map((altName): IAltName | null => {
        if (altName.id === id) {
          return altName.local ? null : { ...altName, action: "remove" }
        }

        return altName
      })
      .filter((altName): altName is IAltName => altName !== null)
  }

  get filteredItems() {
    return this.items.filter((item) => item.action !== "remove")
  }

  getFreeLocale(locales: Locale[]) {
    const busyLocales = this.filteredItems.map((item) => item.locale.code)

    return locales.filter((locale) => (busyLocales.includes(locale.code) ? null : locale))
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading
  }

  isLoading = false
  translate(category: { caption: string; description: string | null }, locales: Locale[]) {
    if (!category.caption) return
    this.isLoading = true

    Promise.all(
      this.getFreeLocale(locales)
        .map((locale) => altNameApi.translate(locale, category)),
    )
      .then(this.addTranslateAltNames)
      .catch(console.log)
      .finally(() => { this.setIsLoading(false) })
  }

  addTranslateAltNames(altNames: FetchTranslateData) {
    const items: IAltName[] = altNames.map((item) => ({
      ...item.data.trans,
      id: nanoid(),
      locale: item.locale,
      local: true,
      action: "create",
    }))

    this.items = [...this.items, ...items]
  }

  selectedLocale: Locale | null = null
  exclude(altNames: Locale[], nonExclude: Locale | null) {
    const haveAltNames = this.filteredItems.map((item) => item.locale.code)

    if (nonExclude !== null) this.selectedLocale = nonExclude

    return altNames.map((item) => {
      if (haveAltNames.includes(item.code) && this.selectedLocale?.code !== item.code) {
        return { ...item, disabled: true }
      }

      return item
    })
  }

  getData() {
    return {
      altNames: this.items.map(({ id, ...other }) => ({
        ...other,
        ...(other.local ? { } : { id }),
      })),
    }
  }

  setAltNames(altNames?: IAltName[]) {
    if (!altNames) return

    this.items = altNames
  }
}
