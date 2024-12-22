import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { toast } from "react-toastify"
import { createRoute, eventBus } from "shared/lib/event-bus"
import { CategoryStore } from "widgets/category-dialog/store/category-store"
import { altNameApi } from "../api"
import {
  FetchTranslateData, TranslateBody, AltName, Locale,
} from "../domain/alt-name"
import { List } from "./list"

const altNameRemoveEvent = createRoute("altName.remove.submit")
  .withParams<{ data: AltName, callback:(id: string) => void }>()

const altNameEditEvent = createRoute("altName.edit.submit")
  .withParams<AltName>()

const altNameCreateEvent = createRoute("altName.create.submit")
  .withParams<AltName>()

export class AltNameStore {
  isLoading = false
  altNamesList = new List<AltName>([])

  constructor(private parent: CategoryStore) {
    makeAutoObservable(this, { }, { autoBind: true })

    eventBus.on(altNameCreateEvent, ({ payload }) => {
      this.create(payload)

      this.parent.history.recordEvent({
        id: nanoid(),
        type: "addAltName",
        value: payload,
        tab: 4,
      })
    })

    eventBus.on(altNameEditEvent, ({ payload }) => {
      this.edit(payload)

      this.parent.history.recordEvent({
        id: nanoid(),
        type: "updateAltName",
        value: payload,
        tab: 4,
      })
    })
  }

  get altNames() {
    return this.altNamesList.list
  }

  get count() {
    return this.altNamesList.count
  }

  get isEmpty() {
    return this.altNamesList.isEmpty
  }

  getData() {
    return {
      altNames: this.altNamesList.get(),
    }
  }

  setAltNames(altNames: AltName[]) {
    this.altNamesList.set(altNames)
  }

  create(payload: AltName) {
    this.altNamesList.create(payload)
  }

  edit(payload: AltName) {
    this.altNamesList.edit(payload)
  }

  remove(data: AltName) {
    const callback = (id: string) => {
      this.altNamesList.remove(id)

      this.parent.history.recordEvent({
        id: nanoid(),
        type: "removeAltName",
        value: id,
        tab: 4,
      })
    }

    eventBus.emit(altNameRemoveEvent({
      callback,
      data,
    }))
  }

  getFreeLocale(locales: Locale[]) {
    const usedLocales = this.altNames.map((item) => item.locale.code)

    return locales.filter((locale) => !usedLocales.includes(locale.code))
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading
  }

  translate(category: TranslateBody, locales: Locale[]) {
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

  addTranslateAltNames(translates: FetchTranslateData) {
    translates.map(({ data, locale }) => this.create({
      ...data.trans,
      locale,
      id: nanoid(),
      status: "create",
    }))
  }
}
