import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { Tag } from "shared/types/new_types/types"
import { eventBus } from "shared/lib/event-bus"
import { List } from "../list"
import { tagCreateEvent, tagRemoveEvent, tagEditEvent } from "./tag"
import { PasteAction } from "../../domain/settings"
import { RecordEvent } from "../../model/history/events"

export class TagStore {
  constructor(
    private recordEvent: RecordEvent,
    private list: List<Tag>,
  ) {
    makeAutoObservable(this, {
      createTag: false,
      getTagCaptions: false,
      getFilteredTags: false,
      addTags: false,
      replaceTags: false,
    }, { autoBind: true })

    eventBus.on(tagCreateEvent, ({ payload }) => {
      this.create(payload)

      this.recordEvent({
        id: nanoid(),
        type: "addTag",
        value: payload,
        tab: 5,
      })
    })

    eventBus.on(tagEditEvent, ({ payload }) => {
      this.edit(payload)

      this.recordEvent({
        id: nanoid(),
        type: "updateTag",
        value: payload,
        tab: 5,
      })
    })
  }

  get array() {
    return this.list.array
  }

  get count() {
    return this.list.count
  }

  get isEmpty() {
    return this.list.isEmpty
  }

  get() {
    return this.list.get()
  }

  set(data: Tag[]) {
    this.list.set(data)
  }

  create(payload: Tag) {
    this.list.add(payload)
  }

  edit(payload: Tag) {
    this.list.edit(payload)
  }

  removeAll() {
    this.array.forEach((t) => this.list.remove(t.id))
  }

  remove(data: Tag) {
    eventBus.emit(tagRemoveEvent({
      data,
      callback: (id: string) => {
        this.list.remove(id)

        this.recordEvent({
          id: nanoid(),
          type: "removeTag",
          value: id,
          tab: 5,
        })
      },
    }))
  }

  createTag(data: Tag) {
    // console.log(this)
    this.create({ ...data, status: "create", id: nanoid() })
  }

  getTagCaptions(tags: Tag[]) {
    return tags.map((t) => t.caption)
  }

  getFilteredTags(tags: Tag[], tagsExclude: Tag[]) {
    const tagCaptions = this.getTagCaptions(tags)

    return tagsExclude.filter((tag) => !tagCaptions.includes(tag.caption))
  }

  addTags(tags: Tag[]) {
    this
      .getFilteredTags(this.array, tags)
      .forEach(this.createTag.bind(this))
  }

  replaceTags(tags: Tag[]) {
    this.removeAll()

    tags.forEach(this.createTag)
  }

  setCopiedTags(action: PasteAction, tags: Tag[]) {
    console.log(tags)
    if (action === "add") this.addTags(tags)
    if (action === "replace") return this.replaceTags(tags)
  }

  isCreatedOrUpdated(tag: Tag) {
    return tag.status === "create" || tag.status === "update"
  }
}
