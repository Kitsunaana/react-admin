import { makeAutoObservable, toJS } from "mobx"
import { isNumber, isString } from "shared/lib/utils"
import { CategoryDto } from "shared/types/category"
import { nanoid } from "nanoid"
import { Action } from "./types"

export class TagsStore {
  tags: CategoryDto.TagCreate[] = []

  getCopyAction: () => Action

  constructor(getCopyAction: () => Action) {
    this.getCopyAction = getCopyAction

    makeAutoObservable(this, {}, { autoBind: true })
  }

  create = (payload: CategoryDto.TagBase & { id: string }) => {
    this.tags.push({
      ...payload,
      action: "create",
    })
  }

  edit = (payload: CategoryDto.TagCreate) => {
    this.tags = this.tags
      .map((item) => (item.id !== payload.id
        ? item
        : {
          ...item,
          ...payload,
          action: isNumber(item.id) ? "update" : "create",
        }))
  }

  remove = (id: number | string) => {
    this.tags = this.tags
      .map((tag): CategoryDto.TagCreate | null => {
        if (isNumber(tag.id) && tag.id === id) return { ...tag, action: "remove" }
        if (isString(tag.id) && tag.id === id) return null

        return tag
      })
      .filter((tag): tag is CategoryDto.TagCreate => tag !== null)
  }

  getData = () => ({ tags: toJS(this.tags) })

  setTags = (tags: (CategoryDto.Tag | CategoryDto.TagCreate)[]) => { this.tags = tags }

  setCopiedTags(tags: CategoryDto.TagBase[]) {
    const action = this.getCopyAction()

    const actions = {
      none: () => { },
      add: () => {
        const tagCaptions = this.filteredTags.map((tag) => tag.caption)
        const filteredTags = tags.filter((tag) => !tagCaptions.includes(tag.caption))

        filteredTags.forEach((tag) => this.create({ ...tag, id: nanoid() }))
      },
      replace: () => {
        this.tags.forEach(({ id }) => this.remove(id))
        tags.forEach((tag) => this.create({ ...tag, id: nanoid() }))
      },
    }

    actions[action]()
  }

  isCreatedOrUpdated = (id: number | string) => {
    const findTag = this.tags.find((tag) => tag.id === id)
    if (findTag === undefined) return false

    return findTag.action === "create" || findTag.action === "update"
  }

  get filteredTags() {
    return this.tags.filter((tag) => tag.action !== "remove")
  }
}
