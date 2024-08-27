import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { ITag, ITagCreate, ITagEdit } from "./types"

export class TagsStore {
  tags: ITag[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  create(data: ITagCreate) {
    this.tags.push({
      ...data, local: true, action: "create", id: nanoid(),
    })
  }

  edit(data: ITagEdit) {
    this.tags = this.tags
      .map((item): ITag => {
        if (item.id === data.id) {
          return {
            ...item,
            ...data,
            edited: true,
            action: item.local ? "create" : "update",
          }
        }

        return item
      })
  }

  remove(id: number | string) {
    this.tags = this.tags
      .map((tag): ITag | null => {
        if (tag.id === id) {
          return tag.local ? null : { ...tag, action: "remove" }
        }

        return tag
      })
      .filter((item): item is ITag => item !== null)
  }

  get filteredTags() {
    return this.tags.filter((tag) => tag.action !== "remove")
  }

  getData() {
    return {
      tags: this.tags.map(({ id, local, ...other }) => ({
        ...other,
        ...(typeof id === "number" && !local ? { id } : {}),
      })),
    }
  }

  setTags(tags: any) {
    this.tags = tags
  }
}
