interface ITagBase {
  id?: number
  caption: string
}

interface ITagAction {
  edited?: boolean
  local?: boolean
  action?: "create" | "update" | "remove"
}

export interface ITag extends ITagAction{
  id: string | number

  tag: ITagBase
  icon: string | null
  tagColor: string
}

export interface ITagCreate{
  tag: ITagBase
  icon: string | null
  tagColor: string
}

export interface ITagEdit extends ITagCreate {
  id: string | number
}
