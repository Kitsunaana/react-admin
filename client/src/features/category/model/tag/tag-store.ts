import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { Tag } from "entities/tag"
import { RecordEvent } from "../../view-model/history/events"
import { List } from "../list"
import {
  subscribeSubmitCreateTagEvent,
  subscribeSubmitEditTagEvent,
  subscribeSubmitRemoveTagEvent,
} from "./tag-events"
import { PasteAction } from "../../view-model/setting/settings-types"

export class TagStore {
  constructor(
    private recordEvent: RecordEvent,
    public list: List<Tag>,
  ) {
    makeAutoObservable(this, {}, { autoBind: true })

    subscribeSubmitCreateTagEvent(this.createTagEvent)
    subscribeSubmitEditTagEvent(this.editTagEvent)
    subscribeSubmitRemoveTagEvent(this.removeTagEvent)
  }

  public getState(data: Tag) {
    if (this.list.getIsAlreadyExists(data, this.list.array)) return "error"
    if (this.list.getIsCreatedOrUpdated(data)) return "success"

    return "none"
  }

  public setCopiedTags(action: PasteAction, tags: Tag[]) {
    if (action === "add") this.addCopiedTags(tags)

    if (action === "replace") return this.replaceCopiedTags(tags)
  }

  private addCopiedTags(addedTags: Tag[]) {
    const tagsCaption = this.list.getCaptions(this.list.array)
    const filteredTags = this.list.getFilteredItems(tagsCaption, addedTags)

    const createdTags = this.list
      .getCreatedItems(filteredTags, this.list.buildCreateItem)

    this.list.merge(createdTags)
  }

  private replaceCopiedTags(replacedTags: Tag[]) {
    this.list.removeAllItems(this.list.array, this.list.remove)

    const createdItems = this.list
      .getCreatedItems(replacedTags, this.list.buildCreateItem)

    this.list.merge(createdItems)
  }

  private createTagEvent(payload: Tag) {
    this.list.add(payload)

    this.recordEvent({
      id: nanoid(),
      type: "addTag",
      value: payload,
      tab: 5,
    })
  }

  private editTagEvent(payload: Tag) {
    this.list.edit(payload)

    this.recordEvent({
      id: nanoid(),
      type: "updateTag",
      value: payload,
      tab: 5,
    })
  }

  private removeTagEvent(id: string) {
    this.list.remove(id)

    this.recordEvent({
      id: nanoid(),
      type: "removeTag",
      value: id,
      tab: 5,
    })
  }
}
