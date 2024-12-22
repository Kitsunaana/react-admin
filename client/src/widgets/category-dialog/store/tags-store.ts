import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { Tag } from "shared/types/new_types/types"
import { CategoryStore } from "widgets/category-dialog/store/category-store"
import { createRoute, eventBus } from "shared/lib/event-bus"
import { List } from "./list"

const tagCreateEvent = createRoute("tag.create.submit")
  .withParams<Tag>()

const tagEditEvent = createRoute("tag.edit.submit")
  .withParams<Tag>()

const tagRemoveEvent = createRoute("tag.remove.submit")
  .withParams<{ data: Tag, callback:(id: string) => void }>()

export class TagsStore {
  tagsList = new List<Tag>([])

  constructor(private parent: CategoryStore) {
    makeAutoObservable(this, {}, { autoBind: true })

    eventBus.on(tagCreateEvent, ({ payload }) => {
      this.create(payload)

      this.parent.history.recordEvent({
        id: nanoid(),
        type: "addTag",
        value: payload,
        tab: 5,
      })
    })

    eventBus.on(tagEditEvent, ({ payload }) => {
      this.edit(payload)

      this.parent.history.recordEvent({
        id: nanoid(),
        type: "updateTag",
        value: payload,
        tab: 5,
      })
    })
  }

  get tags() {
    return this.tagsList.list
  }

  get count() {
    return this.tagsList.count
  }

  get isEmpty() {
    return this.tagsList.isEmpty
  }

  getData() {
    return {
      tags: this.tagsList.get(),
    }
  }

  setTags(data: Tag[]) {
    this.tagsList.set(data)
  }

  create(payload: Tag) {
    this.tagsList.create(payload)
  }

  edit(payload: Tag) {
    this.tagsList.edit(payload)
  }

  remove(data: Tag) {
    const callback = (id: string) => {
      this.tagsList.remove(id)

      this.parent.history.recordEvent({
        id: nanoid(),
        type: "removeTag",
        value: id,
        tab: 5,
      })
    }

    eventBus.emit(tagRemoveEvent({ data, callback }))
  }

  setCopiedTags(action: "none" | "add" | "replace", tags: Tag[]) {
    const actions = {
      none: () => { },
      add: () => {
        const tagCaptions = this.tags.map((item) => item.caption)
        const filteredTags = tags.filter((tag) => !tagCaptions.includes(tag.caption))

        filteredTags.forEach((tag) => this.create({ ...tag, id: nanoid() }))
      },
      replace: () => {
        this.tags.forEach(({ id }) => this.tagsList.remove(id))
        tags.forEach((tag) => this.create({ ...tag, id: nanoid() }))
      },
    }

    actions[action]()
  }
}
