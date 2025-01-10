import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { AltName, Locale } from "entities/alt-name"
import { RecordEvent } from "../../view-model/history/events"
import {
  FetchTranslateResponse,
} from "../../domain/alt-name"
import { List } from "../list"
import {
  subscribeSubmitCreateAltNameEvent,
  subscribeSubmitEditAltNameEvent,
  subscribeSubmitRemoveAltNameEvent,
} from "./alt-name-events"
import {
  filterByUnusedLocales,
  getUsedCodeLocales,
  filterLocales,
  getBuildCreateAltName,
} from "./alt-name-core"

export class AltNameStore {
  constructor(private recordEvent: RecordEvent, public list: List<AltName>) {
    makeAutoObservable(this, {}, { autoBind: true })

    subscribeSubmitCreateAltNameEvent(this.createAltNameEvent)
    subscribeSubmitEditAltNameEvent(this.editAltNameEvent)
    subscribeSubmitRemoveAltNameEvent(this.removeAltNameEvent)
  }

  public getState(data: AltName) {
    if (this.list.getIsCreatedOrUpdated(data)) return "success"
    return "none"
  }

  public getUnusedLocales(locales: Locale[]) {
    const usedCodeLocales = getUsedCodeLocales(this.list.array)

    return filterLocales(locales, (locale) => (
      filterByUnusedLocales(locale, usedCodeLocales)
    ))
  }

  public addTranslateAltNames(translates: Array<FetchTranslateResponse>) {
    const createdAltNames = translates.map((translate) => (
      this.list.buildCreateItem(getBuildCreateAltName(translate))
    ))

    this.list.merge(createdAltNames)
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
}
