import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { RecordEvent } from "../../model/history/events"
import {
  AltName, Locale, FetchTranslateResponse,
} from "../../domain/alt-name"
import { List } from "../list"
import {
  subscribeSubmitCreateAltNameEvent, subscribeSubmitEditAltNameEvent, subscribeSubmitRemoveAltNameEvent,
} from "./alt-name-events"
import { filterByUnusedLocales, getUsedCodeLocales, filterLocales } from "./alt-name-core"

export class AltNameStore {
  constructor(private recordEvent: RecordEvent, public list: List<AltName>) {
    makeAutoObservable(this, {}, { autoBind: true })

    subscribeSubmitCreateAltNameEvent(this.createAltNameEvent)
    subscribeSubmitEditAltNameEvent(this.editAltNameEvent)
    subscribeSubmitRemoveAltNameEvent(this.removeAltNameEvent)
  }

  private createAltNameEvent(payload: AltName) {
    this.list.add(payload)

    this.recordEvent({
      id: nanoid(),
      type: "addAltName",
      value: payload,
      tab: 4,
    })
  }

  private editAltNameEvent(payload: AltName) {
    this.list.edit(payload)

    this.recordEvent({
      id: nanoid(),
      type: "updateAltName",
      value: payload,
      tab: 4,
    })
  }

  private removeAltNameEvent(id: string) {
    this.list.remove(id)

    this.recordEvent({
      id: nanoid(),
      type: "removeAltName",
      value: id,
      tab: 4,
    })
  }

  public getUnusedLocales(locales: Locale[]) {
    const usedCodeLocales = getUsedCodeLocales(this.list.array)

    return filterLocales(locales, (locale) => (
      filterByUnusedLocales(locale, usedCodeLocales)
    ))
  }

  public addTranslateAltNames(translates: Array<FetchTranslateResponse>) {
    translates.map(({ data, locale }) => this.list.add({
      ...data.trans,
      locale,
      id: nanoid(),
      status: "create",
    }))
  }
}
