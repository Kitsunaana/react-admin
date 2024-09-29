import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { z } from "zod"
import { validation } from "shared/lib/validation"
import { RootStore } from "features/categories/model/stores/dialog-store"
import { ITag, ITagCreate, ITagEdit } from "./types"

const tagSchema = z.object({
  id: z.number().or(z.string()),
  icon: z.string().nullable(),
  tagColor: z.string(),
  action: z.enum(["update", "create", "remove"]).optional(),
  tag: z.string(),
})

const tagsSchema = z.array(tagSchema)

export class TagsStore {
  tags: ITag[] = []

  constructor(private rootStore: RootStore) {
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
        if (tag.id === id) return tag.local ? null : { ...tag, action: "remove" }

        return tag
      })
      .filter((item): item is ITag => item !== null)
  }

  get filteredTags() {
    return this.tags.filter((tag) => tag.action !== "remove")
  }

  getData(all: boolean = false) {
    return (() => ({
      tags: all ? this.tags : this.tags.map(({ id, local, ...other }) => ({
        ...other,
        ...(typeof id === "number" && !local ? { id } : {}),
      })),
    }))()
  }

  setTags(tags: unknown) {
    // const validatedTags = validation(tagsSchema, tags)

    console.log(tags)
    this.tags = tags ?? []
  }

  setCopiedTags(tags: unknown) {
    const validatedTags = validation(tagsSchema, tags)
    const action = this.rootStore.settings.tags

    const actions = {
      add: () => {
        const tagCaptions = this.filteredTags.map((value) => value.tag.caption)
        const filteredTags = validatedTags.filter((value) => !tagCaptions.includes(value.tag.caption))

        filteredTags.map(this.create)
      },
      replace: () => {
        this.tags.forEach(({ id }) => this.remove(id))
        validatedTags.map(this.create)
      },
      none: () => {},
    }

    actions[action]()
  }
}
