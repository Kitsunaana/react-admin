import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { CategoryDto } from "shared/types/category"
import { isNumber, isString } from "shared/lib/utils"

export class TagsStore {
  tags: CategoryDto.TagCreate[] = []

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  create(data: CategoryDto.TagBase) {
    this.tags.push({
      ...data, action: "create", id: nanoid(),
    })
  }

  edit(data: CategoryDto.TagCreate) {
    console.log(data)
    this.tags = this.tags
      .map((item) => (item.id !== data.id
        ? item
        : {
          ...item,
          ...data,
          action: isNumber(item.id) ? "update" : "create",
        }))
  }

  remove(id: number | string) {
    this.tags = this.tags
      .map((tag): CategoryDto.TagCreate | null => {
        if (isNumber(tag.id) && tag.id === id) return { ...tag, action: "remove" }
        if (isString(tag.id) && tag.id === id) return null

        return tag
      })
      .filter((tag): tag is CategoryDto.TagCreate => tag !== null)
  }

  isRecordCreatedOrUpdated(id: number | string) {
    const findTag = this.tags.find((tag) => tag.id === id)
    if (findTag === undefined) return false

    return findTag.action === "create" || findTag.action === "update"
  }

  get filteredTags() {
    return this.tags.filter((tag) => tag.action !== "remove")
  }

  getData() {
    return {
      tags: this.tags
    }
  }

  setTags(tags: CategoryDto.Tag[]) {
    this.tags = tags ?? []
  }

  setCopiedTags(tags: unknown) {
    console.log(tags)
    /* const validatedTags = validation(tagsSchema, tags)
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
      none: () => { },
    }

    actions[action]() */
  }
}
