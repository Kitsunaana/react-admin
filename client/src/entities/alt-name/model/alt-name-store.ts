import { makeAutoObservable, toJS } from "mobx"
import { nanoid } from "nanoid"
import { toast } from "react-toastify"
import { isEqual, isNumber, isString } from "shared/lib/utils"
import { Common } from "shared/types/common"
import { altNameApi } from "../api/alt-name-api"
import { DataTranslation, FetchTranslateData } from "../model/types"

export class AltNamesStore {
  isLoading = false
  altNames: Common.AltNameCreate[] = []

  selectedLocale: Common.Locale | null = null

  constructor() {
    makeAutoObservable(this, { selectedLocale: false }, { autoBind: true })
  }

  get filteredItems() {
    return this.altNames.filter((item) => item.action !== "remove")
  }

  create = (data: Common.AltNameBase) => {
    this.altNames.push({ ...data, action: "create", id: nanoid() })
  }

  edit = (data: Common.AltNameCreate) => {
    this.altNames = this.altNames.map((item) => (
      item.id !== data.id
        ? item
        : {
          ...item,
          ...data,
          action: isNumber(item.id) ? "update" : "create",
        }
    ))
  }

  remove = (id: number | string) => {
    this.altNames = this.altNames
      .map((altName): Common.AltNameCreate | null => {
        if (isNumber(id) && isEqual(altName.id, id)) return { ...altName, action: "remove" }
        if (isString(id) && isEqual(altName.id, id)) return null

        return altName
      })
      .filter((altName): altName is Common.AltNameCreate => altName !== null)
  }

  getFreeLocale = (locales: Common.Locale[]) => {
    const usedLocales = this.filteredItems.map((item) => item.locale.code)

    return locales.filter((locale) => (
      usedLocales.includes(locale.code)
        ? null
        : locale))
  }

  setIsLoading = (isLoading: boolean) => { this.isLoading = isLoading }

  translate = (category: DataTranslation, locales: Common.Locale[]) => {
    if (!category.caption) return
    this.isLoading = true

    Promise.all(
      this.getFreeLocale(locales)
        .map((locale) => altNameApi.translate(locale, category)),
    )
      .then(this.addTranslateAltNames)
      .catch((error) => error instanceof Error && toast.error(error.message))
      .finally(() => this.setIsLoading(false))
  }

  addTranslateAltNames = (translates: FetchTranslateData) => {
    translates.map(({ data, locale }) => this.create({
      ...data.trans,
      locale,
    }))
  }

  exclude = (locales: Common.Locale[], nonExclude: Common.Locale | null) => {
    const localeCodes = this.filteredItems.map((item) => item.locale.code)

    if (nonExclude !== null) this.selectedLocale = nonExclude

    return locales.map((locale) => {
      const isCodesNotEqual = this.selectedLocale?.code !== locale.code
      const isCodeNotAvailable = localeCodes.includes(locale.code)

      if (
        (isCodesNotEqual && isCodeNotAvailable)
        || (isCodeNotAvailable && nonExclude === null)
      ) return { ...locale, disabled: true }

      return locale
    })
  }

  getData = () => ({ altNames: toJS(this.altNames) })

  setAltNames = (altNames: (Common.AltName | Common.AltNameCreate)[]) => {
    this.altNames = altNames
  }
}
